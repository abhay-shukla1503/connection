//0xa8d6b740454023190bc2E2C9450608dF2506FacF

const express = require('express')
const cors = require("cors")
const ABI = require('./ABI.json');
const {Web3} = require("web3");

const app = express();
app.use(cors())
app.use(express.json())


const web3 = new Web3("https://sepolia.infura.io/v3/d1ca998e042a43219dbc26662e0546c0")
const contractAddress = "0xa8d6b740454023190bc2E2C9450608dF2506FacF";
const contract = new web3.eth.Contract(ABI,contractAddress);
const privateKey = '37b0abb593520621efb356e310e682ba34082b3d4bbb8ea35fc463c38120f2fd';
const ownerAddress = '0x6d77FA0c0cc1181ba128a25e25594f004e03a141';




app.post('/transfer', async (req, res) => {
    try {
        const { receiverAddress, amount } = req.body;
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        const transactionObject = {
            from: ownerAddress,
            to: receiverAddress,
            value: amountWei,
            gas: 21000, // Adjust the gas limit as needed
            gasPrice: web3.utils.toWei('10', 'gwei'), // Adjust the gas price as needed
            nonce: await web3.eth.getTransactionCount(ownerAddress), // Get the nonce
        };

        const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);

        web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    .on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
    })
    .on('receipt', (receipt) => {
        console.log(`Transaction receipt:`, receipt);
    })
    .on('error', (error) => {
        console.error('Transaction error:', error);
    });

        // Assumes you send JSON with "receiverAddress" and "amount"
        if (!receiverAddress || !amount) {
            return res.status(400).json({ error: 'Invalid request data' });
        }
        await contract.methods.transferEther(receiverAddress).send({
            from: ownerAddress,
            value: amountWei,
        });
        res.json({ message: 'Transfer successful' });
        console.log(res)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/balance', async (req, res) => {
    try {
        const contractBalance = await contract.methods.getBalance().call();
        res.json({ balance: web3.utils.fromWei(contractBalance, 'ether') });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server Running At Port ${PORT}`)
})

// reciever:- 0x99eb822522a7735C0707E7E38Eac119e1a215e1a