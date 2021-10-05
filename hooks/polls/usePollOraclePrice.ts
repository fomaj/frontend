import { useEffect } from 'react'
import useGetLatestOraclePrice from '../useGetLatestOraclePrice'
import {useAppDispatch} from "@redux/store";
import {setLastOraclePrice} from "@redux/fomaj/fomajSlice";

const usePollOraclePrice = (seconds = 20) => {
  const { price, refresh } = useGetLatestOraclePrice()
  const dispatch = useAppDispatch()

  // Poll for the oracle price
  useEffect(() => {
    refresh()
    const timer = setInterval(() => {
      refresh()
    }, seconds * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [seconds, refresh])

  // If the price changed update global state
  useEffect(() => {
    dispatch(setLastOraclePrice(price.toNumber()))
  }, [price, dispatch])
}

export default usePollOraclePrice
