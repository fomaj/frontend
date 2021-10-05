import { Contract } from "@ethersproject/contracts";
import {Signer} from "@ethersproject/abstract-signer";
import {Provider} from "@ethersproject/providers";
import {polyjuiceJsonRpcProvider} from "./polyjuice";
import {
    getOracleAddress,
    getFomajAddress,
    getFMJTokenAddress,
    getPrizePoolAddress,
    getFaucetAddress
} from "./addressHelper";
import {Fomaj, MockV3Aggregator, FMJToken, FomajPrizePool, FMJFaucet} from "@fomaj/contracts/typechain"

// abis
import {abi as FomajAbi} from '@fomaj/contracts/artifacts/contracts/core/Fomaj.sol/Fomaj.json';
import {abi as FMJTokenAbi} from '@fomaj/contracts/artifacts/contracts/core/FMJToken.sol/FMJToken.json';
import {abi as OracleAbi} from '@fomaj/contracts/artifacts/contracts/oracle/MockV3Aggregator.sol/MockV3Aggregator.json';
import {abi as PrizePoolAbi} from '@fomaj/contracts/artifacts/contracts/core/FomajPrizePool.sol/FomajPrizePool.json';
import {abi as FaucetAbi} from '@fomaj/contracts/artifacts/contracts/faucet/FMJFaucet.sol/FMJFaucet.json';


const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
    const signerOrProvider = signer ?? polyjuiceJsonRpcProvider
    return new Contract(address, abi, signerOrProvider)
}

export const getFomajContract = (signer?: Signer | Provider) => {
    return getContract(FomajAbi, getFomajAddress(), signer) as Fomaj;
}

export const getFMJTokenContract = (signer?: Signer | Provider) => {
    return getContract(FMJTokenAbi, getFMJTokenAddress(), signer) as FMJToken;
}

export const getPrizePoolContract = (signer?: Signer | Provider) => {
    return getContract(PrizePoolAbi, getPrizePoolAddress(), signer) as FomajPrizePool;
}

export const getOracleContract = (signer?: Signer | Provider) => {
    return getContract(OracleAbi, getOracleAddress(), signer) as MockV3Aggregator;
}

export const getFaucetContract = (signer?: Signer | Provider) => {
    return getContract(FaucetAbi, getFaucetAddress(), signer) as FMJFaucet;
}