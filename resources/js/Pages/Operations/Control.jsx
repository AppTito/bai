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
                                    <tr className="bg-primary">
                                        <th className="p-2 border">
                                            Grupo Alimentos
                                        </th>
                                        <th className="p-2 border">
                                            Recuperado
                                        </th>
                                        <th className="p-2 border">
                                            Consumo Animal
                                        </th>
                                        <th className="p-2 border">
                                            Compostaje
                                        </th>
                                        <th className="p-2 border">Basura</th>
                                        <th className="p-2 border">
                                            Refrigerios
                                        </th>
                                        <th className="p-2 border">
                                            Consumo Inmediato
                                        </th>
                                        <th className="p-2 border">
                                            Peso Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border">Fruver</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Lácteos</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Panadería</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Granos</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Embutidos</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Huevos</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Repostería</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Carbohidrato Procesado</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Aderezos, Salsas y Condimentos</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Proteína</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Jugos y Bebidas</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Carbohídratos</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Enlatados y Conservas</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Floristería</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Insumos de limpieza y Hogar</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Total Por grupo</td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                        <td
                                            className="p-2 border hover:bg-gray-100 cursor-pointer"
                                            contentEditable="true"
                                        ></td>
                                    </tr>
                                    
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
