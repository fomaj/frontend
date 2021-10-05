import {useSelector} from "react-redux";
import {RootState} from "../store";

export const useWalletOpened = () => {
    return useSelector((state: RootState) => state.app.walletOpened);
}