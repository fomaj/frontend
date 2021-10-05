import { useEffect } from 'react'
import {useAppDispatch} from "@redux/store";
import {setPrizePoolBalance} from "@redux/fomaj/fomajSlice";
import useGetLatestPrizePoolBalance from "@hooks/useGetLatestPrizePoolBalance";

const usePollPricePoolBalance = (seconds = 20) => {
    const { balance, refresh } = useGetLatestPrizePoolBalance()
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
        dispatch(setPrizePoolBalance(balance))
    }, [balance, dispatch])
}

export default usePollPricePoolBalance
