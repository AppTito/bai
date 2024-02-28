import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TableHeaderRow from "@/Components/Operations/TableTheadControl.jsx";

const TableControl = ({  categories, onDataChange, wastesColumns, date,
    donors,  waste,totals }) => {
    let totalsArray = Object.values(totals.totalValues);
    const sum = totalsArray.reduce((a, b) => a + b, 0);
    totalsArray.push(sum);

    const [totalWeight, setTotalWeight] = useState(0);
    const names = categories.map((category) => category.category);
    const [columnTotals, setColumnTotals] = useState(
        Array(wastesColumns.length + 1).fill(0)
    ); // Inicializar el estado con un array de 7 ceros
    const initialCellValues = names.map(() =>
        Array(wastesColumns.length + 1).fill(0)
    );
    const [allCellValues, setAllCellValues] = useState(initialCellValues);

    const handleInputChange = (rowIndex, columnIndex, value, oldValue) => {
        // Actualizar el total de la columna correspondiente
        const newColumnTotals = [...columnTotals];
        newColumnTotals[columnIndex] += value - oldValue;
        setColumnTotals(newColumnTotals);

        // Actualizar el estado con todos los valores de las celdas
        const newAllCellValues = allCellValues.map((row, index) => {
            if (index === rowIndex) {
                const newRow = [...row];
                newRow[columnIndex] = value;
                return newRow;
            }
            return row;
        });
        setAllCellValues(newAllCellValues);
    };

    const handleCellChange = (rowName, columnIndex, value) => {
        // Actualizar el estado con todos los valores de las celdas
        const newAllCellValues = allCellValues.map((row, index) => {
            if (index === names.indexOf(rowName)) {
                const newRow = [...row];
                newRow[columnIndex] = value;
                return newRow;
            }
            return row;
        });
        setAllCellValues(newAllCellValues);

        // Llamar a la función onDataChange con los nuevos valores
        onDataChange(getAllCellValues());
    };

    const getAllCellValues = () => {
        const allValuesWithSums = allCellValues.map((row, rowIndex) => {
            const sumOfFirstSixColumns = row
                .slice(1, wastesColumns.length + 1)
                .reduce((acc, val) => acc + val, 0);
            return [
                totalsArray[rowIndex], // Agregar totalsArray a la fila
                ...row.slice(1, wastesColumns.length + 1),
                sumOfFirstSixColumns,
            ];
        });

        // Calcular la suma de cada columna, incluida la columna adicional que representa la suma de las primeras 6 columnas
        const columnSums = Array(wastesColumns.length + 2).fill(0);
        allValuesWithSums.forEach((row) => {
            row.forEach((value, index) => {
                columnSums[index] += value;
            });
        });

        // Asegurarse de que la suma de la primera columna incluye los valores de totalsArray
        columnSums[0] = totalsArray.reduce((acc, val) => acc + val, 0);

        // Asegurarse de que la suma de la última columna incluye los valores de totalsArray
        columnSums[columnSums.length - 1] += totalsArray.reduce((acc, val) => acc + val, 0);

        const sumTotalWeight = allValuesWithSums
            .map((row) => row[wastesColumns.length + 1])
            .reduce((acc, val) => acc + val, 0);

        setTotalWeight(sumTotalWeight);

        return [...allValuesWithSums, columnSums];
    };

    const sendDataToDatabase = () => {
        const dataToSend = [...getAllCellValues()];

        Inertia.post(route("operations.guardar"), {
            allCellValues: dataToSend,
            date: date,
            donors: donors.id,
        });
    };
    return (
        <>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <TableHeaderRow columnNames={waste} control />
                </thead>
                <tbody>
                    {names.map((name, index) => (
                        <TableRowControl
                            key={index}
                            name={name}
                            onInputChange={handleInputChange.bind(null, index)}
                            onCellChange={handleCellChange}
                            totalsArray={totalsArray[index]}
                        />
                    ))}
                    <tr>
                        <td className="p-2 border">Total Por Grupo</td>
                        {columnTotals.map((total, index) => (
                            <td key={index} className="p-2 border">
                                {index === wastesColumns.length
                                    ? totalWeight
                                    : total}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <br />
            <div className="flex justify-end">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => sendDataToDatabase()}
            >
                Obtener Valores
            </button>
        </div>
        </>
    );
};

const TableRowControl = ({ name, onInputChange, onCellChange, totalsArray}) => {
    const [values, setValues] = useState([totalsArray, ...Array(9).fill(0)]); // Insert totalsArray at the first position

    const handleInputChange = (index, e) => {
        const { textContent } = e.target;
        // Verificar si el valor ingresado es un número o un número decimal válido
        if (textContent === "" || !isNaN(textContent)) {
            const newValues = [...values]; // Crear una copia del array de valores
            const oldValue = newValues[index];
            newValues[index] = parseFloat(textContent) || 0; // Usar 0 si el valor no es un número
            newValues[newValues.length - 1] = newValues
                .slice(0, -1)
                .reduce((a, b) => a + b, 0); // Calcular la suma de los valores y almacenarla en la última celda
            setValues(newValues); // Actualizar el estado

            // Llamar a la función de manejo de entrada del componente padre para actualizar el total de la columna
            onInputChange(index, newValues[index], oldValue);

            // Llamar a la función de manejo de cambio de celda
            onCellChange(name, index, newValues[index]);
        } else {
            e.target.textContent = 0; // Establecer a 0 si no es un número válido
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < values.length) {
                const cell = document.getElementById(
                    `cell-${name}-${nextIndex}`
                );
                if (cell) {
                    cell.focus();
                }
            }
        }
    };

    return (
        <tr>
            <td className="p-2 border">{name}</td>
            {values.map((value, index) => (
                <td
                    key={index}
                    id={`cell-${name}-${index}`}
                    className="p-2 border hover:bg-gray-100 cursor-pointer"
                    contentEditable={index !== values.length - 1}
                    onBlur={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)} // Agregar  eventos onKeyDown
                    suppressContentEditableWarning={true}
                >
                    {value}
                </td>
            ))}
        </tr>
    );
};

export default TableControl;
