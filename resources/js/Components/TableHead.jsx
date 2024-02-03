import React from "react";
import { Icon } from "@iconify/react";
import "../../css/TableHeaderRow.css";

const mapIcon = (iconName) => {

    const iconMappings = {
        organization: "mdi:account-group",
        percentage: "mdi:percent",
        fruver: "mdi:fruit-cherries",
        lacteos: "mdi:cow",
        panaderia: "mdi:bread-slice",
        granos: "mdi:rice",
        embutidos: "mdi:sausage",
        huevos: "mdi:egg",
        reposteria: "mdi:cake",
        procesados: "mdi:food-variant",
        salsas: "mdi:bottle-soda-classic",
        proteina: "mdi:food-drumstick",
        jugos: "mdi:glass",
        carbohidratos: "mdi:food-croissant",
        enlatados: "mdi:lotion-outline",
        "proteina-kfc": "mdi:food-drumstick",
        "procesado-kfc": "mdi:food-variant",
        total: "mdi:calculator",
        "kg-pendientes": "mdi:weight-kilogram",
        nota: "mdi:note-text",
    };
    return iconMappings[iconName] || null;
};

export function TableHead({ columnNames }) {
    return (
        <>
            <tr >
                {columnNames.map((column, index) => (
                    <th key={index} className="p-2 border">
                        <span
                            className="icon-container"
                            title={Object.keys(column)[0]}
                        >
                            <Icon icon={mapIcon(column[Object.keys(column)[0]])} />
                        </span>
                    </th>
                ))}
            </tr>
        </>
    )
}

