import { useCallback } from 'react'
import { useFomajContract } from '@hooks/useContract'

const useBetBull = () => {
    const contract = useFomajContract()

    const handleBet = useCallback(
        async (roundNumber: number, amount: number) => {
            if (roundNumber) {
                const txHash = await contract.betBull(roundNumber, amount, {
                    gasPrice: 0,
                    gasLimit: 6000000
                });
                console.info(txHash)
            }

        },
        [contract],
    )

    return { onBetBull: handleBet }
}

export default useBetBull
