import {BetInfo, FomajStatus, Position, Round} from "./types";
import {getFMJTokenContract, getFomajContract} from "@helpers/contractHelper";
import {RoundDataResponse} from "@helpers/types";
import {getFomajAddress} from "@helpers/addressHelper";
import {BigNumber} from "@ethersproject/bignumber";


export const getFomajData = async (): Promise<{
    status:FomajStatus,
    minStakeAmount: number,
    stakeLockDuration: number,
    minBetAmount: number,
    intervalSeconds: number
    currentRoundNumber:number
    bufferSeconds: number,
}> => {
    const contract = await getFomajContract();
    const {
        intervalSeconds, minStakeAmount, stakeLockDuration,
        minBetAmount, bufferSeconds
    } = await contract.config();
    const paused = await contract.paused();
    const currentRoundNumber = await contract.currentRoundNumber();

    return {
        status: paused ? FomajStatus.PAUSED : FomajStatus.LIVE,
        currentRoundNumber: currentRoundNumber.toNumber(),
        intervalSeconds: intervalSeconds.toNumber(),
        minStakeAmount: minStakeAmount.toNumber(),
        stakeLockDuration: stakeLockDuration.toNumber(),
        minBetAmount: minBetAmount.toNumber(),
        bufferSeconds: bufferSeconds.toNumber(),
    }
}

export const getRoundData = async (roundNumber: number): Promise<Round> => {
    const contract = await getFomajContract();
    const round = await contract.rounds(roundNumber)
    return serializeRoundResponse(round);
}

export const getApprovedAllowance  = async (account: string): Promise<BigNumber> => {
    const contract = await getFMJTokenContract();
    return contract.allowance(account, getFomajAddress());
}

export const formatCKBPrice = (price: number): string => {
    return (price * Math.pow(10, -8)).toFixed(5)
}

export const getLedgerData = async (account: string, roundNumber: number): Promise<BetInfo> => {
    const contract = getFomajContract();
    const ledger = await contract.ledger(roundNumber, account);
    let position: Position;
    switch (ledger.position) {
        case 0:
            position = Position.None
            break;
        case 1:
            position = Position.Bull
            break;
        case 2:
            position = Position.Bear
            break;
        case 3:
            position = Position.Flat
            break;
    }
    return {
        amount: ledger.amount.toNumber(),
        position: position,
        betAmountClaimed: ledger.betAmountClaimed,
        winningsClaimed: ledger.winningsClaimed
    }
}

export const getWinningClaimable = async (account: string, roundNumber: number): Promise<boolean> => {
    const contract = getFomajContract();
    return contract.hasWinnings(roundNumber, account);
}

export const hasFundsClaimable = async (account: string, roundNumber: number): Promise<boolean> => {
    const contract = getFomajContract();
    return contract.hasLockedFunds(roundNumber, account);
}


const serializeRoundResponse = (r: RoundDataResponse): Round => {
    return {
        amounts: {
            bearAmount: r.amounts.bearAmount.toNumber(),
            bullAmount: r.amounts.bullAmount.toNumber(),
            flatAmount: r.amounts.flatAmount.toNumber(),
            totalAmount: r.amounts.totalAmount.toNumber(),
        },
        oracleIds: {
            startOracleId: r.oracleIds.startOracleId.toNumber(),
            lockOracleId: r.oracleIds.lockOracleId.toNumber(),
            closeOracleId: r.oracleIds.closeOracleId.toNumber(),
        },
        prices: {
            closePrice: r.prices.closePrice.toNumber(),
            flatMinPrice: r.prices.flatMinPrice.toNumber(),
            flatMaxPrice: r.prices.flatMaxPrice.toNumber()
        },
        roundNumber: r.roundNumber.toNumber(),
        status: r.status,
        timestamps: {
            startTimestamp: r.timestamps.startTimestamp.toNumber(),
            lockTimestamp: r.timestamps.lockTimestamp.toNumber(),
            closeTimestamp: r.timestamps.closeTimestamp.toNumber()
        },
        rewards: {
            status: r.rewards.status,
            amount: r.rewards.amount.toNumber(),
            winner: r.rewards.winner,
        }

    }
}

