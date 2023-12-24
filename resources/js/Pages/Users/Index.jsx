import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination.jsx";
import Table from '@/Components/Table';

export default function Index( props ) {
    const { users } = usePage().props
    const columns = ["name", "email", "roles"];
    const labels = ["Nombre", "Email","Rol"];

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("users.destroy", e.currentTarget.id));
        }
    }
    const actions = ["users.create","users.edit", destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Usuarios" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={users} columns={columns} primary={"Usuario"} labels={labels}
                                        actions={actions} per={"user"} />
                                <Pagination class="mt-6" links={users.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
