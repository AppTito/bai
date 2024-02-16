// Index.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import TableRowControlAlternative from "@/Components/Distribution/TableRowControlAlternative";
import TableHeaderRow from "@/Components/TableTheadControl";
import TableRowControl from "@/Components/Operations/TableRowControl";
import TableRowControlAlt from "@/Components/Distribution/TableRowControlAlt";

/* Columnas */
const columnNames = [
    { "Porcentaje (%)": "percentage" },
    { Fruver: "fruver" },
    { Lacteos: "lacteos" },
    { Panaderia: "panaderia" },
    { Granos: "granos" },
    { Embutidos: "embutidos" },
    { Huevos: "huevos" }, 
    { Cereales: "cereales" }, 
    { Reposteria: "reposteria" },
    { Procesados: "procesados" },
    { Salsas: "salsas" },
    { Proteina: "proteina" },
    { Jugos: "jugos" },
    { Carbohidratos: "carbohidratos" },
    { Floristeria: "floristeria" },
    { Enlatados: "enlatados" },
    { "Proteina (KFC)": "proteina-kfc" },
    { "Procesado (KFC)": "procesado-kfc" },
    { Total: "total" },
    { "Kg Pendientes": "kg-pendientes" },
];

export default function Index(props) {

    const { organization, date, donor_name, donor_id, waste, distribution, control } =
        usePage().props;

    const [tableRows, setTableRows] = React.useState([
        [null, ...Array(columnNames.length - 2).fill(0), null],
    ]);

    const addRow = () => {
        const newRow = [null, ...Array(columnNames.length - 2).fill(0), null];
        setTableRows((prevRows) => [...prevRows, newRow]);
    };


    const formData = {
        donors_id: donor_id,
        date: date,
    };

    /* control */
    // Función para manejar el cambio en los valores de la tabla
    const handleTableChange = (newAllCellValues) => {
        // Actualizar el estado con todos los valores de las celdas
        const columnSums = Array(7).fill(0);
        newAllCellValues.forEach((row) => {
            row.forEach((value, index) => {
                columnSums[index] += value;
            });
        });

        // Actualizar los estados solo si hay cambios
        setPesoGavetas(newAllCellValues[17][6].toString());
        setPesoProcesado(newAllCellValues[17][0].toString());
        const valueGavetas = parseFloat(pesoGavetas);
        const valueProcesado = parseFloat(pesoProcesado);
        const total = valueGavetas - valueProcesado;
        setPesoTotal(total.toString());
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Distribución por fecha" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">
                        {/* Titulo */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                                Fecha: {date}
                            </h2>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                                Donante: {donor_name}
                            </h2>
                        </div>

                        <div className="overflow-x-auto mb-1">
                            <h3 className="text-xl font-bold text-start text-green-800 p-1">
                                Distribución
                            </h3>
                            <table className="min-w-full border border-gray-300 text-center mt-5">
                                <thead>
                                    <TableHeaderRow columnNames={columnNames} />
                                </thead>
                                <tbody>
                                    <TableRowControlAlternative
                                        tableRows={tableRows}
                                        organization={organization}
                                        waste={waste}
                                        wastesColumns={waste}
                                        distribution = {distribution}
                                    />
                                </tbody>
                            </table>
                        </div>

                        <div className="overflow-x-auto mb-1">
                            <h3 className="text-xl font-bold text-start text-green-800 p-2">
                                Control
                            </h3>
                            <div className="overflow-x-auto">
                                <TableRowControlAlt
                                    waste={waste}
                                    control={control}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
