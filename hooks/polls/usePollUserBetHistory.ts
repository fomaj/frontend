import { useEffect } from 'react'
import {useAppDispatch} from "@redux/store";
import {fetchRoundHistory} from "@redux/fomaj/fomajSlice";
import useGetRoundHistory from "@hooks/useGetRoundHistory";
import usePollyAccount from "@hooks/usePollyAccount";

const usePollUserBetHistory = (seconds = 10) => {
    const { rounds, refresh } = useGetRoundHistory()
    const account = usePollyAccount()
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

    useEffect(() => {
        if (account) {
            rounds.forEach(roundNumber => {
                dispatch(fetchRoundHistory({roundNumber, account}))
            })
        }
    }, [rounds, account, dispatch])
}

export default usePollUserBetHistory
