require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId

    //deploy TimePact
    // const TimePact = await ethers.getContractFactory("TimePact", wallet)
    // console.log("Deploying TimePact...")
    // const timePact = await TimePact.deploy()
    // await timePact.deployed()
    // console.log("TimePact deployed to:", timePact.address)

    // // //deploy DealClient
    // const DealClient = await ethers.getContractFactory("DealClient", wallet)
    // console.log("Deploying DealClient...")
    // const dc = await DealClient.deploy()
    // await dc.deployed()
    // console.log("DealClient deployed to:", dc.address)

    const ScrollBridge = await ethers.getContractFactory("ScrollBridge", wallet)
    console.log("Deploying ScrollBridge...")
    const scrollBridge = await ScrollBridge.deploy()
    await scrollBridge.deployed()
    console.log("ScrollBridge deployed to Scroll:", scrollBridge.address)
}
