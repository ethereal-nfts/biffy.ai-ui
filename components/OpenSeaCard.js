import styled from 'styled-components'
import {ethers, utils, BigNumber} from 'ethers'
const axios = require('axios').default;
import { useState, useEffect } from 'react';

const Card = styled.div`
  text-align:left;
  height:440px;
  padding:20px;
  border-radius: 16px;
  background: #510c7e;
  box-shadow:  10px 10px 12px #450a6b, 
             -10px -10px 12px #5d0e91;
  position:relative;
  display:inline-block;
  margin:20px;
`
const CardImageContainer = styled.div`
  width:200px;
  height:200px;
  margin-left:auto;
  margin-right:auto;
  position:relative;
  border-radius:16px;
  overflow:hidden;
`
const CardImageShadowOverlay = styled.div`
  position:absolute;
  top:0px;
  left:0px;
  width:200px;
  height:200px;
  border-radius: 8px;
  box-shadow: inset 5px 5px 5px #450a6b, 
              inset -5px -5px 5px #5d0e91;

`
const CardImage = styled.img`
  display:block;
  border:solid 16px #510c7e;
  width: auto;
  height: 168px;
  margin-left: auto;
  margin-right: auto;
`
const CardTitle = styled.h2`
  margin:0px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width:100%;
  display:block;
  border:solid 4px #510c7e;
  margin-left:-4px;
  font-size:18px;
  margin-top:8px;
`
const CardSubTitle = styled.a`
  margin:0px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width:200px;
  display:block;
  border:solid 4px #510c7e;
  margin-left:-4px;
  font-size:14px;
  font-weight:normal;
  text-decoration:underline;
`
const CardDescription = styled.p`
  margin:0px;
  overflow: hidden;
  text-overflow:ellipsis;
  width:200px;
  background:#510c7e;
  display:block;
  font-size:14px;
  font-weight:normal;
`

function handleBid(ethersConnect,auctionId,amountWeiBN){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractPortraitAuction
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.depositAndBid(auctionId,amountWeiBN.toString(),{
    gasLimit:"200000"
  })
}

function handleClaim(ethersConnect,auctionId){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractPortraitAuction
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.claimPortrait(auctionId)
}

function toDDHHMMSS (sec_num)  {
  var days    = Math.floor(sec_num / 86400)
  var hours   = Math.floor((sec_num-days*86400) / 3600);
  var minutes = Math.floor((sec_num - hours * 3600 - days*86400) / 60);
  var seconds = sec_num - days*86400 - (hours * 3600) - (minutes * 60);

  if (days    < 10) {days    = "0"+days;}
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return days+":"+hours+':'+minutes+':'+seconds;
}
export default function OpenSeaCard({address,tokenId,auctionId,ethersConnect}) {


  const [cardData, setCardData] = useState(null)

  const [auction, setAuction] = useState()
  const [secondsToStart, setSecondsToStart] = useState()
  const [secondsToEnd, setsecondsToEnd] = useState()
  const [isEnded, setIsEnded] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [minBid, setMinBid] = useState(utils.parseEther("1.1231"))

  const [bidAmountEther, setBidAmountEther] = useState(1)

  useEffect(()=>{
    (async () =>{
      const openSeaAsset = await axios.get(`https://api.opensea.io/api/v1/asset/${address}/${tokenId}/`).catch((err)=>{
        console.log("err",err)
        return {data:{hasData: false}}
      })
      openSeaAsset.data.hasData = true;
      setCardData(openSeaAsset.data)
    })()
  },[address,tokenId])

  useEffect(()=>{
    if(ethersConnect) {
      const auction = ethersConnect.auctions[auctionId]
      setAuction(auction)
      if(auction.lastBid.eq(BigNumber.from("0"))){
        setMinBid(auction.startingBid)
      } else {
        setMinBid(
          auction.lastBid
          .mul(auction.minIncreaseBP)
          .div(BigNumber.from("10000"))
          .add(auction.lastBid)
        )
      }
    }
  },[ethersConnect])

  useEffect(()=>{
    if(auction) {
      let interval = setInterval(()=>{
        const toStart = auction.startTime - Math.floor(Date.now()/1000)
        const toEnd = auction.endTime - Math.floor(Date.now()/1000)
        setSecondsToStart(toStart)
        setsecondsToEnd(toEnd)
        if(toEnd < 1 && toStart > 0) setIsEnded(true)
        if(toStart < 1) setIsStarted(true)
      },1000)
      return (interval)=>clearInterval(interval)
    }
  },[auction])
  return (
    <>
      {(cardData && cardData.hasData) &&
        <Card>
          <>
            <CardImageContainer>
              <CardImageShadowOverlay/>
              <CardImage src={cardData.image_url} />
            </CardImageContainer>
            <CardTitle>{cardData.name}</CardTitle>
            {cardData.collection && 
              <CardSubTitle target="_blank" href={cardData.permalink} >{cardData.collection.name}</CardSubTitle>
            }
            <CardDescription>{cardData.description}</CardDescription>
            {(!isStarted && secondsToStart) &&
              <p>Bidding starts in: {toDDHHMMSS(secondsToStart)}</p>
            }
            {(isStarted && secondsToStart && !isEnded) &&
              <>
                <br/>
                Amount: <input 
                  type="number" 
                  min={utils.formatEther(minBid)}
                  onChange={e => setBidAmountEther(e.target.value)} 
                />
                <br/>
                <button 
                  onClick={()=>{handleBid(ethersConnect,auctionId,utils.parseEther(bidAmountEther.toString()))}}>Bid</button>
                <br/>
                <CardDescription>
                  Bidding ends in: {toDDHHMMSS(secondsToEnd)}<br/>
                  Minimum Bid: {utils.formatEther(minBid)} Love<br/>
                  Last Bid: {utils.formatEther(auction.lastBid)} Love
                  <br/>Last Bidder: {auction.lastBidder}
                </CardDescription>
              </>
            }
            {isEnded &&
            <>
              <br/>
              <CardDescription>
              Winner: {auction.lastBidder}
              </CardDescription>
              {!auction.isClaimed && (
                <button 
                onClick={()=>{handleClaim(ethersConnect,auctionId)}}>Claim</button>
              )}

            </>}
          </>
        </Card>
      }
    </>
  )
}
