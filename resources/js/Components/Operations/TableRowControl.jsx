import React, { useState } from "react";

// Componente padre que maneja todas las filas
const TableControl = () => {
    const names = [
        "Fruver",
        "Lacteos",
        "Panaderia",
        "Granos",
        "Embutidos",
        "Huevos",
        "Reposteria",
        "Carbohidrato Procesados",
        " Aderezos, Salsas y Condimentos",
        "Proteina",
        "Jugos y Bebidas",
        "Carbohidratos",
        "Enlatados y Conservas",
        "Floristeria",
        "Insumos de limpieza y Hogar",
    ]; // Reemplaza esto con los nombres de tus filas
    const [columnTotals, setColumnTotals] = useState(Array(7).fill(0)); // Inicializar el estado con un array de 7 ceros

    const handleInputChange = (rowIndex, columnIndex, value) => {
        // Actualizar el total de la columna correspondiente
        const newColumnTotals = [...columnTotals];
        newColumnTotals[columnIndex] += value;
        setColumnTotals(newColumnTotals);
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
        </>
    );
};

const TableRowControl = ({ name, onInputChange }) => {
    const [values, setValues] = useState(Array(7).fill(0)); // Inicializar el estado con un array de 7 ceros

    const handleInputChange = (index, e) => {
        const { textContent } = e.target;
        // Verificar si el valor ingresado es un número o un número decimal válido
        if (!isNaN(textContent)) {
            const newValues = [...values]; // Crear una copia del array de valores
            const oldValue = newValues[index];
            newValues[index] = parseFloat(textContent); // Actualizar el valor en el índice correspondiente
            newValues[newValues.length - 1] = newValues
                .slice(0, -1)
                .reduce((a, b) => a + b, 0); // Calcular la suma de los valores y almacenarla en la última celda
            setValues(newValues); // Actualizar el estado

            // Llamar a la función de manejo de entrada del componente padre para actualizar el total de la columna
            onInputChange(index, newValues[index] - oldValue);
        } else {
            e.target.textContent = 0; // Limpiar el contenido si no es un número válido
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
