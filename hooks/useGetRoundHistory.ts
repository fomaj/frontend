import { useEffect, useState } from 'react'
import useLastUpdated from "./useLastUpdated";
import usePollyAccount from "./usePollyAccount";
import {getFomajContract} from "@helpers/contractHelper";

const useGetRoundHistory = () => {
    const [rounds, setRounds] = useState([])
    const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()
    const account = usePollyAccount();
    useEffect(() => {
        const fetchHistory = async () => {
            if (account) {
                const contract = getFomajContract()
                const roundsList = await contract.userRounds(account);
                setRounds(roundsList.map(r => r.toNumber()))
            }
        }
        fetchHistory()
    }, [account])

    return { rounds, lastUpdated, refresh }
}

export default useGetRoundHistory