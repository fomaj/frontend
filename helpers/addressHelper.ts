import {OracleAddress, FomajAddress, FMJTokenAddress, PrizePoolAddress, FaucetAddress} from "@constants/contracts";
import {getChainId} from "./utils";

const chainId = getChainId();

export const getFomajAddress = () => {
    return FomajAddress[chainId];
}

export const getFMJTokenAddress = () => {
    return FMJTokenAddress[chainId];
}

export const getOracleAddress = () => {
    return OracleAddress[chainId];
}

export const getPrizePoolAddress = () => {
    return PrizePoolAddress[chainId];
}

export const getFaucetAddress = () => {
    return FaucetAddress[chainId];
}