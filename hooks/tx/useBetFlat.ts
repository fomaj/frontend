import { useCallback } from 'react'
import { useFomajContract } from '@hooks/useContract'

const useBetFlat = () => {
    const contract = useFomajContract()

    const handleBet = useCallback(
        async (roundNumber: number, amount: number) => {
            if (roundNumber) {
                const txHash = await contract.betFlat(roundNumber, amount, {
                    gasPrice: 0,
                    gasLimit: 6000000
                });

                console.info(txHash)
            }
        },
        [contract],
    )

    return { onBetFlat: handleBet }
}

export default useBetFlat
