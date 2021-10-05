import { useEffect, useState } from 'react'
import useLastUpdated from "./useLastUpdated";
import {getPrizePoolContract} from "@helpers/contractHelper";

const useGetLatestPrizePoolBalance = () => {
    const [balance, setBalance] = useState<number>(0);
    const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()
    const contract = getPrizePoolContract()
    useEffect(() => {
        const fetchPrice = async () => {
           const response = await contract.prizePoolAmount();
           setBalance(response.toNumber());
        }
        fetchPrice()
    }, [contract])

    return { balance, lastUpdated, refresh }
}

export default useGetLatestPrizePoolBalance