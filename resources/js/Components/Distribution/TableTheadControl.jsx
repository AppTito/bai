import React from "react";

const TableHeaderRow = ({ columnNames }) => {
    return (
        <tr className="bg-primary">
            {columnNames.map((name, index) => (
                <th key={index} className="p-2 border">
                    {name}
                </th>
            ))}
        </tr>
    );
};

export default TableHeaderRow;
