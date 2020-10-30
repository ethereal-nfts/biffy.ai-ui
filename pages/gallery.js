import Link from 'next/link'

export default function Gallery() {
  return(
    <div className="background-rect">
      <section>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </section>
      <h1>Art Gallery</h1>
      <p>WIP</p>
      <ul>
        <li><a href="https://opensea.io/assets/bitsforai">BitsForAi</a>: artwork for AI collectors of the future.</li>
        <li><a href="https://opensea.io/assets/biffys-portraits">Biffy's Portraits</a>: unique portraits of Biffy, each by a different artist</li>
        <li><a href="https://app.rarible.com/biffys-chips/collectibles">Biffy's Chips</a>, color coded chips given to communities for supporting Biffy.</li>
        <li><a href="https://opensea.io/assets/biffys-stamps">Biffy's Stamps</a>, stamps purchased to raise funds for Biffy.</li>
      </ul>
    </div>
  )
}
