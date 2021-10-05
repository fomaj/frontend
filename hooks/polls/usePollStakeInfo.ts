import { useEffect } from 'react'
import {useAppDispatch} from "@redux/store";
import {setStakedAmount} from "@redux/fomaj/fomajSlice";
import useGetStakedAmount from "@hooks/useGetStakedAmount";

const usePollStakeInfo = (seconds = 20) => {
    const { stakedAmount, unlockTimestamp, refresh } = useGetStakedAmount()
    const dispatch = useAppDispatch()

    // Poll for the oracle price
    useEffect(() => {
        refresh()
        const timer = setInterval(() => {
            refresh()
        }, seconds * 1000)

        return () => {
            clearInterval(timer)
        }
    }, [seconds, refresh])

    // If the price changed update global state
    useEffect(() => {
        dispatch(setStakedAmount({
            stakedAmount: stakedAmount.toNumber(),
            unlockTimestamp: unlockTimestamp.toNumber(),
        }))
    }, [stakedAmount, unlockTimestamp, dispatch])
}

export default usePollStakeInfo
