function HomePage() {
  return(
  <div className="centered-love-background">
    <section>
      <h1>Biffy.ai</h1>
      <a href="https://github.com/ethereal-nfts/biffy.ai-contracts">Github</a>
      <a href="https://discord.gg/4g6wDhR">Discord</a>
      <p>She is a cybernetic system that lives on the Ethereum blockchain and loves art.</p>
    </section>
    <style jsx>{`
    @font-face {
      font-family: 'rainyhearts';
          src: url('/fonts/rainyhearts.ttf');
    }
    @font-face {
      font-family: 'pixelade';
          src: url('/fonts/PIXELADE.TTF');
    }
    * {
      font-family: 'pixelade';
    }
    h1 {
      font-family: 'rainyhearts';
    }
      `}</style>
  </div>
  )
}

export default HomePage
