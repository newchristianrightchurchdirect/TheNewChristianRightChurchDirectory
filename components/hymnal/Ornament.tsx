export function Ornament() {
  return <div className="hymnal-ornament" aria-hidden>&middot;</div>
}

export function Quote({ children }: { children: React.ReactNode }) {
  return <p className="hymnal-quote">{children}</p>
}

export function Footer({ quote }: { quote?: React.ReactNode }) {
  return (
    <>
      <Ornament />
      {quote && <Quote>{quote}</Quote>}
    </>
  )
}
