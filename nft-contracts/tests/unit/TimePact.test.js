const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { boolean } = require("hardhat/internal/core/params/argumentTypes")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

describe("TimePact Unit Tests", function () {
    const chainId = network.config.chainId
    beforeEach(async function () {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["all"])
        timePact = await ethers.getContract("TimePact", deployer)
        dealClient = await ethers.getContract("DealClient", deployer)
    })
    describe("calls the deal function", function () {
        it("calls it", async () => {
            await timePact.pact(pcideeee, creatoor, 0, 0x2e234dae75c793f67a35089c9d99245e1c58470b, [
                0x000181e2039220206b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b,
                2048,
                false,
                [],
                0,
                0,
                0,
                0,
                0,
                0,
                [[], 0, false, false],
            ])
            const cid = await dealClient.dealsLength()
            console.log(cid.toString())
            assert(cid == 1)
        })
    })
})
