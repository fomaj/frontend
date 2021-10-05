import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useLastUpdated from "./useLastUpdated";
import {getOracleContract} from "@helpers/contractHelper";

const useGetLatestOraclePrice = () => {
    const [price, setPrice] = useState(ethers.BigNumber.from(0))
    const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()

    useEffect(() => {
        const fetchPrice = async () => {
            const contract = getOracleContract()
            const response = await contract.latestAnswer()
            setPrice(response)
        }

        fetchPrice()
    }, [lastUpdated, setPrice])

    return { price, lastUpdated, refresh }
}

export default useGetLatestOraclePrice
