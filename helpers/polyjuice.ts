import {PolyjuiceConfig} from "@polyjuice-provider/base";
import {getRPCURL} from "./utils";
import {PolyjuiceJsonRpcProvider} from "@polyjuice-provider/ethers";
import {Web3Provider} from "@ethersproject/providers";
import {PolyjuiceHttpProvider} from "@polyjuice-provider/web3";

const POLLING_INTERVAL = 12000
export const polyjuiceConfig: PolyjuiceConfig = {
    web3Url: getRPCURL(),
};
export const polyjuiceHttpProvider = new PolyjuiceHttpProvider(polyjuiceConfig.web3Url, polyjuiceConfig)
export const polyjuiceJsonRpcProvider = new PolyjuiceJsonRpcProvider(polyjuiceConfig, polyjuiceConfig.web3Url);

export const getLibrary = (): Web3Provider => {
    const library = new Web3Provider(
        polyjuiceHttpProvider
    )
    library.pollingInterval = POLLING_INTERVAL
    return library
}
