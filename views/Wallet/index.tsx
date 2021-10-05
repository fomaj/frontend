import * as React from 'react';
import {setWalletOpen} from "@redux/app/appSlice";
import {useFMJBalance} from "@redux/fomaj/selectors";
import {useAppDispatch} from "@redux/store";
import useFaucet from "@hooks/tx/useRequestFMJ";
import {toast} from "react-toastify";
import {getFMJTokenContract} from "@helpers/contractHelper";
import usePollyAccount from "@hooks/usePollyAccount";
import {setFMJBalance} from "@redux/fomaj/fomajSlice";

export function Wallet() {
    const fmjBalance = useFMJBalance();
    const dispatch = useAppDispatch();
    const {onRequest} = useFaucet();
    const account = usePollyAccount();

    const onRequestFMJ = () => {
        toast.promise(
            () => onRequest(),
            {
                pending: 'Requesting test FMJ tokens. Please wait',
                success: 'You got it.👌 It might take a minute for balance to be updated in the UI.',
                error: 'An error occurred. 🤯'
            }
        ).then(() => {
            getFMJTokenContract().balanceOf(account).then((balance) => {
                dispatch(setFMJBalance(balance.toNumber()))
            });
        }).catch((e) => {
            console.error(e);
        });
    }
    return (
        <>
            <div
                className="bg-gray-900 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl border-4 border-gray-300">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-ful outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 rounded-t text-gray-100">
                            <div className="text-xl font-semibold">
                                Fomaj Wallet
                            </div>
                        </div>
                        {/*body*/}
                        <div className="border-8 border-gray-900">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                                    <dt className="font-bold text-gray-900">
                                        FMJ Balance
                                    </dt>
                                    <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <div className={"flex space-x-3"}>
                                            <div className={"text-gray-900 font-bold text-lg"}>{fmjBalance}</div>
                                            <button onClick={onRequestFMJ} className={"px-3 py-2 font-bold cursor-pointer bg-gray-900 rounded text-gray-50"}>
                                                Get Test FMJ
                                            </button>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                            </div>
                        {/*footer*/}
                        <div
                            className="bg-gray-900 flex items-center justify-end p-6 rounded-b">
                            <button
                                className="text-gray-900 bg-gray-50 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => dispatch(setWalletOpen(false))}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </>
    );
}