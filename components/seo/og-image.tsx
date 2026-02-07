import { ImageResponse } from 'next/og'

interface OGImageOptions {
  title: string
  subtitle?: string
  badge?: string
}

export function generateOGImage({ title, subtitle, badge }: OGImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          backgroundColor: '#faf9f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {badge && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  backgroundColor: '#1a4a4a',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                {badge}
              </span>
            </div>
          )}
          <h1
            style={{
              fontSize: title.length > 40 ? '48px' : '56px',
              fontWeight: 700,
              color: '#1a2a2a',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '24px',
                color: '#5a6a6a',
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: '#1a4a4a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              E
            </div>
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#1a2a2a' }}>
              Extend Career
            </span>
          </div>
          <span style={{ fontSize: '16px', color: '#8a9a9a' }}>
            extendcareer.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
