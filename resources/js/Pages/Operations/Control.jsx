import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage} from "@inertiajs/react";
import TableRowControl from "@/Components/Operations/TableRowControl";

export default function Index(props) {
    const { categories, donors_id, date, waste } = usePage().props;

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Volver */}
                        <div className="flex justify-start mb-4">
                            <Link
                                href={route("operations.index")}
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
