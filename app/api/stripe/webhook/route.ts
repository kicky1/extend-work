import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Use service role client for webhook (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Idempotency check - skip if already processed
  const { data: existing } = await supabaseAdmin
    .from('processed_webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single();

  if (existing) {
    console.log(`Event ${event.id} already processed, skipping`);
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // For async payment methods, wait for async_payment_succeeded
        if (session.payment_status === 'paid') {
          await handleCheckoutCompleted(session);
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleAsyncPaymentFailed(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await supabaseAdmin.from('processed_webhook_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  // Get full subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata.supabase_user_id;

  if (!userId) {
    console.error('No supabase_user_id in subscription metadata');
    return;
  }

  await supabaseAdmin
    .from('user_profiles')
    .update({
      subscription_tier: 'pro',
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_status: subscription.status,
      subscription_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  console.log(`User ${userId} upgraded to Pro`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.supabase_user_id;

  if (!userId) {
    // Try to find user by customer ID
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('stripe_subscription_id', subscription.id)
      .single();

    if (!profile) {
      console.error('Could not find user for subscription:', subscription.id);
      return;
    }

    await updateUserSubscription(profile.id, subscription);
    return;
  }

  await updateUserSubscription(userId, subscription);
}

async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
  const isActive = ['active', 'trialing'].includes(subscription.status);

  await supabaseAdmin
    .from('user_profiles')
    .update({
      subscription_tier: isActive ? 'pro' : 'free',
      subscription_status: subscription.status,
      subscription_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  console.log(`User ${userId} subscription updated: ${subscription.status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.supabase_user_id;

  // Try to find user by subscription ID if not in metadata
  let targetUserId = userId;
  if (!targetUserId) {
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('stripe_subscription_id', subscription.id)
      .single();

    if (profile) {
      targetUserId = profile.id;
    }
  }

  if (!targetUserId) {
    console.error('Could not find user for deleted subscription:', subscription.id);
    return;
  }

  await supabaseAdmin
    .from('user_profiles')
    .update({
      subscription_tier: 'free',
      subscription_status: 'canceled',
      stripe_subscription_id: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', targetUserId);

  console.log(`User ${targetUserId} downgraded to free`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const { data: profile } = await supabaseAdmin
    .from('user_profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (!profile) {
    console.error('Could not find user for failed payment, customer:', customerId);
    return;
  }

  await supabaseAdmin
    .from('user_profiles')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('id', profile.id);

  console.log(`User ${profile.id} payment failed`);
}

async function handleAsyncPaymentFailed(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;

  if (!customerId) {
    console.error('No customer ID in failed async payment session');
    return;
  }

  const { data: profile } = await supabaseAdmin
    .from('user_profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (!profile) {
    console.error('Could not find user for failed async payment, customer:', customerId);
    return;
  }

  // Log the failure - subscription won't be activated
  console.log(`Async payment failed for user ${profile.id}, session: ${session.id}`);
}
