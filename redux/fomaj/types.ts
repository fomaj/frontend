export enum FomajStatus {
    INITIAL = 'initial',
    LIVE = 'live',
    PAUSED = 'paused',
    ERROR = 'error',
}

export interface FomajState {
    status: FomajStatus
    currentRound: {
        roundNumber: number,
        round?: Round
        fetching: boolean
    },
    intervalSeconds: number
    minStakeAmount: number
    stakeLockDuration: number,
    minBetAmount: number | null
    bufferSeconds: number
    lastOraclePrice: string
    lastOracleTimestamp: number
    fmjBalance: number | null
    prizePool: number
    fmjApproved: boolean
    stakeInfo: StakeInfo
    currentRoundBet: {
        fetching: boolean
        item?: BetInfo
    }
    history: {
        fetching: boolean | null
        items: HistoryBetItem[]
    }
    // current bet
    liveBet: {
        position: Position
        amount: number
    }
}
export interface HistoryBetItem {
    amount: number
    position: Position
    hasWinnings: boolean
    hasClaimableFunds: boolean
    round: Round
}

export enum Position {
    None,
    Bull,
    Bear,
    Flat
}
export interface BetInfo {
    position: Position;
    amount: number;
    betAmountClaimed: boolean;
    winningsClaimed: boolean;
}

export interface StakeInfo {
    stakedAmount: number
    unlockTimestamp: number
}

export enum RoundStatus {
    INVALID = 0,
    LIVE = 1,
    EXPIRED = 2,
    CANCELLED = 3
}

export interface Round {
    roundNumber: number;
    status: number;
    prices: {
        closePrice: number;
        flatMinPrice: number;
        flatMaxPrice: number;
    };
    oracleIds: {
        startOracleId: number;
        lockOracleId: number;
        closeOracleId: number;
    };
    timestamps: {
        startTimestamp: number;
        lockTimestamp: number;
        closeTimestamp: number;
    };
    amounts: {
        bullAmount: number;
        bearAmount: number;
        flatAmount: number;
        totalAmount: number;
    };
    rewards: RoundRewards
}

export enum RewardStatus {
    NotCalculated,
    Calculated,
    NoWinners,
    Cancelled
}
export interface RoundRewards {
    status: RewardStatus;
    winner: Position;
    amount: number;
}