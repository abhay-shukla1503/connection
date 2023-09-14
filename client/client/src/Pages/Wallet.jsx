//import React from "react";
import PropTypes from 'prop-types';
import Web3 from "web3";
import ABI from "./ABI.json";
import { useNavigate } from 'react-router-dom';

const Wallet = ({saveState}) => {
    const navigateTo = useNavigate();
  const connectwallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        const contractAddress = "0xa8d6b740454023190bc2E2C9450608dF2506FacF";
        const contract = new web3.eth.Contract(ABI,contractAddress);
        saveState({web3:web3,contract:contract,account:accounts[0]})
        navigateTo("/transfer")
      } else {
        throw new Error("Ethereum provider not available.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="wallet_header">
      <span>Welcome To</span> <p>Our Payment Gateway</p>
      </div>
      <div className='connect_wallet_section todo_btn'>
        <p>Please Connect Metamask Wallet To Access The App</p>
    <button onClick={() => connectwallet()}>Connect Wallet</button>
    </div> 
    </>
  );
};

Wallet.propTypes = {
    saveState: PropTypes.func.isRequired,
};

export default Wallet;
