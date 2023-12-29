import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import TableRowControl from "@/Components/Operations/TableRowControl";
import TableHeaderRow from "@/Components/Operations/TableTheadControl";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { organization } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();
    const columnNames = [
        "Grupo Alimentos",
        "Recuperado",
        "Consumo Animal",
        "Compostaje",
        "Basura",
        "Refrigerios",
        "Consumo Inmediato",
        "Peso Total",
    ];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Volver */}
                        <div className="flex justify-start mb-4">
                            <Link
                                href={route("operations.weight")}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Volver
                            </Link>
                        </div>
                        {/* Tabla para llenar con los pesos */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <TableHeaderRow columnNames={columnNames} />
                                </thead>
                                <tbody>
                                    <TableRowControl />
                                    {/* <TableRowControl name="Fruver" />
                                    <TableRowControl name="Lacteos" />
                                    <TableRowControl name="Panaderia" />
                                    <TableRowControl name="Granos" />
                                    <TableRowControl name="Embutidos" />
                                    <TableRowControl name="Huevos" />
                                    <TableRowControl name="Reposteria" />
                                    <TableRowControl name="Carbohidrato Procesados" />
                                    <TableRowControl name="Aderezos, Salsas y Condimentos" />
                                    <TableRowControl name="Proteina" />
                                    <TableRowControl name="Jugos y Bebidas" />
                                    <TableRowControl name="Carbohidratos" />
                                    <TableRowControl name="Enlatados y Conservas" />
                                    <TableRowControl name="Floristeria" />
                                    <TableRowControl name="Insumos de limpieza y Hogar" />
                                    <TableRowControl name="Total Por grupo" /> */}
                                    {/* Agrega más filas según sea necesario */}
                                </tbody>
                            </table>
                        </div>

                        {/* Botón siguiente vista distribución */}
                        <div className="flex justify-end mt-4">
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
