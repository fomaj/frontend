import * as React from 'react';
import {FaArrowAltCircleDown} from "react-icons/fa";
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
import BettingPanel from "@views/Prediction/Bet/BettingPanel";
import Loader from "react-loader-spinner";

export function BetBearButton() {
    const roundInfo = useCurrentRound();
    const currentBet = useCurrentRoundBet();
    const approved = useIsApproved();
    const minStakeAmount = useMinStakeAmount();
    const stakedAmount = useStakeInfo().stakedAmount;
    const staked = stakedAmount >= minStakeAmount;
    const locked = roundInfo.round && (Date.now() > (roundInfo.round.timestamps.lockTimestamp * 1000));
    const enabled = approved && staked && !locked;

    const selectedPosition = useLiveBetPosition();
    const selected = selectedPosition == Position.Bear;

    const dispatch = useAppDispatch();
    const onclick = () => {
        if (currentBet.item &&currentBet.item.position == Position.None) {
            dispatch(setLiveBetPosition(Position.Bear))
        }
    }
    if (roundInfo.fetching) {
        return <div className="flex h-28">
            <div className="m-auto">
                <div className={"align-middle justify-center"}>
                    <Loader
                        type="ThreeDots"
                        color="#EF4444"
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
                if (!enabled || currentBet.fetching) {
                    return "m-3 bg-gray-800 rounded cursor-not-allowed"
                }

                if (selected || (currentBet.item && currentBet.item.position == Position.Bear)) {
                    return "m-3 bg-gray-800 rounded border border-b-4 border-red-400"
                }

                if (!selected) {
                    return "m-3 bg-gray-800 rounded cursor-pointer"
                }

                return "m-3 bg-gray-800 rounded cursor-pointer"
            })()
        }>
            <div
                onClick={onclick}
                className={
                    (() => {
                        if (!enabled) {
                            return "m-3 p-3 bg-gray-800 rounded flex cursor-not-allowed"
                        }

                        if (selected || (currentBet.item && currentBet.item.position == Position.Bear)) {
                            return "m-3 p-3 bg-gray-800 rounded flex border border-b-4 border-red-400"
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
                                return "text-red-400"
                            }

                            return "text-gray-400"
                        })()}>
                            <FaArrowAltCircleDown size={50}/>
                        </div>
                        <div className={"text-lg font-bold"}>{
                            "Going Down"
                        }</div>
                    </div>
                    <div className={""}>{`< ${formatCKBPrice(roundInfo.round.prices.flatMinPrice)}`}</div>
                </div>
                <div className={"w-1/3"}>
                    <div>{roundInfo.round.amounts.bearAmount} FMJ Locked</div>
                </div>
                {
                    currentBet.item && currentBet.item.position == Position.Bear && <div className={"text-yellow-800 font-bold text-sm"}>Entered</div>
                }
            </div>
            {
                !(currentBet.item && currentBet.item.position == Position.Bear) && enabled && selected && <BettingPanel/>
            }
        </div>
    );
}