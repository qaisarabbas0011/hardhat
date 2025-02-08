const {ethers} = require("ethers")


const provider=new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/kwUAGq6AMFpSgyJQcmUFP24qq44Y_xFe");
//console.log(provider);
const queeryBlockchain=async ()=>{
    // Get the latest block number
    const latestBlockNumber = await provider.getBlockNumber();
    // check the balance of an address
    //i took some random address from eterscan
    const balance = await provider.getBalance("0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97");
    console.log("Latest block number:", latestBlockNumber);
    console.log("Balance of the address:", ethers.utils.formatEther(balance.toString()));    

};
queeryBlockchain();
