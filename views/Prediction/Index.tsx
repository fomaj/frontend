import React, {useMemo} from 'react';
import TradingView from "./TradingView";
import Loader from "react-loader-spinner";
import {
    useIsApproved,
    useMinStakeAmount,
    useCurrentRound,
    useStakeInfo,
    useStatus
} from "@redux/fomaj/selectors";
import usePollLiveRoundData from "@hooks/polls/usePollLiveRoundData";
import {FomajStatus} from "@redux/fomaj/types";
import {ApproveFmj} from "@views/Prediction/ApproveFMJ";
import {RoundInfo} from "@views/Prediction/RoundInfo";
import StakingPanel from "@views/Prediction/StakingPanel";
import UserHistoryTable from "@views/Prediction/History/UserHistoryTable";
import usePollyAccount from "@hooks/usePollyAccount";
import RoundTitle from "@views/Prediction/RoundTitle";
import BetButtonsPanel from "@views/Prediction/Bet/BetButtonsPanel";

const Prediction = () => {

    usePollLiveRoundData();
    const account = usePollyAccount();
    const isApproved = useIsApproved();
    const minstake = useMinStakeAmount();
    const staked = useStakeInfo().stakedAmount >= minstake;

    const status = useStatus();

    const round = useCurrentRound();
    const chart = useMemo(() => {
        return <TradingView/>;
    },[])

    if (status == FomajStatus.INITIAL) {
        return (
            <div className="flex h-screen">
            <div className="m-auto space-y-4">
                <div className={"align-middle justify-center"}>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                    <div className={"text-lg text-blue-400 font-bold"}>Initializing :)</div>
                </div>
            </div>
        </div>)
    }

    return (
        <>
            <div className={"md:flex overflow-auto text-gray-100"}>
                <div className={"md:flex-grow bg-gray-800 px-10"}>
                    <RoundTitle/>
                    <RoundInfo/>
                    {chart}
                    {account && !round.fetching && <UserHistoryTable/>}
                </div>
                <div className={"md:w-1/3 bg-gray-900 py-5 space-y-5 border-t-8 border-gray-800"}>
                    {account && !isApproved && <ApproveFmj/>}
                    {isApproved && !staked && <StakingPanel/>}
                    <BetButtonsPanel/>
                </div>
            </div>
        </>
    );
};

export default Prediction;