import React from "react";
import TableHeaderRow from "@/Components/Operations/TableTheadControl.jsx";

const TableControlVisual = ({ categories, waste }) => {
    return (
        <table className="min-w-full border border-gray-300">
            <thead>
                <TableHeaderRow columnNames={waste} control />
            </thead>
            <tbody>

            </tbody>
        </table>
    );
};

const TableRowControlVisual = ({ name }) => {
    return (
        <tr>
            <td className="p-2 border">{name}</td>
            {Array(7).fill(null).map((_, index) => (
                <td key={index} className="p-2 border hover:bg-gray-100 cursor-pointer">
                    
                </td>

            ))}
        </tr>
    );
};

export default TableControlVisual;
