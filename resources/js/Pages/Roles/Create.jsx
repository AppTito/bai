import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {useCheckboxPermissions} from "@/hooks/useCheckboxPermissions.js";

export default function Create ( props ){
    const { permissions } = usePage().props

    const { data, setData, errors, post } = useForm({
        name: "",
        permissions: [],
    });

    const { handleCheckboxChange } = useCheckboxPermissions([]);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("roles.store"));
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Create User"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("roles.index")}> Back
                                </Link>
                            </div>
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Name"
                                               name="name" value={data.name}
                                               onChange={(event) =>
                                                   setData("name", event.target.value)
                                               }/>
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="permissions">Permissions</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {permissions.map(({id, name}) => (
                                                <div key={id}>
                                                    <input type="checkbox" className="mr-2" label="Permissions"
                                                           name="permissions" value={id}
                                                           onChange={(event) =>
                                                               handleCheckboxChange(event, setData)}/>
                                                    <label className="mr-2">{name}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-red-600">
                                            {errors.permissions}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="px-6 py-2 font-bold text-white bg-green-500
                                        rounded"> Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

