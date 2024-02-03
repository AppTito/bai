import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import TableRowControl from "@/Components/Operations/TableRowControl";

export default function Index(props) {
    const { categories, donors_id, date, waste,totals } = usePage().props;
    console.log(totals)
    // Estados para los valores de peso
    const [pesoGavetas, setPesoGavetas] = useState("");
    const [pesoProcesado, setPesoProcesado] = useState("");
    const [pesoTotal, setPesoTotal] = useState("");

    // Función para manejar el cambio en el input de peso Gavetas
    const handlePesoGavetasChange = (event) => {
        const value = event.target.value;
        setPesoGavetas(value);

        // Calcular el Peso Total: gaveta - procesado
        const total = parseFloat(value) - parseFloat(pesoProcesado);
        setPesoTotal(isNaN(total) ? "" : total);
    };

    // Función para manejar el cambio en el input de peso Procesado
    const handlePesoProcesadoChange = (event) => {
        const value = event.target.value;
        setPesoProcesado(value);
    };

    const handlePesoTotalChange = (event) => {
        // Calcular el Peso Total: gaveta - procesado
        const total = parseFloat(pesoGavetas) - parseFloat(value);
        setPesoTotal(isNaN(total) ? "" : total);
    };

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
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Volver */}
                        {/*<div className="flex justify-start mb-4">*/}
                        {/*    <Link*/}
                        {/*          href={route("distribution.distribution")} */ /* corregir back  con post envio de datos raro */}
                        {/*        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"*/}
                        {/*    >*/}
                        {/*        Volver*/}
                        {/*    </Link>*/}
                        {/*</div>*/}

                        {/* imprimir */}
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
                                recovered={pesoProcesado}
                                weight={pesoGavetas}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
