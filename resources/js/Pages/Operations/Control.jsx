import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { organization } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Volver */}
                        <div className="flex justify-start px-6 py-4">
                            <Link
                                href={route("operations.weight")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Volver
                            </Link>
                        </div>
                        {/* tabla para llenar con los pesos */}
                        <div className="text-center">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Grupo Alimentos</th>
                                        <th>Recuperado</th>
                                        <th>Consumo Animal</th>
                                        <th>Compostaje</th>
                                        <th>Basura</th>
                                        <th>Refigerios</th>
                                        <th>Consumo Inmediato</th>
                                        <th>Peso Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Frutas</td>
                                        <td>200</td>
                                        <td>100</td>
                                        <td>100</td>
                                        <td>100</td>
                                        <td>100</td>
                                        <td>100</td>
                                        <td>700</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* btn siguiente vista distrinucion*/}
                        <div className="flex justify-end px-6 py-4">
                            <Link
                                href={route("operations.distribution")}
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
