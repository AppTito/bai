import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import Form from "@/Components/Form.jsx";

export default function Create ( props ){
    const { roles } = usePage().props
    const handleSubmit = "users.store";
    const formFields = [
        { name: 'name', label: 'Nombre' },
        { name: 'email', label: 'Email' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'password_confirmation', label: 'Confirmar Password', type: 'password' },
        { name: 'roles', label: 'Rol', type: 'select', options:
            { data: roles.data.map((role) => (
                { value: role.id, label: role.name }
            )) }
        },
    ];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Crear Usuario"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("users.index")}> Atras
                                </Link>
                            </div>
                            <Form fields={formFields} onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

