// TableHeaderRow.jsx
import React from "react";
import { Icon } from "@iconify/react";
import "../../css/TableHeaderRow.css"; 

// Función de mapeo para convertir los nombres en íconos
const mapIcon = (iconName) => {
  // Lógica para mapear los nombres a los íconos reales
  // Puedes personalizar esto según tus necesidades
  switch (iconName) {
    case "icon:emoji-name":
      return "emojione:smile";
    case "icon:percentage":
      return "ic:baseline-percentage";
    // Agrega más casos según sea necesario
    default:
      return null;
  }
};

const TableHeaderRow = ({ columnNames }) => {
  return (
    <tr className="bg-primary">
      {columnNames.map((column, index) => (
        <th key={index} className="p-2 border">
          <span className="icon-container" title={Object.keys(column)[0]}>
            <Icon icon={mapIcon(column[Object.keys(column)[0]])} />
          </span>
        </th>
      ))}
    </tr>
  );
};

export default TableHeaderRow;
