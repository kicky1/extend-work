import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { runDailyBatch } from '@/lib/services/job-batch/batch-runner'
import { runMatchingBatch } from '@/lib/services/job-matching/batch-matcher'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`

  // SEC-008: Use a constant-time comparison to avoid leaking the secret
  // length/content via timing side-channels.
  const a = Buffer.from(authHeader ?? '')
  const b = Buffer.from(expected)
  const valid = a.length === b.length && timingSafeEqual(a, b)

  if (!valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { insertedJobIds } = await runDailyBatch()
    await runMatchingBatch(insertedJobIds)

    return NextResponse.json({
      success: true,
      jobsInserted: insertedJobIds.length,
    })
  } catch (error: any) {
    console.error('[Cron] Daily jobs failed:', error)
    return NextResponse.json(
      { error: 'Cron job failed', message: error.message },
      { status: 500 }
    )
  }
}
