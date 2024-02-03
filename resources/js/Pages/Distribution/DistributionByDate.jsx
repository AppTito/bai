// Index.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import TableRowControlAlternative from "@/Components/Distribution/TableRowControlAlternative";
import TableHeaderRow from "@/Components/TableTheadControl";
import TableRowControl from "@/Components/Operations/TableRowControl";


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

    /* control */
    const ColumnsControl ={

    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Distribución por fecha" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">
                        {/* volver operaciones por fecha */}
                        {/* <Link
                            href={route("operations.operationsbydate")}
                            className="text-green-700 font-bold bg"
                        >
                            Volver
                        </Link> */}

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
                                    />
                                </tbody>
                            </table>
                        </div>

                        <div className="overflow-x-auto mb-1">
                            <h3 className="text-xl font-bold text-start text-green-800 p-2">
                                Control
                            </h3>
                            <table>
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
