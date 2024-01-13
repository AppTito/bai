import React from "react";

const TableHeaderRow = ({ columnNames, control }) => {
    if (control) {
        const names = columnNames.map((item) => item.item);
        return (
            <tr className="bg-primary">
                <th className="p-2 border">Grupo Alimentos</th>
                {names.map((item, index) => (
                    <th key={index} className="p-2 border">
                        {item}
                    </th>
                ))}
                <th className="p-2 border">Peso Total</th>
            </tr>
        );
    } else {
        return (
            <tr className="bg-primary">
                {columnNames.map((name, index) => (
                    <th key={index} className="p-2 border">
                        {name}
                    </th>
                ))}
            </tr>
        );
    }
};

export default TableHeaderRow;
