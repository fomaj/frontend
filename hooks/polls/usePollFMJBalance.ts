import { useEffect } from 'react'
import {useAppDispatch} from "@redux/store";
import {setFMJBalance} from "@redux/fomaj/fomajSlice";
import useGetLatestFMJTokenBalance from "@hooks/useGetLatestFMJTokenBalance";

const usePollFMJBalance = (seconds = 10) => {
    const { balance, refresh } = useGetLatestFMJTokenBalance()
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
        dispatch(setFMJBalance(balance.toNumber()))
    }, [balance, dispatch])
}

export default usePollFMJBalance
