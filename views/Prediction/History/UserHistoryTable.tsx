import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table'
import {useUserBetHistory} from "@redux/fomaj/selectors";
import Loader from "react-loader-spinner";
import {HistoryBetItem} from "@redux/fomaj/types";
import ReclaimBetInfo from "@views/Prediction/History/ReclaimBetInfo";
import ClaimWinningsInfo from "@views/Prediction/History/ClaimWinningsInfo";
import {ClaimWinningsButton} from "@views/Prediction/History/ClaimWinningsButton";
import {ClaimFundsButton} from "@views/Prediction/History/ClaimFundsButton";

function PositionName({position}: {position: number}) {
    const [elm, setElm] = useState(<div>...</div>);
    useEffect(() => {
        switch (position) {
            case 3:
                setElm(<div className={"bg-blue-500 px-2 py-2 rounded text-gray-50 text-sm"}>
                    Flat
                </div>);
                break;
            case 1:
                setElm(<div className={"bg-green-500 px-2 py-2 rounded text-gray-50 text-sm"}>
                    Bull
                </div>);
                break;
            case 2:
                setElm(<div className={"bg-red-500 px-2 py-2 rounded text-gray-50 text-sm"}>
                    Bear
                </div>);
                break;
            case 0:
                setElm(<div className={"bg-gray-900 px-2 py-2 rounded text-gray-50 text-sm"}>
                    Pending
                </div>);
        }
    }, [position])
    return elm;
}
function UserHistoryTable() {
    const history = useUserBetHistory();
    const columns = React.useMemo(
        () => [
            {
                Header: 'Round Number',
                accessor: 'roundNumber',
            },
            {
                Header: 'Your bet',
                Cell: function UserPositionName({ row: { original } }) {
                    return(<PositionName position={(original.item as HistoryBetItem).position}/>)
                }
            },
            {
                Header: 'Results',
                Cell: function UserPositionName({ row: { original } }) {
                    return(<PositionName position={(original.item as HistoryBetItem).round.rewards.winner}/>)
                }
            },
            {
                Header: 'Re-claim Bet',
                Cell: function ClaimBet({ row: { original } }) {
                    return(<ReclaimBetInfo roundNumber={(original.item as HistoryBetItem).round.roundNumber}/>)
                },
            },
            {
                Header: 'Winnings',
                Cell: function ClaimBet({ row: { original } }) {
                    return(<ClaimWinningsInfo roundNumber={(original.item as HistoryBetItem).round.roundNumber}/>)
                },
            },
        ],

        []
    )

    const data = React.useMemo(
        () => {
            let elements = [];
            console.log(history.items)
            history.items.forEach(item => {
               elements.push({
                   roundNumber: item.round.roundNumber,
                   item: item
               })
            })
            return (
               elements
            )
        },
        [history]
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    if (history.fetching == null) return null;

    if (history.fetching) {
        return <div className="flex h-24">
            <div className="m-auto">
                <div className={"align-middle justify-center"}>
                    <Loader
                        type="ThreeDots"
                        color="#F9FAFB"
                        height={40}
                        width={40}
                    />
                </div>
            </div>
        </div>
    }

    return (
        <div className={"my-5 border-t-4 border-b-4 border-gray-900 py-5 space-y-5"}>
            <div className={"flex space-x-3"}>
                <div className={"text-lg font-bold"}>Your prediction history</div>
                <ClaimFundsButton/>
                <ClaimWinningsButton/>
            </div>
            {
                data.length == 0 && <div>You have not participated in any prediction previously.</div>
            }

            {
                data.length > 0 &&    <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    key={column.id}
                                    {...column.getHeaderProps()}
                                    className={"bg-gray-900 font-bold px-3"}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className={"px-8 py-2 border border-l border-gray-900"}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }
        </div>

    );
}

export default UserHistoryTable;