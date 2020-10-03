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
            Biffy.ai will still update without an Ethereum Wallet, but you
            will not be able to join the Love Farm.
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
    </Container>
  )
}

export default EthereumNotices
