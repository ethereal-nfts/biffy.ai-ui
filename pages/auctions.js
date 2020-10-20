import styled from 'styled-components'
import Link from 'next/link'
import {Container} from 'bloomer'
import React, {useState, useEffect } from 'react'
import FancyButton from '../components/styled/FancyButton'
import WalletInfo from '../components/WalletInfo'
import OpenSeaCard from '../components/OpenSeaCard'

function handleApprove(ethersConnect){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractLove
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.approve(ethersConnect.addressPortraitAuction,"1000000000000000000000000000000")
}

function handleWithdraw(ethersConnect){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractPortraitAuction
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.withdrawAll()
}

const AuctionDescription = styled.ul`
  text-align:left;
  margin-left:auto;
  margin-right:auto;
  max-width:300px;
`

export default function Auctions({ ethersConnect }) {
  const [addressPortraits, setAddressPortraits] = useState()
  const [auctionNonce, setAuctionNonce] = useState()
  useEffect(()=>{
    if(ethersConnect) {
      setAddressPortraits(ethersConnect.addressPortraits)
      setAuctionNonce(ethersConnect.auctionNonce)
    }
  },[ethersConnect])
  return(
    <div className="background-rect portraits">
      <section>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </section>
      <h1>Portrait Auctions</h1>
      <p><a href="https://opensea.io/assets/biffys-portraits">Portraits On OpenSea</a></p>
      <p>How it works:</p>
      <AuctionDescription>
        <li>Bid at least min bid. Transfers Love from your wallet.</li>
        <li>Bidding resets timer to 24 hours.</li>
        <li>When outbid, your previous bid goes to balance and is applied to your new bids for any Portrait.</li>
        <li>You can withdraw your balance for 5% burn fee.</li>
        <li>When you win an auction, call Claim Portrait to receive the Portrait.</li>
      </AuctionDescription>
      {!ethersConnect && <p>loading... 2s</p>}
      {ethersConnect &&
        <>
          <Container style={{width:"100%", textAlign:"center", marginTop:"30px"}}>
              {!ethersConnect.auctionTokenApproved &&
              <>
                <FancyButton marginTop="20px" onClick={()=>{handleApprove(ethersConnect)}}>Approve</FancyButton>
                <p>Call Approve once before bidding.</p> <br/>
              </>
              }
              <>
                <FancyButton marginTop="20px" onClick={()=>{handleWithdraw(ethersConnect)}}>Withdraw</FancyButton>
                <p>Withdraws your {ethersConnect.loveAuctionBalance} Love for 5% burn fee.</p> <br/>
              </>
          </Container>
          {(addressPortraits && auctionNonce) &&
            <OpenSeaCard address={addressPortraits} tokenId={1} auctionId={0} ethersConnect={ethersConnect} />
          }
          <WalletInfo ethersConnect={ethersConnect} />
        </>
      }
    </div>
  )
}