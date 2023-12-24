import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';

export default function Index( props ) {
    const { categoryValues } = usePage().props
    const columns = ["value", "category"];
    const labels = ["Valor", "Categoría"];
    const actions = ["","categoryValues.edit", ""];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={categoryValues} columns={columns} primary={"Producto"} labels={labels}
                                       actions={actions} per={"categoryValue"} />
                                <Pagination class="mt-6" links={categoryValues.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
