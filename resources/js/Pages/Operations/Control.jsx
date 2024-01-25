import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage} from "@inertiajs/react";
import TableRowControl from "@/Components/Operations/TableRowControl";

export default function Index(props) {
    const { categories, donors_id, date, waste } = usePage().props;

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
                        <div className="flex justify-start mb-4">
                            <Link
                                href={}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Volver
                            </Link>
                        </div>

                        {/* Tabla para llenar con los pesos */}
                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                            Control:
                        </h2>
                        <div className="overflow-x-auto">
                             <TableRowControl waste={waste} date={date} donors={donors_id}
                                categories={categories} onDataChange={handleTableChange}
                                wastesColumns={waste} recovered = {pesoProcesado} weight = {pesoGavetas}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
