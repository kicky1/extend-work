import { NextRequest, NextResponse } from 'next/server'
import { runDailyBatch } from '@/lib/services/job-batch/batch-runner'
import { runMatchingBatch } from '@/lib/services/job-matching/batch-matcher'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
