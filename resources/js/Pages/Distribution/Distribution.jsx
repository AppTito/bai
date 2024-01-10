import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableRowControl from "@/Components/Distribution/TableRowControl";
import TableHeaderRow from "@/Components/TableTheadControl.jsx";
import CalendarSection from "@/Components/Operations/calendarSection";

/* Columnas */
const columnNames = [
    "Organización",
    "Porcentaje (%)",
    "Kg a entregar",
    "Fruver",
    "Lacteos",
    "Panaderia",
    "Granos",
    "Embutidos",
    "Huevos",
    "Reposteria",
    "Procesados",
    "Salsas",
    "Proteina",
    "Jugos",
    "Carbohidratos",
    "Enlatados",
    "Proteina (KFC)",
    "Procesado (KFC)",
    "Total",
    "Kg Pendientes",
    "Nota",
];

export default function Index(props) {
    const [tableRows, setTableRows] = React.useState([
        [null, ...Array(columnNames.length - 2).fill(0), null], // Inicializar con una fila donde la primera columna es null y el resto son ceros
    ]);

    const addRow = () => {
        const newRow = [null, ...Array(columnNames.length - 2).fill(0), null]; // Crea una nueva fila con la primera columna como null y el resto de las columnas con valores de 0
        setTableRows((prevRows) => [...prevRows, newRow]);
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">
                        {/* Titulo */}
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-green-700">
                                Distribución
                            </h1>
                        </div>

                        {/* Calendar  y seleccionar fecha*/}
                        <div className="container mb-6 flex items-center">
                            <CalendarSection />
                            <button className="bg-green-600 hover:bg-grenn-700 text-white font-bold py-2 px-4 rounded ml-4">
                                <Link>Cargar</Link>
                            </button>
                        </div>

                        <div className="overflow-x-auto mb-1">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <TableHeaderRow columnNames={columnNames} />
                                </thead>
                                <tbody>
                                    <TableRowControl tableRows={tableRows} />
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
