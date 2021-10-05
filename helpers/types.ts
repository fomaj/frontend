import {BigNumber} from "@ethersproject/bignumber";

export interface ContractAddress {
    [key: string]: string
}

export type MultiCallResponse<T> = T | null

export interface RoundDataResponse {
    roundNumber: BigNumber;
    status: number;
    prices: [BigNumber, BigNumber, BigNumber] & {
        closePrice: BigNumber;
        flatMinPrice: BigNumber;
        flatMaxPrice: BigNumber;
    };
    oracleIds: [BigNumber, BigNumber, BigNumber] & {
        startOracleId: BigNumber;
        lockOracleId: BigNumber;
        closeOracleId: BigNumber;
    };
    timestamps: [BigNumber, BigNumber, BigNumber] & {
        startTimestamp: BigNumber;
        lockTimestamp: BigNumber;
        closeTimestamp: BigNumber;
    };
    amounts: [BigNumber, BigNumber, BigNumber, BigNumber] & {
        bullAmount: BigNumber;
        bearAmount: BigNumber;
        flatAmount: BigNumber;
        totalAmount: BigNumber;
    };
    rewards: [number, number, BigNumber] & {
        status: number;
        winner: number;
        amount: BigNumber;
    };
}