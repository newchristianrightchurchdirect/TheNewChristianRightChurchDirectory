import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#14110B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
          <path fill="#C9A55A" d="M58,30L58,65C56,62.5 52.5,61 49,61C43.5,61 39,64 39,68C39,72 43.5,75 49,75C54.5,75 59,72 59,68L59,42L70,38L70,32Z" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
