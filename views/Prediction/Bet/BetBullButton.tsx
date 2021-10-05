import * as React from 'react';
import {FaArrowAltCircleUp} from "react-icons/fa";
import {Position} from "@redux/fomaj/types";
import {
    useLiveBetPosition,
    useIsApproved,
    useMinStakeAmount,
    useStakeInfo,
    useCurrentRound, useCurrentRoundBet
} from "@redux/fomaj/selectors";
import {useAppDispatch} from "@redux/store";
import {setLiveBetPosition} from "@redux/fomaj/fomajSlice";
import {formatCKBPrice} from "@redux/fomaj/helpers";
import usePollyAccount from "@hooks/usePollyAccount";
import BettingPanel from "@views/Prediction/Bet/BettingPanel";
import Loader from "react-loader-spinner";

export function BetBullButton() {
    const roundInfo = useCurrentRound();
    const currentBet = useCurrentRoundBet();
    const approved = useIsApproved();
    const minStakeAmount = useMinStakeAmount();
    const stakedAmount = useStakeInfo().stakedAmount;
    const staked = stakedAmount >= minStakeAmount;
    const account = usePollyAccount();
    const locked = roundInfo.round && (Date.now() > (roundInfo.round.timestamps.lockTimestamp * 1000));
    const enabled = approved && staked && account && !locked;

    const selectedPosition = useLiveBetPosition();
    const selected = selectedPosition == Position.Bull;

    const dispatch = useAppDispatch();
    const onclick = () => {
        if (currentBet.item && currentBet.item.position == Position.None) {
            dispatch(setLiveBetPosition(Position.Bull))
        }
    }

    if (roundInfo.fetching) {
        return <div className="flex h-28">
            <div className="m-auto">
                <div className={"align-middle justify-center"}>
                    <Loader
                        type="ThreeDots"
                        color="#10B981"
                        height={40}
                        width={40}
                    />
                </div>
            </div>
        </div>
    }

    return (
        <div className={
            (() => {
                if (!enabled || (currentBet.item && currentBet.fetching) ) {
                    return "m-3 bg-gray-800 rounded cursor-not-allowed"
                }

                if (selected || (currentBet.item && currentBet.item.position == Position.Bull)) {
                    return "m-3  bg-gray-800 rounded border border-b-4 border-green-400"
                }

                if (!selected) {
                    return "m-3  bg-gray-800 rounded cursor-pointer"
                }
                return "m-3 bg-gray-800 rounded cursor-pointer"
            })()}>
        <div
            onClick={onclick}
            className={
                (() => {
                    if (!enabled) {
                        return "m-3 p-3 bg-gray-800 rounded flex cursor-not-allowed"
                    }

                    if (selected || (currentBet.item && currentBet.item.position == Position.Bull)) {
                        return "m-3 p-3 bg-gray-800 rounded flex border border-b-4 border-green-400"
                    }

                    if (!selected) {
                        return "m-3 p-3 bg-gray-800 rounded flex cursor-pointer"
                    }

                    return "m-3 p-3 bg-gray-800 rounded flex cursor-pointer"
                })()
            }>
            <div className={"flex-grow space-y-2"}>
                <div className={"flex space-x-4"}>
                    <div className={(() => {
                        if (!enabled) {
                            return "text-gray-400"
                        }

                        if (approved) {
                            return "text-green-400"
                        }

                        return "text-gray-400"
                    })()}>
                        <FaArrowAltCircleUp size={50}/>
                    </div>
                    <div className={"text-lg font-bold"}>{
                         "Going Up"
                    }</div>
                </div>
                <div className={""}>{`> ${formatCKBPrice(roundInfo.round.prices.flatMaxPrice)}`}</div>
            </div>
            <div className={"w-1/3"}>
                <div>{roundInfo.round.amounts.bullAmount} FMJ locked</div>
            </div>
            {
                currentBet.item && currentBet.item.position == Position.Bull && <div className={"text-yellow-800 font-bold text-sm"}>Entered</div>
            }
        </div>
            {
                !(currentBet.item && currentBet.item.position == Position.Bull) && enabled && selected && <BettingPanel/>
            }
        </div>
    );
}