import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';

export default function Index(props) {
    const { categories } = usePage().props
    const columns = ["code","category","indicator"];
    const labels = ["Código", "Categoría", "Indicador"];

    function destroy(e) {
        if (confirm("¿Está seguro que desea eliminar esta categoría?")) {
            Inertia.delete(route("categories.destroy", e.currentTarget.id));
        }
    }
    const actions = ["categories.create","categories.edit", destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Categorías" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={categories} columns={columns} primary={"Categoría"} labels={labels}
                                       actions={actions} per={"category"} />
                                <Pagination class="mt-6" links={categories.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
