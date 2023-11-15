import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
//import SeatChart from './components/SeatChart'

// ABIs
import TuffyTickets from './abis/TuffyTickets.json'

// Config
import config from './config.json'

function App() {

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [tuffyTickets, setTuffyTickets] = useState(null)
  const [occasions, setOccasions] = useState([]) 
  const [occasion, setOccasion] = useState({})
  const [toggle, setToggle] = useState(false)


  const loadBlockchainData = async () => {

    // // Fetch Account
    // const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    // const account = ethers.utils.getAddress(accounts[0])
    // setAccount(account)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const address = config[network.chainId].TuffyTickets.address
    const tuffyTickets = new ethers.Contract(address, TuffyTickets, provider)
    setTuffyTickets(tuffyTickets)

    const totalOccasions = await tuffyTickets.totalOccasions()
    
    const occasions = []

    for(let i = 1; i <= totalOccasions; i++){
      const occasion = await tuffyTickets.getOccasion(i)
      occasions.push(occasion)
    }

    setOccasions(occasions)

    console.log(occasions)
    console.log(tuffyTickets.address)

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
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h2 className='header__title'><strong>Event Tickets</strong></h2>
      </header>

      <Sort />

      <div className='cards'>
        {occasions.map((occasion, index) => (
          <Card
            occasion = {occasion}
            id = {index+1}
            tuffyTickets = {tuffyTickets}
            provider = {provider}
            account = {account}
            toggle = {toggle}
            setToggle = {setToggle}
            setOccasion = {setOccasion}
            key = {index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;