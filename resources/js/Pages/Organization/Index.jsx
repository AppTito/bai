import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';

export default function Index( props ) {
    const { organization } = usePage().props
    const columns = ["name", 'code',"address","ruc"];
    const labels = ["Nombre", "Código", "Dirección", "RUC"];

    function destroy(e) {
        if (confirm("Are you sure you want to delete this organization?")) {
            Inertia.delete(route("organizations.destroy", e.currentTarget.id));
        }
    }
    const actions = ["organizations.create","organizations.edit", destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Organizaciones" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={organization} columns={columns} primary={"Organización"} labels={labels}
                                       actions={actions} per={"organization"} />
                                <Pagination class="mt-6" links={organization.links} />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
