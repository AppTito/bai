// Index.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import TableRowControl from "@/Components/Distribution/TableRowControl";
import TableHeaderRow from "@/Components/TableTheadControl";

/* Columnas */
const columnNames = [
    { Organización: "organization" },
    { "Porcentaje (%)": "percentage" },
    { Fruver: "fruver" },
    { Lacteos: "lacteos" },
    { Panaderia: "panaderia" },
    { Granos: "granos" },
    { Embutidos: "embutidos" },
    { Huevos: "huevos" },
    { Reposteria: "reposteria" },
    { Procesados: "procesados" },
    { Salsas: "salsas" },
    { Proteina: "proteina" },
    { Jugos: "jugos" },
    { Carbohidratos: "carbohidratos" },
    { Enlatados: "enlatados" },
    { "Proteina (KFC)": "proteina-kfc" },
    { "Procesado (KFC)": "procesado-kfc" },
    { Total: "total" },
    { "Kg Pendientes": "kg-pendientes" },
    { Nota: "nota" },
];

export default function Index(props) {
    const { organization, date, donor_name, donor_id } = usePage().props;
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
                            <table className="min-w-full border border-gray-300 text-center mt-5">
                                <thead>
                                    <TableHeaderRow columnNames={columnNames} />
                                </thead>
                                <tbody>
                                    <TableRowControl
                                        tableRows={tableRows}
                                        organization={organization}
                                    />
                                </tbody>
                            </table>
                        </div>
                        <div className="flex mt-4">
                            <button
                                onClick={addRow}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                + Añadir Distribución
                            </button>
                        </div>
                        {/* guardar */}
                        <div className="mt-4 text-end">
                            <button
                                onClick={addRow}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Guardar
                            </button>
                        </div>

                        <div className="mt-4 text-end">

                            
                            <Link
                                href={route("operations.controlbydate", formData)}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Control por fecha
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
