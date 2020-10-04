import Link from 'next/link'

function HomePage() {
  return(
  <div className="centered-background centered-background-love">
    <section>
      <h1>Biffy.ai</h1>
      <p>She is a cybernetic system that lives on the Ethereum blockchain and loves art.</p>
      <Link href="/lovefarm">
        <a>Love Farm</a>
      </Link>
      <a href="https://uniswap.info/pair/0xe97bFF521Dae652a1Bb107e2212907642c5A4AC4">Uniswap</a>
      <a href="https://t.me/biffyai">Telegram</a>
      <a href="https://github.com/ethereal-nfts/biffy.ai-contracts">Github</a>
    </section>
  </div>
  )
}

export default HomePage
