import '../styles/styles.css'
import React, {useState, useEffect } from 'react'
import EthersConnect from '../EthersConnect'

export default function MyApp({ Component, pageProps }) {
  const [ethersConnect,setEthersConnect] = useState(null)
  useEffect(()=>{
    const ethersConnect = new EthersConnect()
    let interval = 0
    ethersConnect.loadWeb3().then((ethersConnect)=>{
      (()=>{
        ethersConnect.reloadEthersConnect().then((ethersConnect)=>{
          if(!!ethersConnect) {
            setEthersConnect(ethersConnect)
          }
        })
      })()
      interval = setInterval(
        ()=>{
          ethersConnect.reloadEthersConnect().then((ethersConnect)=>{
            if(!!ethersConnect) {
              setEthersConnect(ethersConnect)
            }
          })
        },
        30000
      )
    })
    return (interval)=>clearInterval(interval)
  },[])

  return <Component ethersConnect={ethersConnect} {...pageProps} />
}
