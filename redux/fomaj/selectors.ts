import {useSelector} from "react-redux";
import {RootState} from "../store";

export const useStatus = () => {
    return useSelector((state: RootState) => state.fomaj.status);
}

export const useCurrentRoundNumber = () => {
    return useSelector((state: RootState) => state.fomaj.currentRound.roundNumber);
}

export const useIntervalSeconds = () => {
    return useSelector((state: RootState) => state.fomaj.intervalSeconds);
}

export const useMinStakeAmount = () => {
    return useSelector((state: RootState) => state.fomaj.minStakeAmount);
}

export const useStakeLockDuration = () => {
    return useSelector((state: RootState) => state.fomaj.stakeLockDuration);
}

export const useMinBetAmount = () => {
    return useSelector((state: RootState) => state.fomaj.minBetAmount);
}

export const useBufferSeconds = () => {
    return useSelector((state: RootState) => state.fomaj.bufferSeconds);
}

export const useLastOraclePrice = () => {
    return useSelector((state: RootState) => state.fomaj.lastOraclePrice);
}

export const useLastOracleTimstamp = () => {
    return useSelector((state: RootState) => state.fomaj.lastOracleTimestamp);
}

export const useFMJBalance = () => {
    return useSelector((state: RootState) => state.fomaj.fmjBalance);
}

export const useCurrentRound = () => {
    return useSelector((state: RootState) => state.fomaj.currentRound)
}

export const useStakeInfo = () => {
    return useSelector((state: RootState) => state.fomaj.stakeInfo)
}

export const useIsApproved = () => {
    return useSelector((state: RootState) => state.fomaj.fmjApproved)
}

export const useCurrentRoundBet = () => {
    return useSelector((state: RootState) => state.fomaj.currentRoundBet)
}

export const usePricePoolBalance = () => {
    return useSelector((state: RootState) => state.fomaj.prizePool)
}

export const useUserBetHistory = () => {
    return useSelector((state: RootState) => state.fomaj.history)
}

// bet info
export const useLiveBetPosition = () => {
    return useSelector((state: RootState) => state.fomaj.liveBet.position)
}

export const useLiveBetAmount = () => {
    return useSelector((state: RootState) => state.fomaj.liveBet.amount)
}
