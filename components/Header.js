import React from 'react'
import { Section, Title, Subtitle, Container } from 'bloomer'

function Header(props){
  return(
    <Section tag="header" className="has-text-centered">
      {props.ethersConnect.isEnabled &&
        <Container className="has-text-left" style={{fontFamily: 'monospace', maxWidth:720}}>
          <p>Account: {props.ethersConnect.account}</p>
          <p>Balance: {props.ethersConnect.balance} ETH</p>
          <p>Network: {props.ethersConnect.network} {props.ethersConnect.network === props.ethersConnect.expectedNetwork ? '✓' : '✗'}</p>
        </Container>
      }
      </Section>
  )
}

export default Header
