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