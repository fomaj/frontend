import React from 'react';
import {BetBullButton} from "@views/Prediction/Bet/BetBullButton";
import {BetFlatButton} from "@views/Prediction/Bet/BetFlatButton";
import {BetBearButton} from "@views/Prediction/Bet/BetBearButton";
import {useCurrentRound} from "@redux/fomaj/selectors";

function BetButtonsPanel() {
    const roundInfo = useCurrentRound();

    const locked = roundInfo.round && (Date.now() > (roundInfo.round.timestamps.lockTimestamp * 1000));

    return (

        <div>
            {
                !roundInfo.fetching && <div className={"font-medium px-3 text-lg font-sans"}>Predict</div>
            }
            {
                locked && <div className={"px-3 text-red-400"}>Lock time reached.</div>
            }
            <BetBullButton />
            <BetFlatButton />
            <BetBearButton />
        </div>
    );
}

export default BetButtonsPanel;