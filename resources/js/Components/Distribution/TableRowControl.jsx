import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

const TableControl = ({ tableRows, organization }) => {
    /* Definir la cantidad de 0s a llenar */
    const [columnTotals, setColumnTotals] = useState([
        null,
        ...Array(19).fill(0),
    ]); // null indica que el primer valor no se llene en 0 sino en vacío

    /* Función para sumar los valores de las columnas */
    const handleInputChange = (rowIndex, columnIndex, value) => {
        if (columnIndex !== 0) {
            const newColumnTotals = [...columnTotals];
            newColumnTotals[columnIndex] += value;
            setColumnTotals(newColumnTotals);
        }
    };

    return (
        <>
            {tableRows.map((row, rowIndex) => (
                <TableRowControl
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    onInputChange={handleInputChange}
                    organization={organization}
                />
            ))}
            <tr>
                {/* El único valor de la fila que suma cada columna le asigno TOTAL */}
                {columnTotals.map((total, index) => (
                    <td key={index} className="bg-green-600 p-2 border">
                        {total !== null ? total : "TOTAL"}
                    </td>
                ))}
            </tr>
        </>
    );
};

const TableRowControl = ({ row, rowIndex, onInputChange, organization }) => {
    // Estado para el valor seleccionado del select
    const [selectedOrg, setSelectedOrg] = useState(null);

    /* Llenar de 0s nuevamente ahora el array de values */
    const [values, setValues] = useState(row || Array(20).fill(0));

    const handleInputChange = (index, e) => {
        const { textContent, key } = e;

        /* No considerar la primera columna para la regla de sólo números */
        if (index === 0) {
            return;
        }

        /* Control de navegación entre celdas con Enter */
        if (key === "Enter") {
            e.preventDefault(); // Evita que la función por Defecto de Enter se ejecute
            handleCellNavigation(index); // Le asigna su propia función
            return;
        }

        handleCellBlur(index, textContent);
    };

    /* Función navegación entre celdas */
    const handleCellNavigation = (index) => {
        const nextColumnIndex = (index + 1) % values.length;
        const nextCell = document.getElementById(
            `cell-${rowIndex}-${nextColumnIndex}`
        );
        if (nextCell) {
            nextCell.focus(); // Ubica en la celda correspondiente
        }
    };

    /* Función Evitar que los dígitos se ingresen al revés */
    const handleCellBlur = (index, textContent) => {
        const parsedValue = parseFloat(textContent);
        if (!isNaN(parsedValue)) {
            const newValues = [...values];
            const oldValue = newValues[index];
            newValues[index] = parsedValue;

            const ignoreIndices = [0, 1, 2, 18, 19];
            newValues[newValues.length - 3] = newValues
                .map((value, i) => (ignoreIndices.includes(i) ? 0 : value))
                .reduce((a, b) => a + b, 0);

            setValues(newValues);
            onInputChange(rowIndex, index, parsedValue - oldValue);
        } else {
            e.target.textContent = 0;
        }
    };

    return (
        <tr>
            {values.map((value, index) => {
                /* Listado Organizaciones primera columna de la tabla */
                if (index === 0) {
                    return (
                        <td
                            key={index}
                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                        >
                            <select
                                id={`organization-${rowIndex}`}
                                name={`organization-${rowIndex}`}
                                autoComplete="organization"
                                value={selectedOrg || ""}
                                onChange={(e) => setSelectedOrg(e.target.value)}
                                className="w-40 mt-1 block py-1 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                            >
                                <option value="" disabled hidden>
                                    Seleccione
                                </option>
                                {organization.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </td>
                    );
                } else if (index === values.length - 1) {
                    /* Botón "Ver" de la última Columna */
                    return (
                        <td
                            key={index}
                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                        >
                            <Link
                                href='/factura'
                                className="flex items-center justify-center bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-700"
                            >
                                <Icon
                                    className="mr-1"
                                    icon="iconamoon:invoice"
                                />
                                Ver
                            </Link>
                        </td>
                    );
                }

                return (
                    /* Celdas de la tabla */
                    <td
                        key={index}
                        id={`cell-${rowIndex}-${index}`}
                        className="p-2 border hover:bg-gray-100 cursor-pointer"
                        suppressContentEditableWarning={true}
                        /* Valores no editables de la tabla: columna "total" y "Nota" */
                        contentEditable={index !== values.length - 3}
                        /* Uso de onBlur para evitar que los dígitos se ingresen al revés en lugar de onInput */
                        onBlur={(e) =>
                            handleCellBlur(index, e.target.textContent)
                        }
                        /* Uso de onKeyDown para permitir la navegación entre celdas con la tecla Enter */
                        onKeyDown={(e) => handleInputChange(index, e)}
                    >
                        {value}
                    </td>
                );
            })}
        </tr>
    );
};

export default TableControl;
