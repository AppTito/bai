import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TableTheadControlByDate from "@/Components/Operations/TableTheadControlByDate.jsx";

const TableRowControlAlt = ({ waste, control }) => {
    return (
        <table className="min-w-full border border-gray-300 text-center">
            <thead>
                <TableTheadControlByDate columnNames={waste} control />
            </thead>
            <tbody>
                <tr>

                    {Object.keys(control).map((key, index) => (
                        <td
                            key={index}
                            className="bg-lime-100 p-2 border hover:bg-gray-100 cursor-pointer"
                        >
                            {control[key] !== null
                                ? control[key]
                                : "TOTAL"}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default TableRowControlAlt;
