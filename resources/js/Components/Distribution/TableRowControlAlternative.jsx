import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

const TableRowControlAlt = ({ tableRows, organization }) => {
    const [columnTotals, setColumnTotals] = useState([
        null,
        ...Array(18).fill(0),
    ]);

    const handleTotalChange = (index, e) => {
        const newColumnTotals = [...columnTotals];
        const parsedValue = parseFloat(e.target.textContent);
        
        if (!isNaN(parsedValue)) {
            newColumnTotals[index] = parsedValue;
            setColumnTotals(newColumnTotals);
        } else {
            // Si el contenido no es un número, establecer el valor a 0
            e.target.textContent = 0;
        }
    };

    return (
        <>
            {tableRows.map((row, rowIndex) => (
                <TableRowControlAlternative
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    organization={organization}
                />
            ))}
            <tr>
                {columnTotals.map((total, index) => (
                    <td
                        key={index}
                        className="bg-lime-700 p-2 border hover:bg-gray-100 cursor-pointer"
                        suppressContentEditableWarning={true}
                        contentEditable={index !== 0}
                        onBlur={(e) => handleTotalChange(index, e)}
                        onKeyDown={(e) => {}}
                    >
                        {total !== null ? total : "TOTAL"}
                    </td>
                ))}
            </tr>
        </>
    );
};

const TableRowControlAlternative = ({ row, rowIndex, organization }) => {
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [values, setValues] = useState(row || Array(20).fill(0));

    return <tr>{values.map((value, index) => {})}</tr>;
};

export default TableRowControlAlt;
