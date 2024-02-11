import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TableHeaderRow from "@/Components/Operations/TableTheadControl.jsx";

/* tabla  alternativa de control pero solo fila de totales vacia */
const TableRowControlAlt = ({ waste }) => {
   

    return (
        <table className="min-w-full border border-gray-300">
            <thead>
                <TableHeaderRow columnNames={waste} control />
            </thead>
            <tbody>
                {/* total por grupo */}
                <tr>
                   
                </tr>
            </tbody>
        </table>
    );
};

export default TableRowControlAlt;
