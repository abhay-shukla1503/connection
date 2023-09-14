import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Transfer from './Pages/Transfer'
import Wallet from './Pages/Wallet';
import './App.css'

function App() {
  const [state,setState] = useState({web3:null,contract:null,account:null})

  const saveState = ({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }

    const router = createBrowserRouter([
      {path:'/',element:<Wallet saveState = {saveState}/>},
      {path:'/transfer',element:<Transfer state={state}/>},
    ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
