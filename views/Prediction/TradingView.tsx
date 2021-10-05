import React, {useMemo} from 'react'
import {AdvancedChart} from "react-tradingview-embed";
const TradingView = () => {
  return useMemo(() => {
    return <AdvancedChart widgetProps={{"theme": "dark", "symbol": "BINANCE:CKBUSDT", "height": "500"}}/>
  }, []);
}

export default TradingView
