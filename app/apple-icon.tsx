import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 130,
          fontWeight: 500,
          fontFamily: 'Georgia, serif',
        }}
      >
        H
      </div>
    ),
    { ...size },
  )
}
