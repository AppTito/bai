import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,Link, usePage } from "@inertiajs/react";
import {Table} from "@/Components/Table2.jsx";

export default function Index(props) {
    const { organization, donors_id, date, category } = usePage().props;
    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className=" mx-auto sm:px-6 lg:px-7">
                    <div className="flex items-center mb-4">
                        <Link
                            href={route("operations.index")}
                            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            Volver
                        </Link>
                    </div>
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">
                        {/* Titulo */}
                        <div className="flex items-center justify-center mb-4 text-center align-middle ">
                            <h1 className="text-2xl font-bold text-green-700 ">
                                Distribución → {donors_id.name} {date}
                            </h1>
                        </div>
                        <Table organization={organization} donors_id={donors_id} date2={date} category={category}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
