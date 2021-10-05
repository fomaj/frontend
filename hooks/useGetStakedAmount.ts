import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useLastUpdated from "./useLastUpdated";
import usePollyAccount from "./usePollyAccount";
import { getFomajContract} from "@helpers/contractHelper";

const useGetStakedAmount = () => {
    const [stakedAmount, setStakedAmount] = useState(ethers.BigNumber.from(0))
    const [unlockTimestamp, setUnlockTimstamp] = useState(ethers.BigNumber.from(0))
    const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()
    const account = usePollyAccount();
    useEffect(() => {
        const fetchPrice = async () => {
            if (account) {
                const contract = getFomajContract()
                const response = await contract.userInfo(account)
                setStakedAmount(response.stakedAmount)
                setUnlockTimstamp(response.unlockTimestamp)
            }
        }
        fetchPrice()
    }, [account])

    return { stakedAmount, unlockTimestamp, lastUpdated, refresh }
}

export default useGetStakedAmount