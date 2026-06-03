import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#faf6ec',
          color: '#7d5a1f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 140,
          fontWeight: 500,
          fontFamily: 'Georgia, serif',
        }}
      >
        H
      </div>
    ),
    { width: 192, height: 192 },
  )
}
