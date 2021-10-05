import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import {
    getPrizePoolContract,
    getFMJTokenContract,
    getFomajContract,
    getOracleContract, getFaucetContract
} from "@helpers/contractHelper";
import useActiveWeb3React from "./useActiveWeb3React";

export default function useContract(address: string, ABI: any, withSigner = false) {
  const { library, account } = useWeb3React();

  return useMemo(
    () =>
      !!address && !!ABI && !!library
        ? new Contract(
            address,
            ABI,
            withSigner ? library.getSigner(account).connectUnchecked() : library
          )
        : undefined,
    [address, ABI, withSigner, library, account]
  );
}


export const useFomajContract = () => {
    const { library, account } = useActiveWeb3React();
    return useMemo(() => getFomajContract(library?.getSigner(account as string | undefined)), [account, library]);
}

export const useFMJTokenContract = () => {
    const { library, account } = useActiveWeb3React()
    return useMemo(() => getFMJTokenContract(library?.getSigner(account as string | undefined)), [account, library]);
}

export const usePrizePoolContract = () => {
    const { library, account } = useActiveWeb3React()
    return useMemo(() => getPrizePoolContract(library?.getSigner(account as string | undefined)), [account, library]);
}

export const useOracleContract = () => {
    const { library, account } = useActiveWeb3React()
    return useMemo(() => getOracleContract(library?.getSigner(account as string | undefined)), [account, library]);
}

export const useFaucetContract = () => {
    const { library, account } = useActiveWeb3React()
    return useMemo(() => getFaucetContract(library?.getSigner(account as string | undefined)), [account, library]);
}