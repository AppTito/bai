import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

// Componente padre que maneja todas las filas
const TableControl = ({
    categories,
    onDataChange,
    wastesColumns,
    date,
    donors,
    recovered,
    weigth,
}) => {
    console.log(wastesColumns.length + 1);
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

    // Función para obtener todos los valores de las celdas
    const getAllCellValues = () => {
        const allValuesWithSums = allCellValues.map((row) => {
            const sumOfFirstSixColumns = row
                .slice(0, wastesColumns.length + 1 - 1)
                .reduce((acc, val) => acc + val, 0);
            return [
                ...row.slice(0, wastesColumns.length + 1 - 1),
                sumOfFirstSixColumns,
            ]; // Mantener solo las primeras 6 columnas y agregar la suma como la séptima columna
        });

        // Calcular la suma de cada columna, incluida la columna adicional que representa la suma de las primeras 6 columnas
        const columnSums = Array(wastesColumns.length + 1).fill(0);
        allValuesWithSums.forEach((row) => {
            row.forEach((value, index) => {
                columnSums[index] += value;
            });
        });

        // Calcular la suma total de la columna "Peso Total"
        const sumTotalWeight = allValuesWithSums
            .map((row) => row[wastesColumns.length]) // Obtener valores de la columna "Peso Total"
            .reduce((acc, val) => acc + val, 0);

        setTotalWeight(sumTotalWeight); // Actualizar el estado con la suma total de la columna "Peso Total"

        return [...allValuesWithSums, columnSums]; // Devolver las filas y la suma total de columnas
    };

    const sendDataToDatabase = () => {
        const dataToSend = [...getAllCellValues()]; // Incluye las filas y las sumas de las columnas
        Inertia.post(route("operations.guardar"), {
            allCellValues: dataToSend,
            date: date,
            donors: donors.id,
            recovered: recovered,
            weigth: weigth,
        });
    };
    return (
        <>
            {names.map((name, index) => (
                <TableRowControl
                    key={index}
                    name={name}
                    onInputChange={handleInputChange.bind(null, index)}
                    onCellChange={handleCellChange}
                />
            ))}
            <tr>
                <td className="p-2 border">Total Por Grupo</td>
                {columnTotals.map((total, index) => (
                    <td key={index} className="p-2 border">
                        {index === wastesColumns.length ? totalWeight : total}
                    </td>
                ))}
            </tr>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => sendDataToDatabase()}
            >
                Obtener Valores
            </button>{" "}
            {/* Botón para obtener todos los valores */}
        </>
    );
};

const TableRowControl = ({ name, onInputChange, onCellChange }) => {
    const [values, setValues] = useState(Array(7).fill(0)); // Inicializar el estado con un array de 7 ceros

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
                    onKeyDown={(e) => handleKeyDown(index, e)} // Agregar el manejador de eventos onKeyDown
                >
                    {value}
                </td>
            ))}
        </tr>
    );
};

export default TableControl;
