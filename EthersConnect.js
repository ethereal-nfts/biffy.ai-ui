import {ethers, utils, BigNumber} from 'ethers'
const axios = require('axios');
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'

import abiBiffysLove from './abi/BiffysLove.abi'
import abiBiffysLoveFarm from './abi/BiffysLoveFarm.abi'
import abiIERC20 from './abi/IERC20.abi'
const config = require('./config.json');

class EthersConnect{
  constructor(){
    this.isEnabled = false
    this.isEthereumBrowserDetected = (window.ethereum || window.web3)
    this.expectedNetwork = config.network
    this.network = config.network
    this.provider = new ethers.getDefaultProvider(config.network, {
      alchemy: "XsyJ2okDidZxhw_iW4azBVEqv5ja8QR0"
    })

    this.addressLove = config.addressLove
    this.contractLove = new ethers.Contract(config.addressLove,abiBiffysLove,this.provider)
    this.addressLoveFarm = config.addressLoveFarm
    this.contractLoveFarm = new ethers.Contract(config.addressLoveFarm,abiBiffysLoveFarm,this.provider)
    this.addressLoveLP = config.addressLoveLP
    this.contractLoveLP = new ethers.Contract(config.addressLoveLP,abiIERC20,this.provider)

    this.loadProvider = this.loadProvider.bind(this)
    this.setProviderListeners = this.setProviderListeners.bind(this)
    this.delProviderListeners = this.delProviderListeners.bind(this)
    this.loadWeb3.bind = this.loadWeb3.bind(this)
    this.reloadEthersConnect.bind = this.reloadEthersConnect.bind(this)
    this.loadWalletInfo.bind = this.loadWalletInfo.bind(this)

    this.uniTokenLove = new Token(ChainId.MAINNET, this.addressLove, 18)
  }

  reloadEthersConnect(){
    let promise
    if(this.isEnabled){
      promise = this.loadWeb3().then(()=>{
        return Promise.all([
          this.signer.getAddress(),
          this.provider.getNetwork()
        ])
      }).then((vals)=>{
        this.account = vals[0];
        this.network = vals[1].name
        this.setProviderListeners()
        return this.loadWalletInfo()
      }).then(()=>{
        return Promise.resolve(this)
      })
    }else{
      promise = Promise.resolve(this)
    }
    return promise
  }

  loadProvider(){
    let promiseArray = []
    this.delProviderListeners()
    if(this.isEnabled){
      promiseArray[1] = this.provider.getBalance(this.account)
    }
    promiseArray[0] = this.provider.getNetwork()

    return Promise.all(promiseArray).then((vals)=>{
        this.network = vals[0].name
        this.balance = typeof(vals[1]) == 'undefined' ? undefined : this.formatToEthString(vals[1],3)
    })
  }

  loadWalletInfo(){
    if(!this.nextWalletUpdate) this.nextWalletUpdate = Date.now() - 1
    if(this.isEnabled && this.nextWalletUpdate < Date.now()) {
      this.nextWalletUpdate = Date.now() + 20*1000 //rate limit
      return Promise.all([
        this.contractLove.balanceOf(this.account).then((bal)=>{
          this.balanceLove = this.formatToEthString((bal),5)
        }),
        this.contractLoveLP.balanceOf(this.account).then((bal)=>{
          this.weiBalanceLoveLP = bal
          this.balanceLoveLP = this.formatToEthString((bal),5)
        }),
        this.contractLoveFarm.balanceOf(this.account).then((bal)=>{
          this.balanceLoveFarm = this.formatToEthString((bal),5)
        }),
        this.contractLoveFarm.earned(this.account).then((bal)=>{
          this.balanceLoveFarmEarned = this.formatToEthString((bal),5)
        }),
        this.contractLoveFarm.totalSupply().then((bal)=>{
          this.loveFarmTotalSupply = this.formatToEthString((bal),5)
        }),
        this.contractLoveFarm.rewardRate().then((bal)=>{
          this.loveFarmRewardRate = this.formatToEthString((bal.mul(BigNumber.from("86400"))),5)
        }),
        Fetcher.fetchPairData(this.uniTokenLove, WETH[this.uniTokenLove.chainId]).then((pair)=>{
          const route = new Route([pair], WETH[this.uniTokenLove.chainId])
          this.priceEthLove = route.midPrice.invert().toSignificant(10)
          console.log("love price",this.priceLove)
        }),
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then((response)=>{
          this.priceEthUsd = response.data.ethereum.usd
        })

      ])
    } else {
      return Promise.resolve()
    }
  }

  setProviderListeners(){
    if(this.isEnabled){
      this.provider.on(this.account,(bal)=>{
        this.balance = this.formatToEthString(bal,5)
      })
    }
  }
  delProviderListeners(){
    this.provider.removeAllListeners(this.account)
  }

  toDDHHMMSS (sec_num)  {
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

  formatToEthString(weiBN,decimals){
    return parseFloat(utils.formatEther(weiBN)).toFixed(decimals)
  }

  loadWeb3(){
    let promise = Promise.resolve()
    if(this.isEthereumBrowserDetected){
      if(window.ethereum){
        promise = window.ethereum.enable().then(()=>{
          this.provider = new ethers.providers.Web3Provider(window.ethereum)
        })
      }else{
        this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
      }
      promise = promise.then(()=>{
        this.isEnabled = true
        this.signer = this.provider.getSigner()
        return this.signer.getAddress()
      }).then((addr)=>{
        this.account = addr
      })
    }
    return promise.then(()=>{
      return this.loadProvider()
    }).then(()=>{
      this.setProviderListeners()
      return this
    })
  }
}

export default EthersConnect
