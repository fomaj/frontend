import * as React from 'react';
import useApprove from "@hooks/tx/useApprove";
import {setFmjApproval} from "@redux/fomaj/fomajSlice";
import {useAppDispatch} from "@redux/store";
import {toast} from "react-toastify";

export function ApproveFmj() {
    const dispatch = useAppDispatch();
    const {approve} = useApprove();

    const onClick = () => {
        toast.promise(
            approve,
            {
                pending: 'Please confirm the transaction and Metamask and wait for the confirmation',
                success: 'Fomaj approved. 👌',
                error: 'An error occurred. 🤯. Please make sure you have an L2 Godwoken account with CKB in it.'
            }
        ).then(() => {
            dispatch(setFmjApproval(true));
        }).catch((e) => {
            console.error(e);
            dispatch(setFmjApproval(false));
        })
    }

    return (
        <div
            onClick={onClick}
            className={"mx-3 bg-gray-800 px-2 py-3 rounded-md font-bold text-xl  text-center cursor-pointer"}>
            Enable Fomaj
        </div>
    );
}