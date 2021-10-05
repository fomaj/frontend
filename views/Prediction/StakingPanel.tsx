import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {useFMJBalance, useMinStakeAmount, useStakeInfo} from "@redux/fomaj/selectors";
import useStake from "@hooks/tx/useStake";
import {useAppDispatch} from "@redux/store";
import {setFMJBalance, setStakedAmount} from "@redux/fomaj/fomajSlice";
import useGetStakedAmount from "@hooks/useGetStakedAmount";
import usePollyAccount from "@hooks/usePollyAccount";

function StakingPanel() {
    const [amount, setAmount] = useState(0);
    const [canStake, setCanStake] = useState(false);
    const [stakeRequired, setStakeRequired] = useState(0);
    const { onStake } = useStake();

    const { stakedAmount } = useGetStakedAmount();
    const userStakeInfo = useStakeInfo();
    const dispatch = useAppDispatch();
    const fmjBalance = useFMJBalance();
    const minStake = useMinStakeAmount();

    useEffect(() => {
        if (!fmjBalance != null) {
            setCanStake(fmjBalance >= amount)
        }
    }, [fmjBalance, amount]);

    useEffect(() => {
        setStakeRequired(minStake - userStakeInfo.stakedAmount)
    }, [minStake, userStakeInfo.stakedAmount]);

    const onAmountChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const amountTyped = parseInt(e.target.value);
            if (amountTyped > stakeRequired) {
                setAmount(stakeRequired)
            } else {
                setAmount(amountTyped)
            }
        }
    }

    const handleStake = () => {
        toast.promise(
            () => onStake(amount),
            {
                pending: 'Please confirm the transaction using Metamask and wait for confirmation.',
                success: 'Staking success. 👌',
                error: 'An error occurred. 🤯'
            }
        ).then(() => {
            const total = stakedAmount.add(amount).toNumber();
            dispatch(setFMJBalance(fmjBalance - amount));
            dispatch(setStakedAmount({
                stakedAmount: total,
                unlockTimestamp: total >= minStake ? Date.now() : 0
            }))
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            setAmount(0);
        })
    }

    return (
        <div className="m-3 bg-gray-800 px-4 py-5 space-y-3 border-t-8 border-gray-900 rounded-md">
            <div className={"font-bold px-1"}>Staking requirements haven&apos;t met.
            </div>
            <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-200 absolute"/>
                <div className="h-full bg-green-500 absolute" style={{
                    width: `${Math.min((userStakeInfo.stakedAmount/minStake)*100, 100)}%`
                }}/>
            </div>
            <div className={"text-xs text-gray-500 font-bold px-1"}>{`${userStakeInfo.stakedAmount} staked of ${minStake} required`}</div>
            <div className={"flex space-x-2  bg-gray-900 py-5 px-5 rounded"}>
                <div className="flex flex-col space-y-2">
                    <input
                        id="amount"
                        type="number"
                        name="amount"
                        value={amount ? amount.toString() : ''}
                        onChange={onAmountChange}
                        placeholder={stakeRequired.toString()}
                        className="text-lg font-bold px-4 py-2 text-gray-800 placeholder-gray-600 focus:outline-none"
                    />
                </div>
                <button
                    disabled={!canStake}
                    onClick={handleStake}
                    className={"px-3 py-2 font-bold cursor-pointer bg-gray-900 rounded text-gray-50"}>
                    Stake
                </button>
            </div>
            {
                !canStake && <div className={"font-bold text-sm text-red-400"}>You do not have enough FMJ.</div>
            }
        </div>
    );
}

export default StakingPanel;