import {useWeb3React} from "@web3-react/core";
import {AddressTranslator} from "nervos-godwoken-integration";

export default function usePollyAccount() {
    const { account } = useWeb3React();
    const addressTranslator = new AddressTranslator();
    if (account) {
        return addressTranslator.ethAddressToGodwokenShortAddress(account);
    }
    return account;
}
