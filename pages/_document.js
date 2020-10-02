import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <script src="https://kit.fontawesome.com/e42648c31b.js" crossorigin="anonymous"></script>
          <title>Biffy.ai: Cybernetic art collector on Ethereum</title>
          <meta name="description" content="Biffy lives on the Ethereum blockchain and collects BitsForAi NFT artworks." />
          <meta name="og:title" property="og:title" content="Biffy.AI: Cybernetic Art Collector On Ethereum Blockchain" />
          <meta property="og:image" content="https://biffy.ai/images/biffy-portrait.png" />
          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
