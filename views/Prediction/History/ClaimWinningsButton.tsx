import * as React from 'react';
import {useUserBetHistory} from "@redux/fomaj/selectors";
import {useEffect, useState} from "react";
import useClaimWin from "@hooks/tx/useClaimWin";
import {toast} from "react-toastify";
import {setHistoryItem} from "@redux/fomaj/fomajSlice";
import {useAppDispatch} from "@redux/store";

export function ClaimWinningsButton() {
    const {onClaim} = useClaimWin();
    const dispatch = useAppDispatch();
    const [rounds, setRounds] = useState([]);
    const history = useUserBetHistory();

    useEffect(() => {
      if (history.fetching) return;
      const rounds: number[] = [];
      history.items.forEach((item) => {
          if(item.hasWinnings) {
              rounds.push(item.round.roundNumber);
          }
      });
      setRounds(rounds)
    }, [history])

    if (history.fetching) return <div className={"bg-gray-900 px-3 py-2"}>...</div>;
    if (!history.items || history.items.length == 0) return null;
    if (history.items.length != 0 && rounds.length == 0) return <div className={"bg-gray-900 px-3 py-2"}>No winnings to claim.</div>;

    const onClick = () => {
        if (rounds.length == 0) return;
        toast.promise(
            () => onClaim(rounds),
            {
                pending: 'Please confirm the transaction using Metamask and wait for confirmation.',
                success: 'Winnings claimed. 👌',
                error: 'An error occurred. 🤯'
            }
        ).then(() => {
            history.items.forEach(item => {
                if (item) {
                    // UI Change
                    dispatch(setHistoryItem({
                        hasClaimableFunds: item.hasClaimableFunds,
                        hasWinnings: false,
                        round: item.round,
                        amount: item.amount,
                        position: item.position
                    }))
                }
            })
        }).catch((e) => {
            console.error(e);
        })
    }
    return (
        <div>
            <div className={"bg-gray-900 px-3 py-2 cursor-pointer"} onClick={onClick}>Claim Winnings</div>
        </div>
    );
}