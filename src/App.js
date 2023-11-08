import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
//import Navigation from './components/Navigation'
//import Sort from './components/Sort'
//import Card from './components/Card'
//import SeatChart from './components/SeatChart'

// ABIs
import TuffyTickets from './abis/TuffyTickets.json'

// Config
import config from './config.json'

function App() {

  const [account, setAccount] = useState(null)

  const loadBlockchainData = async () => {

    // Fetch Account
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)

    // Refresh Account
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })

  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
        <h1>Hello, CPSC 597</h1>
        <p>{account}</p>
    </div>
  );
}

export default App;