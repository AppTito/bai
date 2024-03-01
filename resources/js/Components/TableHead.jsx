import React from "react";
import { Icon } from "@iconify/react";
import "../../css/TableHeaderRow.css";

const iconMappingsStart = ["mdi:account-group", "mdi:percent"];
const iconMappingsCategory = ["mdi:fruit-cherries","mdi:cow", "mdi:bread-slice", "mdi:rice", "mdi:sausage",
    "mdi:egg", "mdi:grain", "mdi:cake","mdi:food-variant", "mdi:bottle-soda-classic", "mdi:food-drumstick", "mdi:glass",
    "mdi:food-croissant", "mdi:flower", "mdi:lotion-outline", "mdi:food-drumstick","mdi:food-variant"];
const iconMappingsLast = ["mdi:calculator", "mdi:weight-kilogram", "mdi:note-text"];
const iconMappings = [...iconMappingsStart, ...iconMappingsCategory, ...iconMappingsLast];
const defaultIcon = "mdi:food";

const mapIcon = (iconName) => {
    const index = iconMappings.indexOf(iconName);
    return iconMappings[index] || defaultIcon;
};

export function TableHead({ firstOtherNames, categoryNames, lastOtherNames }) {

    const columnNames2 = [...firstOtherNames, ...categoryNames, ...lastOtherNames];
    firstOtherNames.forEach((column, index) => {
        const columnName = Object.keys(column)[0];
        column[columnName] = iconMappingsStart[index] ;
    });
    categoryNames.forEach((column, index) => {
        const columnName = Object.keys(column)[0];
        column[columnName] = iconMappingsCategory[index];
    });
    lastOtherNames.forEach((column, index) => {
        const columnName = Object.keys(column)[0];
        column[columnName] = iconMappingsLast[index];
    });

    return (
        <tr>
            {columnNames2.map((column, index) => (
            <th key={index} className="p-2 border">
                <span className="icon-container" title={Object.keys(column)[0]}>
                <Icon icon={mapIcon(column[Object.keys(column)[0]])} />
                </span>
            </th>
            ))}
        </tr>
    )
}
