import React, { useState } from "react";
import {Inertia} from "@inertiajs/inertia";
import TableHeaderRow from "@/Components/Operations/TableTheadControl.jsx";
import {Icon} from "@iconify/react";

const   TableControl = ({ tableRows, setTableRows, organization,date,columnNames, donors }) => {
    const [columnTotals, setColumnTotals] = useState(Array(5).fill(0));
    const [selectedOrgs, setSelectedOrgs] = useState(
        Array(tableRows.length).fill(null)
    );

    const handleInputChange = (rowIndex, columnIndex, value) => {
        const newColumnTotals = [...columnTotals];
        newColumnTotals[columnIndex] += value;
        // Añadir lógica para la resta dinámica de las columnas 3 y 4
        if (columnIndex === 2 || columnIndex === 3) {
            newColumnTotals[4] = newColumnTotals[2] - newColumnTotals[3];
        }
        setColumnTotals(newColumnTotals);
    };

    const handleOrgSelect = (rowIndex, orgId) => {
        setSelectedOrgs((prevSelectedOrgs) => {
            const newSelectedOrgs = [...prevSelectedOrgs];
            newSelectedOrgs[rowIndex] = orgId;
            return newSelectedOrgs;
        });
    };

    const getAllCellValues = () => {
        const allValuesWithSums = tableRows.map((row, rowIndex) => [
            (parseInt(selectedOrgs[rowIndex])) || 0,
            ...row.slice(1, 4),
            row[2] - row[3],
        ]);
        return [...allValuesWithSums];
    };

    const obtenerValores = () => {
        const valores = getAllCellValues();
        Inertia.post(route("estimations.guardar"), {  values: valores,  date: date, donors: donors.id, });
    };

    const handleDeleteRow = (rowIndex) => {
        setTableRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
    };

    return (
        <>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <TableHeaderRow columnNames={columnNames}/>
                </thead>
                <tbody>
                    {tableRows.map((row, rowIndex) => (
                        <TableRowControl key={rowIndex} row={row} rowIndex={rowIndex}  onInputChange={handleInputChange}
                            setTableRows={setTableRows} organization={organization} selectedOrg={selectedOrgs[rowIndex]}
                            onOrgSelect={(orgId) => handleOrgSelect(rowIndex, orgId)} onDeleteRow={handleDeleteRow}
                        />
                    ))}
                    <tr>
                        {columnTotals.map((total, index) => (
                            <td key={index} className="bg-green-600 p-2 border">
                                {index === 0 ? "TOTAL" : Number.isInteger(total) ? total : total.toFixed(2)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button onClick={obtenerValores}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 float-right"
            >
                Guardar
            </button>
        </>
    );
};

const TableRowControl = ({row, rowIndex, onInputChange, setTableRows, organization, selectedOrg, onOrgSelect,
                             onDeleteRow }) => {
    const [values, setValues] = useState(row || Array(5).fill(0));

    const handleInputChange = (index, e) => {
        if (index === 0) {
            onOrgSelect(e.target.value);
        } else {
            const parsedValue = parseFloat(e.target.textContent);
            if (!isNaN(parsedValue)) {
                const newValues = [...values];
                const oldValue = newValues[index];
                newValues[index] = parsedValue;
                // Resta dinámica de "Kg a entregar" y "Kg Pendientes"
                const kgEntregar = newValues[2] || 0;
                const kgPendientes = newValues[3] || 0;
                newValues[4] = (kgEntregar - kgPendientes).toFixed(2);

                setValues(newValues);
                onInputChange(rowIndex, index, parsedValue - oldValue);
                setTableRows((prevRows) => {
                    const newRows = [...prevRows];
                    newRows[rowIndex] = newValues;
                    return newRows;
                });
            } else {
                e.target.textContent = 0;
            }
        }
    };

    const handleDeleteRow = () => {
        onDeleteRow(rowIndex);
    };

    return (
        <tr>
            {values.map((value, index) => (
                <td
                    key={index}
                    id={`cell-${rowIndex}-${index}`}
                    className="p-2 border hover:bg-gray-100 cursor-pointer"
                    contentEditable={index !== 4}
                    onBlur={(e) => handleInputChange(index, e)}
                    suppressContentEditableWarning={true}
                >
                    {index === 0 ? (
                        <select id={`organization-${rowIndex}`} value={selectedOrg || ""}
                                onChange={(e) => onOrgSelect(e.target.value)}
                                className="mt-1 block w-auto px-3 py-1 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                        >
                            <option value="" disabled>
                                Seleccione una organización
                            </option>
                            {organization.map((org) => (
                                <option key={org.id} value={org.id}>
                                    {org.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        value
                    )}
                </td>
            ))}
            <td className="p-2 border hover:bg-gray-100 cursor-pointer">
                <button onClick={handleDeleteRow}  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 float-right">
                    <Icon icon={"fluent:delete-32-regular"} />
                </button>
            </td>
        </tr>
    );
};

export default TableControl;
