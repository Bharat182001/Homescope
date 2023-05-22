import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import LandingPage from './components/LandingPage'
import Buy from './components/Buy';
import Login from './components/Login'
import Navigation from './components/Navigation';

import Home from './components/Home';
import Car from './components/Car'
import Storey from './components/Storey'

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

//React Router Dom
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Review from './components/Review';

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)
  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([]) 
  const [home, setHome] = useState({})  // setting individual home

  const [cars, setCars] = useState([])
  const [car, setCar] = useState({}) // setting individual car

  const [storeys, setStoreys] = useState([])
  const [storey, setStorey] = useState({}) // setting individual storey
  
  const [toggleHome, setToggleHome] = useState(false)
  const [toggleCar, setToggleCar] = useState(false)
  const [toggleStorey, setToggleStorey] = useState(false)


  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()

    const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
    const totalSupply = await realEstate.totalSupply()

    const homes = []
    const cars = []
    const storeys = []

    for(var i=1; i<=3; i++) {
      const uri = await realEstate.tokenURI(i)
      const response = await fetch(uri)
      const metadata = await response.json()
      homes.push(metadata)
    }
    setHomes(homes)

    for(var i=4; i<=6; i++) {
      const uri = await realEstate.tokenURI(i);
      const response = await fetch(uri)
      const metadata = await response.json() 
      cars.push(metadata)
    }
    setCars(cars)

    for(var i=7; i<=9; i++) {
      const uri = await realEstate.tokenURI(i)
      const response = await fetch(uri)
      const metadata = await response.json()
      storeys.push(metadata)
    }
    setStoreys(storeys)

    const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
    setEscrow(escrow)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePopHome = (home) => {
    setHome(home)
    toggleHome ? setToggleHome(false) : setToggleHome(true)
  }
  const togglePopCar = (car) => {
    setCar(car)
    toggleCar ? setToggleCar(false) : setToggleCar(true)
  }
  const togglePopStorey = (storey) => {
    setStorey(storey)
    toggleStorey ? setToggleStorey(false) : setToggleStorey(true)
  }

  return (
  <>
    <Router>
      <div>
        <Navigation account={account} setAccount={setAccount} aboutText={Login} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/buy" element={<Buy homes={homes} cars={cars} storeys={storeys} toggleHome={toggleHome} togglePopHome={togglePopHome} toggleCar={toggleCar} togglePopCar = {togglePopCar} toggleStorey={toggleStorey} togglePopStorey={togglePopStorey} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/review" element={<Review />} />
          </Routes>
        </div>
      </div>

      {toggleHome && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePopHome={togglePopHome} />
        )
      }
      {toggleCar && (
          <Car car={car} provider={provider} account={account} escrow={escrow} togglePopCar={togglePopCar} />
        )
      }
      {toggleStorey && (
          <Storey storey={storey} provider={provider} account={account} escrow={escrow} togglePopStorey={togglePopStorey} />
        )
      }
    </Router>
    
  </>
  );
}

export default App;
