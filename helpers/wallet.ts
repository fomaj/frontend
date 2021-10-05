import {getChainId, getRPCURL} from "@helpers/utils";

export const setupNetwork = async () => {
    const provider = window.ethereum
    if (provider) {
        const chainId = parseInt(getChainId(), 10)
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: 'Godwoken Polyjuice',
                        nativeCurrency: {
                            name: 'CKB',
                            symbol: 'ckb',
                            decimals: 18,
                        },
                        rpcUrls: [getRPCURL()],
                        // blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
                    },
                ],
            })
            // await provider.request({ method: 'wallet_switchEthereumChain', params:[{chainId: `0x${chainId.toString(16)}`}]})
            return true
        } catch (error) {
            console.error('Failed to setup the network in Metamask:', error)
            return false
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
        return false
    }
}
