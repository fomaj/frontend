import React, {useEffect, useState} from 'react';
import {RewardStatus, RoundStatus} from "@redux/fomaj/types";
import {useUserBetHistory} from "@redux/fomaj/selectors";

interface IProps {
    roundNumber: number
}
function ClaimWinningsInfo({roundNumber}: IProps) {
    const history = useUserBetHistory();
    const [elm, setElm] = useState(<div>...</div>);

    useEffect(() => {
        if (history.fetching) return;
        const bet = history.items.find(i => i.round.roundNumber == roundNumber);
        if (bet) {
            if (bet.round.status == RoundStatus.LIVE) {
                setElm(<div>Pending</div>);
                return;
            }

            if (bet.round.status == RoundStatus.CANCELLED || bet.round.rewards.status == RewardStatus.Cancelled) {
                setElm(<div>Round Cancelled / Empty Prize-pool</div>);
                return;
            }

            if (bet.round.status == RoundStatus.EXPIRED) {
                if (bet.hasWinnings) {
                    setElm(<div>Claimable</div>)
                    return;
                } else {
                    if (bet.position == bet.round.rewards.winner) {
                        setElm(<div>Claimed</div>)
                    } else {
                        setElm(<div>No winnings</div>)
                    }
                    return;
                }
            }
        }
    }, [history, roundNumber])
   return elm;
}

export default ClaimWinningsInfo;