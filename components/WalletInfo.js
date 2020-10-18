import EthereumNotices from "../components/EthereumNotices"
import {Button, Container} from 'bloomer'

export default function WalletInfo({ ethersConnect }) {
  return(
    <>
    {ethersConnect &&
      <>
        <h2>wallet info</h2>
        <EthereumNotices ethersConnect={ethersConnect} />
        {ethersConnect.isEnabled &&
          <Container className="has-text-left" style={{fontFamily: 'monospace', width:"100%"}}>
            <p style={{width:"100%", overflow:"hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>Account: {ethersConnect.account}</p>
            <p style={{width:"100%"}}>Network: {ethersConnect.network} {ethersConnect.network === ethersConnect.expectedNetwork ? '✓' : '✗'}</p>
            <p style={{width:"100%"}}>Balance ETH: {ethersConnect.balance}</p>
            <p style={{width:"100%"}}>Balance LOVE: {ethersConnect.balanceLove}</p>
            <p style={{width:"100%"}}>Balance LOVE LP: {ethersConnect.balanceLoveLP}</p>
            <p style={{width:"100%"}}>Balance Love Farm: {ethersConnect.balanceLoveFarm}
              {
                (Number(ethersConnect.loveFarmTotalSupply)>0) ?
                " ("+((Number(ethersConnect.balanceLoveFarm)/(Number(ethersConnect.loveFarmTotalSupply))*100).toFixed(3)) + "%)"
                :
              "0%"
                }
            </p>
            <p style={{width:"100%"}}>Projected Daily Love Reward:
              {
                (Number(ethersConnect.loveFarmTotalSupply)>0) ?
                " "+(Number(ethersConnect.loveFarmRewardRate)*Number(ethersConnect.balanceLoveFarm)/(Number(ethersConnect.loveFarmTotalSupply))).toFixed(5)
                :
              "0"
                }
            </p>
          </Container>
        }
      </>
    }
    </>
  )
}