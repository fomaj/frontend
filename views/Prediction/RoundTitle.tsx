import React from 'react';
import {useCurrentRound} from "@redux/fomaj/selectors";
import Loader from "react-loader-spinner";
import {formatDistanceToNow} from "date-fns";
function RoundTitle() {
    const roundInfo = useCurrentRound();
    const closeTimeReached = roundInfo.round && (Date.now() > (roundInfo.round.timestamps.closeTimestamp * 1000));

    return (
        <div className={"my-5 py-5 px-4 rounded bg-gray-900"}>
            <div className={"text-green-600 font-bold flex"}>Round # {

                roundInfo.fetching ? <div className={"px-4"}><Loader
                    type="ThreeDots"
                    color="#F9FAFB"
                    height={20}
                    width={20}
                /></div> : roundInfo.roundNumber
            }</div>

            {
                !closeTimeReached && <div className={"sm:flex sm:space-x-3 sm:text-2xl md:text-3xl font-sans sm:space-x-3"}>
                    Will CKB/USD rise or fall <div className={"px-4"}>
                    {
                        roundInfo.fetching ? <Loader
                            type="ThreeDots"
                            color="#F9FAFB"
                            height={40}
                            width={40}
                        /> : formatDistanceToNow(new Date(roundInfo.round.timestamps.closeTimestamp * 1000), {addSuffix: true})
                    }
                </div> ?
                </div>
            }

            {
                closeTimeReached &&
                <div className={"sm:flex sm:space-x-3 sm:text-2xl md:text-3xl font-sans sm:space-x-3"}>
                   Close time reached. Please check back in few minutes to join the next round.
                </div>
            }
        </div>
    );
}

export default RoundTitle;