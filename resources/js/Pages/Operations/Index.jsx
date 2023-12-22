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
            <Head title="Operaciones" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form action="">
                                <input type="date" />
                            </form>
                            <select name="" id="">
                                <option value="" selected hidden>
                                    Seleccione
                                </option>
                                <option value="">La Favorita</option>
                                <option value="">Santa Maria</option>
                                <option value="">San Antonio</option>
                                <option value="">Otro</option>
                            </select>
                        </div>
                        {/* btn siguiente vista weigth*/}
                        <div className="flex justify-end px-6 py-4">
                            <Link
                                href={route("operations.weight")}
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
