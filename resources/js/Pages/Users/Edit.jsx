
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import Form from "@/Components/Form.jsx";

export default function Edit ( props ){
    const { user, rolesAll } = usePage().props
    const handleSubmit = "users.update";
    const formFields = [
        { name: 'name', label: 'Nombre' },
        { name: 'email', label: 'Email' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'password_confirmation', label: 'Confirmar Password', type: 'password' },
        { name: 'roles', label: 'Rol', type: 'select', options:
            { data: rolesAll.data.map((role) => (
                { value: role.id, label: role.name }
            )) },value: user.data.roles[0].id
        },
    ];

    const initialValues = {
        id: user.data.id,
        name: user.data.name || "",
        email: user.data.email || "",
        password: user.data.password || "",
        password_confirmation:  "",
        roles: user.data.roles.length > 0 ? user.data.roles[0].id : null,
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Edit User"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("users.index")}>
                                    Back
                                </Link>
                            </div>
                            <Form fields={formFields} onSubmit={handleSubmit} initialValues={initialValues} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

