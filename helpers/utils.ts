export const getChainId = (): string => {
    return process.env.NEXT_PUBLIC_CHAIN_ID as string;
}

export const getRPCURL = (): string => {
    return process.env.NEXT_PUBLIC_RPC_URL as string;
}