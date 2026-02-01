import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const productId = 'prod_TrV5wWJm0RmRzQ' // CV Builder Pro

    // Fetch prices for the product
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    })

    // Find monthly and yearly prices
    const monthlyPrice = prices.data.find(
      (p) => p.recurring?.interval === 'month'
    )
    const yearlyPrice = prices.data.find(
      (p) => p.recurring?.interval === 'year'
    )

    if (!monthlyPrice || !yearlyPrice) {
      return NextResponse.json(
        { error: 'Pricing not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      monthly: {
        priceId: monthlyPrice.id,
        amount: monthlyPrice.unit_amount! / 100,
        currency: monthlyPrice.currency,
      },
      yearly: {
        priceId: yearlyPrice.id,
        amount: yearlyPrice.unit_amount! / 100,
        currency: yearlyPrice.currency,
      },
    })
  } catch (error) {
    console.error('Error fetching pricing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing' },
      { status: 500 }
    )
  }
}
