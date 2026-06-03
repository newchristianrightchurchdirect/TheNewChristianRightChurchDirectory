'use client'

import { useEffect, useState } from 'react'

export default function TodayDate() {
  const [s, setS] = useState('')
  useEffect(() => {
    const d = new Date()
    setS(d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])
  return <>{s || '\u00A0'}</>
}
