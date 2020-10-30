import Link from 'next/link'
import { faTelegramPlane, faGithub, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <Link href="/gallery">
        <a>Art Gallery</a>
      </Link>
      <Link href="/artiststatement">
        <a>Statement</a>
      </Link>
      <a href="https://uniswap.info/pair/0xe97bFF521Dae652a1Bb107e2212907642c5A4AC4">Uniswap</a>
      <br/>
      <a className="icon" href="https://t.me/biffyai"><FontAwesomeIcon icon={faTelegramPlane} /></a>
      <a className="icon" href="https://twitter.com/BiffyAi"><FontAwesomeIcon icon={faTwitter} /></a>
      <a className="icon" href="https://discord.gg/4g6wDhR"><FontAwesomeIcon icon={faDiscord} /></a>
      <a className="icon" href="https://github.com/ethereal-nfts/biffy.ai-contracts"><FontAwesomeIcon icon={faGithub} /></a>
    </section>
  </div>
  )
}