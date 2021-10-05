import * as React from 'react';
import formatRelative from "date-fns/formatRelative";
import {
    useLastOraclePrice,
    useLastOracleTimstamp,
    usePricePoolBalance,
    useCurrentRound
} from "@redux/fomaj/selectors";
import Loader from "react-loader-spinner";
import {formatDistanceToNow} from "date-fns";

export function RoundInfo() {
    const roundInfo = useCurrentRound();

    const oracle = useLastOraclePrice();
    const oracleLastUpdated = useLastOracleTimstamp();

    const prizePool = usePricePoolBalance();

    if (roundInfo.fetching) {
        return <div className="flex h-24">
            <div className="m-auto">
                <div className={"align-middle justify-center"}>
                    <Loader
                        type="ThreeDots"
                        color="#F9FAFB"
                        height={40}
                        width={40}
                    />
                </div>
            </div>
        </div>
    }
    return (
        <div className="py-5 mx-auto space-y-4 lg:space-y-0 lg:gap-4 md:grid lg:grid-cols-4 md:grid-cols-2 md:gap-2 md:space-y-2">
            <div className="w-full">
                <div className={"text-sm text-gray-400 font-light"}>Reward Pool</div>
                <div className={"text-lg"}>{prizePool} FMJ</div>
            </div>
            <div className="w-full">
                <div className={"text-sm text-gray-400 font-light"}>Locked Pool</div>
                <div className={"space-y-1"}>
                    <div className={"text-lg"}>{roundInfo.round.amounts.totalAmount} FMJ</div>
                </div>
            </div>
            <div className="w-full">
                <div className={"text-sm text-gray-400 font-light"}>Lock Time</div>
                <div className={"space-y-1"}>
                    <div className={"text-lg"}>
                        <div>{formatDistanceToNow(new Date(roundInfo.round.timestamps.lockTimestamp * 1000),
                            { addSuffix: true })}</div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className={"text-sm text-gray-400 font-light"}>Last Price</div>
                <div className={"space-y-1"}>
                    <div className={"text-lg"}>{oracle ? (oracle) : 'Loading'}</div>
                    <div className={"text-sm align-middle"}>({formatRelative(new Date(oracleLastUpdated), new Date())})</div>
                </div>
            </div>
        </div>
    );
}