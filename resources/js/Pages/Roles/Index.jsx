import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination.jsx";
import Table from "@/Components/Table3.jsx";

export default function Index( props ) {
    const { roles } = usePage().props
    const columns = ["name"];
    const labels = ["Nombre"];

    function destroy(e) {
        if (confirm("Are you sure you want to delete this roles?")) {
            Inertia.delete(route("roles.destroy", e.currentTarget.id));
        }
    }
    const actions = ["roles.create","roles.edit", destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Roles" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={roles} columns={columns} primary={"Rol"} labels={labels}
                                        actions={actions} per={"role"} />
                                <Pagination class="mt-6" links={roles.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
