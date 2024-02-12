import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TableHeaderRow from "@/Components/Operations/TableTheadControl.jsx";

const TableRowControlAlt = ({ waste }) => {
    return (
        <table className="min-w-full border border-gray-300 text-center">
            <thead>
                <TableHeaderRow columnNames={waste} control />
            </thead>
            <tbody>
                <tr>
                    <td className="bg-lime-100 p-2 border hover:bg-gray-100 cursor-pointer">
                        TOTAL
                    </td>
                    {Array(10)
                        .fill(0)
                        .map((total, index) => (
                            <td
                                key={index}
                                className="bg-lime-100 p-2 border hover:bg-gray-100 cursor-pointer"
                            >
                                {total}
                            </td>
                        ))}
                </tr>
            </tbody>
        </table>
    );
};

export default TableRowControlAlt;
