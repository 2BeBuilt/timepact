const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        name: "hardhat",
    },
    3141: {
        name: "Hyperspace",
        tokensToBeMinted: 12000,
    },
    314: {
        name: "FilecoinMainnet",
        tokensToBeMinted: 12000,
    },
}

// const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    // developmentChains,
}
