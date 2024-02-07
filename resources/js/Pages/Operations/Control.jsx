import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import TableRowControl from "@/Components/Operations/TableRowControl";

export default function Index(props) {
    const { categories, donors_id, date, waste,totals } = usePage().props;

    // Función para manejar el cambio en los valores de la tabla
    const handleTableChange = (newAllCellValues) => {
        // Actualizar el estado con todos los valores de las celdas
        const columnSums = Array(7).fill(0);
        newAllCellValues.forEach((row) => {
            row.forEach((value, index) => {
                columnSums[index] += value;
            });
        });
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-7">
                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* imprimir */}
                        <div className="flex justify-end mb-4">
                            <button
                                className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
                                /* toda la pagina */
                                onClick={() => window.print()}
                            >
                                🖨️
                            </button>
                        </div>

                        {/* Tabla para llenar con los pesos */}
                        <div className="flex items-center justify-center mb-4 text-center align-middle ">
                            <h1 className="text-2xl font-bold text-green-700 ">
                                Control → {donors_id.name}
                            </h1>
                        </div>
                        <div className="overflow-x-auto">
                            <TableRowControl
                                waste={waste}
                                date={date}
                                donors={donors_id}
                                categories={categories}
                                onDataChange={handleTableChange}
                                wastesColumns={waste}
                                totals={totals}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
