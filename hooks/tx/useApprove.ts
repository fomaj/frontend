import { useCallback } from 'react'
import {useFMJTokenContract} from '@hooks/useContract'
import {MaxUint256} from "@ethersproject/constants";
import {getFomajAddress} from "@helpers/addressHelper";

const useApprove = () => {
    const fmjAddress = getFomajAddress();
    const contract = useFMJTokenContract();

    const approve = useCallback(
        async () => {
            return await contract.approve(fmjAddress, MaxUint256, {
                gasPrice: 0,
                gasLimit: 6000000
            });
        },
        [contract, fmjAddress],
    )

    return { approve }
}

export default useApprove
