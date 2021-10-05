import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    formatCKBPrice,
    getApprovedAllowance,
    getFomajData, hasFundsClaimable,
    getLedgerData,
    getRoundData,
    getWinningClaimable
} from "./helpers";
import {BetInfo, FomajState, FomajStatus, HistoryBetItem, Position, Round} from "./types";
import {RootState} from "@redux/store";

const initialState: FomajState = {
    status: FomajStatus.INITIAL,
    currentRound: {
        roundNumber: 0,
        fetching: true
    },
    intervalSeconds: 300,
    minStakeAmount: 10,
    stakeLockDuration: 60000,
    minBetAmount: 1000,
    bufferSeconds: 30,
    lastOraclePrice: '0',
    lastOracleTimestamp: Date.now(),
    currentRoundBet: {
        fetching:true,
    },
    fmjBalance: null,
    prizePool: 0,
    fmjApproved: false,
    history: {
        fetching: null,
        items: []
    },
    stakeInfo: {
        stakedAmount: 0,
        unlockTimestamp: Date.now(),
    },
    liveBet: {
        position: Position.None,
        amount: 0,
    }
};

export const fetchFomajData = createAsyncThunk('fomaj/fetchFomajData', async () => {
    return getFomajData()
});

export const fetchRound = createAsyncThunk<Round, number>('fomaj/fetchRound', async (roundNumber): Promise<Round> => {
    return getRoundData(roundNumber)
});

export const fetchCurrentRound = createAsyncThunk<Round>('fomaj/fetchCurrentRound',
    async (_, { getState }): Promise<Round> => {
    const state = getState() as RootState;
    return getRoundData(state.fomaj.currentRound.roundNumber)
});

export const fetchApprovalInfo = createAsyncThunk<boolean, string>('fomaj/fetchApprovalInfo', async (account): Promise<boolean> => {
     const approved = await getApprovedAllowance(account);
     return approved.gte(100_000);
});

export const fetchCurrentRoundBet = createAsyncThunk<BetInfo, string>(
    'fomaj/fetchCurrentRoundBet',
    async (account, {getState}): Promise<BetInfo> => {
        const state = getState() as RootState;
        return getLedgerData(account, state.fomaj.currentRound.roundNumber)
    },
)

export const fetchRoundHistory = createAsyncThunk<{
    roundNumber: number,
    info: HistoryBetItem
}, {
    roundNumber: number,
    account: string
}>('fomaj/fetchRoundHistory', async ({account, roundNumber}): Promise<{
    roundNumber: number,
    info: HistoryBetItem
}> => {
    const round = await getRoundData(roundNumber);
    const betInfo = await getLedgerData(account, roundNumber);
    const hasWinnings = await getWinningClaimable(account, roundNumber);
    const hasClaimableFunds = await hasFundsClaimable(account, roundNumber);

    return {
        roundNumber: roundNumber,
        info: {
            round,
            amount: betInfo.amount,
            position: betInfo.position,
            hasClaimableFunds: hasClaimableFunds,
            hasWinnings: hasWinnings,
        }
    }
});

// userRounds
export const fomajSlice = createSlice({
    name: 'fomaj',
    initialState,
    reducers: {
        setLastOraclePrice: (state, action: PayloadAction<number>) => {
            state.lastOraclePrice = formatCKBPrice(action.payload);
        },
        setLastUpdatedOracle: (state, action: PayloadAction<number>) => {
            state.lastOracleTimestamp = action.payload;
        },
        setFMJBalance: (state, action: PayloadAction<number>) => {
            state.fmjBalance = action.payload
        },
        setStakedAmount: (state, action: PayloadAction<{stakedAmount: number, unlockTimestamp: number}>) => {
            state.stakeInfo = {
                stakedAmount: action.payload.stakedAmount,
                unlockTimestamp: action.payload.unlockTimestamp
            }
        },
        setFmjApproval: (state, action: PayloadAction<boolean>) => {
            state.fmjApproved = action.payload
        },
        setPrizePoolBalance: (state, action: PayloadAction<number>) => {
            state.prizePool = action.payload
        },

        setCurrentBet: (state, action:PayloadAction<BetInfo>) => {
            state.currentRoundBet.fetching = false;
            state.currentRoundBet.item = action.payload;
        },

        setHistoryItem: (state, action:PayloadAction<HistoryBetItem>) => {
            const item = state.history.items.find(i => i.round.roundNumber == action.payload.round.roundNumber);
            if (item) {
                state.history.items[state.history.items.indexOf(item)] = action.payload
            } else {
                state.history.items.push(action.payload)
            }
        },

        // set live bet info
        // temporary to hold form values
        setLiveBetPosition: (state, action: PayloadAction<Position>) => {
            state.liveBet.position = action.payload
        },
        setLiveBetAmount: (state, action:PayloadAction<number>) => {
          state.liveBet.amount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFomajData.fulfilled, (state, action) => {
            const {
                status,
                currentRoundNumber,
                intervalSeconds,
                minBetAmount,
                minStakeAmount,
                bufferSeconds,
                stakeLockDuration
            } = action.payload
            state.status = status;
            state.currentRound.roundNumber = currentRoundNumber as number;
            state.intervalSeconds = intervalSeconds;
            state.minBetAmount = minBetAmount;
            state.minStakeAmount = minStakeAmount;
            state.bufferSeconds = bufferSeconds;
            state.stakeLockDuration = stakeLockDuration
        });

        builder.addCase(fetchCurrentRound.fulfilled, (state, action) => {
            state.currentRound.round = action.payload;
            state.currentRound.fetching = false;
        });

        builder.addCase(fetchApprovalInfo.fulfilled, (state, action) => {
            state.fmjApproved = action.payload;
        });

        builder.addCase(fetchCurrentRoundBet.fulfilled, (state, action) => {
            state.currentRoundBet.fetching = false;
            state.currentRoundBet.item = action.payload
        });
        builder.addCase(fetchRoundHistory.pending, (state) => {
            state.history.fetching = true;
        });
        builder.addCase(fetchRoundHistory.fulfilled, (state, action) => {
            state.history.fetching = false;
            const item = state.history.items.find(i => i.round.roundNumber == action.payload.roundNumber);
            if (item) {
                state.history.items[state.history.items.indexOf(item)] = action.payload.info
            } else {
                state.history.items.push(action.payload.info)
            }
        });
    }
});
export const {setLastOraclePrice, setLastUpdatedOracle,
    setFMJBalance, setStakedAmount, setFmjApproval, setLiveBetPosition,
    setLiveBetAmount, setPrizePoolBalance, setCurrentBet, setHistoryItem} = fomajSlice.actions;
export default fomajSlice.reducer;