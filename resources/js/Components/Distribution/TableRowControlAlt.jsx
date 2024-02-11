import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TableHeaderRow from "@/Components/Operations/TableTheadControl.jsx";

/* tabla  alternativa de control pero solo fila de totales vacia */
const TableRowControlAlt = ({ 
    
    
 }) => {
   

    return (
        <table className="min-w-full border border-gray-300">
           
            <tbody>
                {/* total por grupo */}
                <tr>
                    <td className="border border-gray-300 p-2">Total</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0</td>
                    
                </tr>
            </tbody>
        </table>
    );
};

export default TableRowControlAlt;
