import {useEffect, useRef} from 'react'
import {useAppDispatch} from "@redux/store";
import usePollyAccount from "../usePollyAccount";
import {useCurrentRoundNumber, useStatus} from "@redux/fomaj/selectors";
import {fetchCurrentRound, fetchFomajData, fetchCurrentRoundBet} from "@redux/fomaj/fomajSlice";
import {FomajStatus} from "@redux/fomaj/types";

let POLL_TIME_IN_SECONDS = 10

const usePollLiveRoundData = () => {
    const timer = useRef<NodeJS.Timeout>(null)
    const dispatch = useAppDispatch()
    const account = usePollyAccount()
    const currentRoundNumber = useCurrentRoundNumber()
    const status = useStatus()

    useEffect(() => {
        // Clear old timer
        if (timer.current) {
            clearInterval(timer.current)
        }
        timer.current = setInterval(async () => {
            if (status == FomajStatus.INITIAL) {
                dispatch(fetchFomajData())
                // retry sooner initially
                POLL_TIME_IN_SECONDS = 2;
            } else {
                dispatch(fetchCurrentRound())
                if (account) {
                    dispatch(fetchCurrentRoundBet(account))
                }
                POLL_TIME_IN_SECONDS = 10;
            }
        }, POLL_TIME_IN_SECONDS * 1000)


        return () => {
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [currentRoundNumber, timer, account, status, dispatch])
}

export default usePollLiveRoundData
