import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const walletAddress = "0xAD96609Bd21B0D34Ca37274597bb5BFa93cD4bC9";
const walletAbi = [
  {
    "inputs": [{ "internalType": "uint256", "name": "_num", "type": "uint256" }],
    "name": "setValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sendEthContract",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "sendTheUser",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractBalance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [contractName, setContractName] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        console.error("🚨 MetaMask not detected! Please install it.");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(walletAddress, walletAbi, signer);
        setContract(contractInstance);

        // Fetch contract data
        const name = await contractInstance.name();
        const storedValue = await contractInstance.getValue();
        const contractBal = await contractInstance.contractBalance();

        setContractName(name);
        setValue(Number(storedValue));
        setBalance(Number(ethers.formatEther(contractBal))); // Convert wei to ETH

        console.log("✅ Contract loaded:", contractInstance);
      } catch (error) {
        console.error("🚨 Error loading contract:", error);
      }
    };

    loadBlockchainData();
  }, []);

  // Function to update value on blockchain
  const updateValue = async () => {
    if (!contract) return;
    try {
      const tx = await contract.setValue(100);
      await tx.wait();
      console.log("✅ `setValue` confirmed!");
    } catch (error) {
      console.error("🚨 Error setting value:", error);
    }
  };

  // Function to send ETH to contract
  const sendEthToContract = async () => {
    if (!contract) return;
    try {
      const tx = await contract.sendEthContract({ value: ethers.parseEther("0.001") });
      await tx.wait();
      console.log("✅ `sendEthContract` confirmed!");
    } catch (error) {
      console.error("🚨 Error sending ETH:", error);
    }
  };

  // Function to send ETH to user
  const sendEthToUser = async () => {
    if (!contract) return;
    try {
      const tx = await contract.sendTheUser("0x3c0Ae44189244a75acFf81CfD296Ee75829a2005", {
        value: ethers.parseEther("0.001"),
      });
      await tx.wait();
      console.log("✅ `sendTheUser` confirmed!");
    } catch (error) {
      console.error("🚨 Error sending ETH to user:", error);
    }
  };

  return (
    <div className="App">
      <h1>Ethereum Wallet App</h1>
      <p><strong>Contract Name:</strong> {contractName}</p>
      <p><strong>Stored Value:</strong> {value}</p>
      <p><strong>Contract Balance:</strong> {balance} ETH</p>

      <button onClick={updateValue}>Set Value (100)</button>
      <button onClick={sendEthToContract}>Send 0.001 ETH to Contract</button>
      <button onClick={sendEthToUser}>Send 0.001 ETH to User</button>
    </div>
  );
}

export default App;
