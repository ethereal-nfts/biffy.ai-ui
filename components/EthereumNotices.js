import React, {useState } from 'react'
import {Container, Message, MessageHeader, MessageBody, Delete, Button} from 'bloomer'

function EthereumNotices({ethersConnect}){
  const [isDisplayChangelly,setIsDisplayChangelly] = useState(false)

  function hideParent(event,name){
    event.preventDefault()
    let elem = event.currentTarget.parentElement.parentElement.parentElement
    elem.style.display = "none"
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return(
    <Container style={{width:"100%"}}>
    {!ethersConnect.isEthereumBrowserDetected &&
      <Container style={{width:"100%"}}>
        <Message isColor="danger">
          <MessageHeader>
            Ethereum Not Detected
            <Delete onClick={hideParent} />
          </MessageHeader>
          <MessageBody>
            On desktop, try <a href='https://metamask.io'>MetaMask</a>. <br/>
            On mobile, try <a href='https://cipherbrowser.com'>CipherBrowser</a>. <br/>
            MetaGlitch will still update without an Ethereum Wallet, but you
            will not be able to breed Glitches.
          </MessageBody>
        </Message>
      </Container>
    }
    {(ethersConnect.isEnabled && !(ethersConnect.network == ethersConnect.expectedNetwork)) &&
      <Container style={{width:"100%"}}>
        <Message isColor="danger">
          <MessageHeader>
            Wrong Ethereum Network Detected: {ethersConnect.network}
            <Delete onClick={hideParent} />
          </MessageHeader>
          <MessageBody>
            You seem to be connected to {capitalizeFirstLetter(ethersConnect.network)}. <br/>
            Instead, connect to {ethersConnect.expectedNetwork == "homestead" ? "the Ethereum Mainnet" : capitalizeFirstLetter(ethersConnect.expectedNetwork) + " Testnet"}. If you are using
            Metamask, press the MetaMask icon. At the top, click
            "{ethersConnect.network == "homestead" ? "Main Ethereum Network" : capitalizeFirstLetter(ethersConnect.network) + " Test Network"}" and switch to
            "{ethersConnect.expectedNetwork == "homestead" ? "Main Ethereum Network" : capitalizeFirstLetter(ethersConnect.expectedNetwork) + " Test Network"}".
          </MessageBody>
        </Message>
      </Container>
    }
    {ethersConnect.isEnabled &&
      <Container className="has-text-left" style={{fontFamily: 'monospace', width:"100%"}}>
        <p style={{width:"100%", overflow:"hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>Account: {ethersConnect.account}</p>
        <p style={{width:"100%"}}>Network: {ethersConnect.network} {ethersConnect.network === ethersConnect.expectedNetwork ? '✓' : '✗'}</p>
        <p style={{width:"100%"}}>Balance ETH: {ethersConnect.balance}</p>
        <p style={{width:"100%"}}>Balance LOVE: {ethersConnect.balanceLove}</p>
        <p style={{width:"100%"}}>Balance LOVE LP: {ethersConnect.balanceLoveLP}</p>
        <p style={{width:"100%"}}>Balance Love Farm: {ethersConnect.balanceLoveFarm}</p></Container>
    }
    </Container>
  )
}

export default EthereumNotices
