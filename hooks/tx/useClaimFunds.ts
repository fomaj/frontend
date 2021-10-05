import { useCallback } from 'react'
import { useFomajContract } from '@hooks/useContract'

const useClaimFund = () => {
    const contract = useFomajContract()

    const handleClaim = useCallback(
        async (roundNumbers: number[]) => {
            const txHash = await contract.claimLockedFunds(roundNumbers, {
                gasPrice: 0,
                gasLimit: 6000000
            });

            console.info(txHash)
        },
        [contract],
    )

    return { onClaim: handleClaim }
}

export default useClaimFund
