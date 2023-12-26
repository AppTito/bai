import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from '@/Components/Pagination';
import Table from "@/Components/Table.jsx";

export default function Index( props ) {
    const { attention } = usePage().props
    const columns = ["org", "name", "dni", "phone", "email"];
    const labels = ["Nombre de Organización", "Nombres y Apellidos", "Cédula de identificación", "N. Celular", "Correo electrónico"];

    function destroy(e) {
        if (confirm("Are you sure you want to delete this attention?")) {
            Inertia.delete(route("attentions.destroy", e.currentTarget.id));
        }
    }
    const actions = ["attentions.create","attentions.edit", destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Atención" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table items={attention} columns={columns} primary={"Atención"} labels={labels}
                                        actions={actions} per={"attention"} />
                                <Pagination class="mt-6" links={attention.links} />
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
