import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import Pagination from "@/Components/Pagination";
import { useState } from "react";

export default function Index(props) {
    const { organization } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();

    // Estados para los valores de peso
    const [pesoGavetas, setPesoGavetas] = useState("");
    const [pesoProcesado, setPesoProcesado] = useState("");
    const [pesoTotal, setPesoTotal] = useState("");

    // Función para manejar cambios en el input de peso
    const handlePesoChange = (event, setterFunction) => {
        const value = event.target.value;
        setterFunction(value);
    
        // Calcular el Peso Total: gaveta - procesado
        const total = parseFloat(pesoGavetas) - parseFloat(pesoProcesado);
        setPesoTotal(isNaN(total) ? "" : total);
    };

    

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Weight" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Volver */}
                        <div className="flex justify-start px-6 py-4">
                            <Link
                                href={route("operations.index")}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Volver
                            </Link>
                        </div>
                        {/* Tabla para llenar con los pesos */}
                        <div className="shadow overflow-hidden border-b rounded border-gray-200 p-8 ml-32 mr-32">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    {/* titulo tabla */}
                                    <tr>
                                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                                            Donante: {/* {organization.name} */}
                                        </h2>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Variable
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Peso (Kg)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Aquí va el map para llenar la tabla */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Peso Gavetas:
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* Input para el peso Gavetas */}
                                            <input
                                                type="number"
                                                value={pesoGavetas}
                                                onChange={(e) =>
                                                    handlePesoChange(
                                                        e,
                                                        setPesoGavetas
                                                    )
                                                }
                                                className="w-full p-2 border-gray-300 rounded"
                                                min="0"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Peso Procesado:
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* Input para el peso Procesado */}
                                            <input
                                                type="number"
                                                value={pesoProcesado}
                                                onChange={(e) =>
                                                    handlePesoChange(
                                                        e,
                                                        setPesoProcesado
                                                    )
                                                }
                                                className="w-full p-2 border-gray-300 rounded"
                                                min={0}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Peso Total:
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* Mostrar el Peso Total */}
                                            <input
                                                type="number"
                                                value={pesoTotal}
                                                className="w-full p-2 border-gray-300 rounded bg-gray-100"
                                                min={0}   
                                            />
                                        </td>
                                    </tr>
                                    {/* Aquí termina el map */}
                                </tbody>
                            </table>
                        </div>
                        {/* Botón siguiente vista control */}
                        <div className="flex justify-end px-6 py-4">
                            <Link
                                href={route("operations.control")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Siguiente
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
