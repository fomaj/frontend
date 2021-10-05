import { useCallback } from 'react'
import { useFomajContract } from '@hooks/useContract'

const useClaimWin = () => {
    const contract = useFomajContract()

    const handleBet = useCallback(
        async (roundNumbers: number[]) => {
            const txHash = await contract.claimWinnings(roundNumbers, {
                gasPrice: 0,
                gasLimit: 6000000
            });

            console.info(txHash)
        },
        [contract],
    )

    return { onClaim: handleBet }
}

export default useClaimWin
