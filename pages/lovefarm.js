import Link from 'next/link'
import React, {useState, useEffect } from 'react'
import {Button, Container} from 'bloomer'
import FancyButton from '../components/styled/FancyButton'
import WalletInfo from '../components/WalletInfo'

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

function handleStake(ethersConnect){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractLoveFarm
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.stake(ethersConnect.weiBalanceLoveLP.toString())
}

function handleApprove(ethersConnect){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractLoveLP
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.approve(ethersConnect.addressLoveFarm,"1000000000000000000000000000000")
}

function handleClaim(ethersConnect){
  let signer = ethersConnect.provider.getSigner()
  let contract = ethersConnect.contractLoveFarm
  let contractWithSigner = contract.connect(signer)
  contractWithSigner.getReward()
}

export default function LoveFarm({ ethersConnect }) {
  const [secondsToLaunch, setSecondsToLaunch] = useState(1601701200 - Math.floor(Date.now()/1000))
  useEffect(()=>{
    let interval = setInterval(()=>{
      setSecondsToLaunch(1601701200 - Math.floor(Date.now()/1000))
    },1000)
    return (interval)=>clearInterval(interval)
  },[])
  return(
    <div className="background-rect">
      <section>
        <Link href="/">
          <a>Go Home</a>
        </Link>
        <h1>Biffy's<br/>Love Farm</h1>
        <p >Stake LP, earn Love forever.</p>
      </section>
      {(secondsToLaunch > 0) && <>
        <p>Love Farm starts in: {toDDHHMMSS(secondsToLaunch)}</p>
      </>}
      {!ethersConnect && <p>loading... 2s</p>}
      {!!ethersConnect &&
        <>
          <Container style={{width:"100%", textAlign:"center", marginTop:"30px"}}>
              {!ethersConnect.tokenApproved &&
              <>
                <FancyButton marginTop="20px" onClick={()=>{handleApprove(ethersConnect)}}>Approve</FancyButton>
                <p>Call Approve once before staking.</p> <br/>
              </>
              }
              {(secondsToLaunch <= 0) && <>
                <FancyButton  onClick={()=>{handleStake(ethersConnect)}}>Stake</FancyButton>
                <p>available: {ethersConnect.balanceLoveLP} Love/Eth Uni LP</p> <br/>
                <FancyButton  onClick={()=>{handleClaim(ethersConnect)}}>Claim</FancyButton>
                <p>available: {ethersConnect.balanceLoveFarmEarned} Love</p> <br/>
                </>}
          </Container>
          <WalletInfo ethersConnect={ethersConnect} />
          <h2>farm info</h2>
          <Container className="has-text-left" style={{fontFamily: 'monospace', width:"100%"}}>
            <p style={{width:"100%"}}>LOVE LP: {ethersConnect.loveFarmTotalSupply}</p>
            <p style={{width:"100%"}}>LOVE/Day: {ethersConnect.loveFarmRewardRate}</p>
            <p style={{width:"100%"}}>Love USD: {(Number(ethersConnect.priceEthLove)*Number(ethersConnect.priceEthUsd)).toFixed(2)}</p>
            <p style={{width:"100%"}}>Total Value Locked: ${(Number(ethersConnect.loveFarmTotalSupply)*Number(ethersConnect.priceLoveLPUsd)).toFixed(2)}</p>
            <p style={{width:"100%"}}>APY: {(Number(ethersConnect.priceEthLove)*Number(ethersConnect.priceEthUsd)*ethersConnect.loveFarmRewardRate/(Number(ethersConnect.loveFarmTotalSupply)*Number(ethersConnect.priceLoveLPUsd))*100*365).toFixed(2)}%</p>
          </Container>
        </>
      }
    </div>
  )
}
