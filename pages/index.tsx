import Head from 'next/head';

import Prediction from "../views/Prediction/Index";
import {Container} from "@views/Container";
import {Wallet} from "@views/Wallet";

import {useWalletOpened} from "@redux/app/selectors";
import usePollOraclePrice from "../hooks/polls/usePollOraclePrice";
import usePollFMJBalance from "../hooks/polls/usePollFMJBalance";
import {useAppDispatch} from "@redux/store";
import {fetchApprovalInfo, fetchFomajData} from "@redux/fomaj/fomajSlice";
import {useEffect} from "react";
import usePollStakeInfo from "@hooks/polls/usePollStakeInfo";
import usePollyAccount from "@hooks/usePollyAccount";
import usePollPricePoolBalance from "@hooks/polls/usePollPricePoolBalance";
import usePollUserBetHistory from "@hooks/polls/usePollUserBetHistory";

export default function Home() {
    const account = usePollyAccount();
    const walletOpened = useWalletOpened();
    const dispatch = useAppDispatch();

    usePollOraclePrice();
    usePollFMJBalance();
    usePollStakeInfo();
    usePollPricePoolBalance(20);
    usePollUserBetHistory();

    useEffect(() => {
        dispatch(fetchFomajData());
        if (account) {
            dispatch(fetchApprovalInfo(account));
        }
    }, [dispatch, account]);

    return (
        <div>
            <Head>
                <title>Fomaj Finance</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                {
                    walletOpened ? <Wallet/> : null
                }
                <Container>
                    <Prediction/>
                </Container>
            </main>
        </div>
    );
}
