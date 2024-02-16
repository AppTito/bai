import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

//const TableRowControlAlt = ({ tableRows, organization }) => {
    /*const [columnTotals, setColumnTotals] = useState([
        null,
        ...Array(18).fill(0), 
        // aqui se llenan los datos 
    ]);*/

    const TableRowControlAlt = ({ tableRows, organization, distribution }) =>{
    const [columnTotals, setColumnTotals] = useState([
        null,
        distribution.porcentaje,
        distribution.fruver,
        distribution.lacteos,
        distribution.panaderia,
        distribution.granos,
        distribution.embutidos,
        distribution.huevos,
        distribution.cereales,
        distribution.reposteria,
        distribution.procesados,
        distribution.salsas,
        distribution.proteina,
        distribution.jugos,
        distribution.carbohidratos,
        distribution.floristeria,
        distribution.enlatados,
        distribution.proteina_kfc,
        distribution.procesado_kfc,
        distribution.total,
        distribution.kg_pendientes,
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
                {columnTotals.slice(1).map((total, index) => (
                    <td
                        key={index}
                        className="bg-lime-100 p-2 border hover:bg-gray-100 cursor-pointer"
                        suppressContentEditableWarning={true}
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
