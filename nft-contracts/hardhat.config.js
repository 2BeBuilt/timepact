require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config()
require("@nomicfoundation/hardhat-foundry")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_GOERLI = process.env.PRIVATE_KEY_GOERLI
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.18",
                settings: {},
            },
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                        details: { yul: false },
                    },
                },
            },
        ],
    },
    defaultNetwork: "Hyperspace",
    networks: {
        scrollAlpha: {
            url: "https://alpha-rpc.scroll.io/l2" || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [PRIVATE_KEY_GOERLI],
        },
        Goerli: {
            chainId: 5,
            url: "https://rpc.ankr.com/eth_goerli",
            accounts: [PRIVATE_KEY_GOERLI],
        },
        Hyperspace: {
            chainId: 3141,
            url: "https://api.hyperspace.node.glif.io/rpc/v1",
            accounts: [PRIVATE_KEY],
        },
        FilecoinMainnet: {
            chainId: 314,
            url: "https://api.node.glif.io",
            accounts: [PRIVATE_KEY],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        customChains: [
            {
                network: "scrollAlpha",
                chainId: 534353,
                urls: {
                    apiURL: "https://blockscout.scroll.io/api",
                    browserURL: "https://blockscout.scroll.io",
                },
            },
            {
                network: "hyperspace",
                chainId: 3141,
                urls: {
                    apiURL: "https://api.hyperspace.node.glif.io/rpc/v1",
                    browserURL: "https://hyperspace.filfox.info",
                },
            },
        ],
    },
}
