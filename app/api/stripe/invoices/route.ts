import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/client';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Stripe customer ID
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ invoices: [], hasMore: false });
    }

    const searchParams = req.nextUrl.searchParams;
    const startingAfter = searchParams.get('starting_after') || undefined;

    const invoices = await stripe.invoices.list({
      customer: profile.stripe_customer_id,
      limit: 10,
      starting_after: startingAfter,
    });

    const formattedInvoices = invoices.data
      .filter((invoice) => invoice.status !== 'draft' && invoice.status !== 'void' && invoice.total > 0)
      .map((invoice) => ({
        id: invoice.id,
        date: invoice.created,
        amount: invoice.total,
        currency: invoice.currency,
        status: invoice.status,
        invoicePdf: invoice.invoice_pdf,
      }));

    return NextResponse.json({
      invoices: formattedInvoices,
      hasMore: invoices.has_more,
    });
  } catch (error: unknown) {
    console.error('Invoice list error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch invoices';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
