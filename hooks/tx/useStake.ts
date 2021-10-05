import { useCallback } from 'react'
import { useFomajContract } from '@hooks/useContract'

const useStake = () => {
    const contract = useFomajContract()

    const handleStake = useCallback(
        async (amount: number) => {
            const txHash = await contract.stake(amount, {
                gasPrice: 0,
                gasLimit: 6000000
            });

            console.info(txHash)
        },
        [contract],
    )

    return { onStake: handleStake }
}

export default useStake
