import { useCallback } from 'react'
import {useFaucetContract} from '@hooks/useContract'

const useFaucet = () => {
    const contract = useFaucetContract()

    const handleRequest = useCallback(
        async () => {
            const txHash = await contract.requestToken({
                gasPrice: 0,
                gasLimit: 6000000
            });

            console.info(txHash)
        },
        [contract],
    )

    return { onRequest: handleRequest }
}

export default useFaucet
