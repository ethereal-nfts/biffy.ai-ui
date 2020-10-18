import Link from 'next/link'

export default function HomePage() {
  return(
  <div className="centered-background centered-background-love">
    <section>
      <h1>Biffy.ai</h1>
      <p>She is a cybernetic system that lives on the Ethereum blockchain and loves art.</p>
      <Link href="/lovefarm">
        <a>Love Farm</a>
      </Link>
      <Link href="/auctions">
        <a>Auctions</a>
      </Link>
      <Link href="/artiststatement">
        <a>Statement</a>
      </Link>
      <a href="https://uniswap.info/pair/0xe97bFF521Dae652a1Bb107e2212907642c5A4AC4">Uniswap</a>
      <a href="https://t.me/biffyai">Telegram</a>
    </section>
  </div>
  )
}