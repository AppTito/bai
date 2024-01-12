import React, { useState } from "react";

const TableControl = ({ tableRows , organization }) => {
  const [columnTotals, setColumnTotals] = useState(Array(5).fill(0));

  const handleInputChange = (rowIndex, columnIndex, value) => {
    const newColumnTotals = [...columnTotals];
    newColumnTotals[columnIndex] += value;
    setColumnTotals(newColumnTotals);
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
        {columnTotals.map((total, index) => (
          <td key={index} className="bg-green-600 p-2 border">
            {index === 0 ? "TOTAL" : total}
          </td>
        ))}
      </tr>
    </>
  );
};

const TableRowControl = ({ row, rowIndex, onInputChange, organization }) => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [values, setValues] = useState(row || Array(5).fill(0));

  const handleInputChange = (index, e) => {
    if (index === 0) {
      setSelectedOrg(e.target.value);
    } else {
      const parsedValue = parseFloat(e.target.textContent);
      if (!isNaN(parsedValue)) {
        const newValues = [...values];
        const oldValue = newValues[index];
        newValues[index] = parsedValue;

        // Suma dinámica de "Kg a entregar" y "Kg Pendientes"
        const kgEntregar = newValues[2] || 0;
        const kgPendientes = newValues[3] || 0;
        newValues[4] = kgEntregar + kgPendientes;

        setValues(newValues);
        onInputChange(rowIndex, index, parsedValue - oldValue);
      } else {
        e.target.textContent = 0;
      }
    }
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
        >
          {index === 0 ? (
            <select
              value={selectedOrg || ""}
              onChange={(e) => setSelectedOrg(e.target.value)}
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
    </tr>
  );
};

export default TableControl;
