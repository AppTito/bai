import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import Form from "@/Components/Form.jsx";

export default function Create ( props ){
    const { permissions } = usePage().props
    const handleSubmit = "roles.store";
    const formFields = [
        { name: 'name', label: 'Nombre' },
        { name: 'permissions', label: 'Permisos', type: 'select', isMultiple: true, options:
            { data: permissions.map((permission) => (
                    { value: permission.id, label: permission.name }
                )) }
        },
    ];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Crear Rol"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("roles.index")}> Atras
                                </Link>
                            </div>
                            <Form fields={formFields} onSubmit={handleSubmit} initialValues={{ permissions: [] }} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

