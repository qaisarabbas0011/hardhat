const {ethers}= require("ethers");
const provider=new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/kwUAGq6AMFpSgyJQcmUFP24qq44Y_xFe");
const walletAddress="0xAD96609Bd21B0D34Ca37274597bb5BFa93cD4bC9";
const walletAbi=[
	{
		"inputs": [],
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "sendTheUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractRead= async() => {
    const walletContract=new ethers.Contract(
        walletAddress,
        walletAbi,
        provider);
    // const value=await contract.getValue();
    // console.log("Contract Value:",value.toString());
 //console.log(walletContract);
    const contractName=await walletContract.name();
    console.log("Contract Name:",contractName);
    const contractValue=await walletContract.getValue();
    console.log("Contract Value:",contractValue.toString());
    const contractBalance=await walletContract.contractBalance();
    console.log("Contract Balance:",ethers.utils.formatEther(contractBalance.toString())); 
    const accountBalance=await walletContract.accountBalance("0x35Af4b8316A01a8C35Be113ebBB47aD6Dd982E9b");
    console.log("Account Balance:",ethers.utils.formatEther(accountBalance.toString()));
}

contractRead();
