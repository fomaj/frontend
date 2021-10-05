import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useLastUpdated from "./useLastUpdated";
import usePollyAccount from "./usePollyAccount";
import {getFMJTokenContract} from "@helpers/contractHelper";

const useGetLatestFMJTokenBalance = () => {
    const [balance, setBalance] = useState(ethers.BigNumber.from(0))
    const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()
    const account = usePollyAccount();
    useEffect(() => {
        const fetchPrice = async () => {
            if (account) {
                const contract = getFMJTokenContract()
                const response = await contract.balanceOf(account)
                setBalance(response)
            }
        }
        fetchPrice()
    }, [account])

    return { balance, lastUpdated, refresh }
}

export default useGetLatestFMJTokenBalance