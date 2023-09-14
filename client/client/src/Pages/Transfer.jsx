import { useState } from 'react';
import axios from 'axios';



function Transfer() {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState('');

  const handleTransfer = async () => {
    try {
      const response = await axios.post('/transfer', {
        receiverAddress,
        amount: parseFloat(amount),
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error occurred during transfer');
    }
  };

  const handleGetBalance = async () => {
    try {
      const response = await axios.get('/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error(error);
      setBalance('Error occurred while fetching balance');
    }
  };

  return (
    <div className="App">
      <h1>Ether Transfer Gateway</h1>
      <div>
        <label>Receiver Address:</label>
        <input
          type="text"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Amount (ETH):</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleTransfer}>Transfer Ether</button>
      <div>{message}</div>
      <hr />
      <button onClick={handleGetBalance}>Get Contract Balance</button>
      <div>Contract Balance: {balance} ETH</div>
    </div>
  );
}

export default Transfer;
