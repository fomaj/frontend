import React, {useEffect, useState} from 'react';
import {RoundStatus} from "@redux/fomaj/types";
import {useUserBetHistory} from "@redux/fomaj/selectors";

interface IProps {
    roundNumber: number
}
function ReclaimBetInfo({roundNumber}: IProps) {
    const history = useUserBetHistory();
    const [elm, setElm] = useState(<div>...</div>);

    useEffect(() => {
        if (history.fetching) return;
        const bet = history.items.find(i => i.round.roundNumber == roundNumber);
        if (bet) {
            console.log(bet.round.status);
            if (bet.round.status == RoundStatus.LIVE) {
                setElm(<div>Locked</div>);
                return;
            }

            if (bet.hasClaimableFunds) {
                setElm(<div>Claimable</div>)
            }else {
                setElm(<div>Claimed</div>)
            }
        }
    }, [history, roundNumber])
   return elm;
}

export default ReclaimBetInfo;