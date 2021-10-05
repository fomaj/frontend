import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {
    useLiveBetAmount,
    useLiveBetPosition,
    useFMJBalance,
    useMinBetAmount, useCurrentRound,
} from "@redux/fomaj/selectors";
import {useAppDispatch} from "@redux/store";
import {setCurrentBet, setFMJBalance, setHistoryItem, setLiveBetAmount} from "@redux/fomaj/fomajSlice";
import useBetBull from "@hooks/tx/useBetBull";
import useBetBear from "@hooks/tx/useBetBear";
import useBetFlat from "@hooks/tx/useBetFlat";
import {Position} from "@redux/fomaj/types";

function BettingPanel() {
    const [amount, setAmount] = useState(0);
    const { onBetBull } = useBetBull();
    const { onBetBear } = useBetBear();
    const { onBetFlat } = useBetFlat();

    const [minBetAmountNotMet, setMinBetAmountError] = useState(false);
    const [fmjBalanceNotEnough, setFmjBalanceNotEnough] = useState(false);
    const dispatch = useAppDispatch();

    const fmjBalance = useFMJBalance();
    const minBetAmount = useMinBetAmount();

    const betAmount = useLiveBetAmount();
    const betPosition = useLiveBetPosition();

    const roundInfo = useCurrentRound();
    const onAmountChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let amountTyped = parseInt(e.target.value);
            let value = amountTyped;

            setMinBetAmountError(amountTyped < minBetAmount);
            if (amountTyped > fmjBalance) {
                value = fmjBalance;
            }
            setAmount(value)
        }
    }

    useEffect(() => {
        dispatch(setLiveBetAmount(amount));
    }, [amount, dispatch]);

    useEffect(() => {
        if (fmjBalance != null) {
            setFmjBalanceNotEnough(betAmount > fmjBalance)
        }
    }, [fmjBalance, betAmount])

    const handleBet = () => {
        toast.promise(
            () => {
                switch (betPosition) {
                    case Position.Bull:
                        return onBetBull(roundInfo.roundNumber, amount);
                    case Position.Bear:
                        return onBetBear(roundInfo.roundNumber, amount);
                    case Position.Flat:
                        return onBetFlat(roundInfo.roundNumber, amount);
                }
            },
            {
                pending: 'Please confirm the transaction using Metamask and wait for confirmation.',
                success: 'Betting success. 👌',
                error: 'An error occurred. 🤯'
            }
        ).then(() => {
            dispatch(setFMJBalance(fmjBalance - amount));
            // modify state
            // this changes the UI
            dispatch(setCurrentBet({
                amount: betAmount,
                winningsClaimed: false,
                betAmountClaimed: false,
                position: betPosition
            }))
            dispatch(setHistoryItem({
                hasClaimableFunds: false,
                hasWinnings: false,
                round: roundInfo.round,
                amount: betAmount,
                position: betPosition
            }))
        }).catch((e) => {
            console.error(e);
        })
    }

    return (
        <div className="m-3 bg-gray-800 px-4 py-5 space-y-3 border-t-8 border-gray-900 rounded-md">
            <div className={"flex space-x-2  bg-gray-900 py-5 px-5 rounded"}>
                <div className="flex flex-col space-y-2">
                    <input
                        id="amount"
                        type="number"
                        name="amount"
                        value={amount ? amount.toString() : ''}
                        onChange={onAmountChange}
                        placeholder={''}
                        className="text-lg font-bold px-4 py-2 text-gray-800 placeholder-gray-600 focus:outline-none"
                    />
                </div>
                <button
                    disabled={(minBetAmountNotMet || fmjBalanceNotEnough)}
                    onClick={handleBet}
                    className={"px-3 py-2 font-bold cursor-pointer bg-gray-900 rounded text-gray-50"}>
                    Send
                </button>
            </div>
            <div>Your FMJ balance: {fmjBalance}</div>
            {
                minBetAmountNotMet && <div className={"font-bold text-sm text-red-400"}>Min bet is {minBetAmount}</div>
            }
            {
                fmjBalanceNotEnough && <div className={"font-bold text-sm text-red-400"}>You do not have enough FMJ</div>
            }
        </div>
    );
}

export default BettingPanel;