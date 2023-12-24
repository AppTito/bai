import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';

export default function Index( props ) {
    const { products } = usePage().props
    const columns = ["detail", "category"];
    const labels = ["Producto", "Categoría"];

    function destroy(e) {
        if (confirm("Are you sure you want to delete this permissions?")) {
            Inertia.delete(route("products.destroy", e.currentTarget.id));
        }
    }
    const actions = ["products.create","products.edit", destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={products} columns={columns} primary={"Producto"} labels={labels}
                                        actions={actions} per={"product"} property={"category"} />
                                <Pagination class="mt-6" links={products.links}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
