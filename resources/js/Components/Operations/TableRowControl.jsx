import React, { useState } from "react";

// Componente padre que maneja todas las filas
const TableControl = ({categories}) => {
    console.log(categories);
    const names = categories.map(category => category.category);

    const [columnTotals, setColumnTotals] = useState(Array(7).fill(0)); // Inicializar el estado con un array de 7 ceros
    const [allCellValues, setAllCellValues] = useState(Array(names.length).fill(Array(7).fill(0))); // Estado para mantener todos los valores de las celdas

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

    // Función para obtener todos los valores de las celdas
    const getAllCellValues = () => {
        return allCellValues.map(row => row.map(cell => parseFloat(cell) || 0));
    };

    return (
        <>
            {names.map((name, index) => (
                <TableRowControl
                    key={index}
                    name={name}
                    onInputChange={handleInputChange.bind(null, index)}
                />
            ))}
            <tr>
                <td className="p-2 border">Total Por Grupo</td>
                {columnTotals.map((total, index) => (
                    <td key={index} className="p-2 border">
                        {total}
                    </td>
                ))}
            </tr>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => console.log(getAllCellValues())}>Obtener Valores</button> {/* Botón para obtener todos los valores */}
        </>
    );
};

const TableRowControl = ({ name, onInputChange }) => {
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
        } else {
            e.target.textContent = 0; // Establecer a 0 si no es un número válido
        }
    };

    return (
        <tr>
            <td className="p-2 border">{name}</td>
            {values.map((value, index) => (
                <td
                    key={index}
                    className="p-2 border hover:bg-gray-100 cursor-pointer"
                    contentEditable={index !== values.length - 1} // Hacer que la última celda no sea editable
                    onInput={(e) => handleInputChange(index, e)} // Agregar el manejador de eventos de entrada
                >
                    {value}
                </td>
            ))}
        </tr>
    );
};

export default TableControl;
