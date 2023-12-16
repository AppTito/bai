import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';

export default function Create ( props ){

    const { data, setData, errors, post } = useForm({
        name: "",
        address: "",
        ruc: "",
        phone: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(route("donors.store"));
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
                                    href={route("donors.index")}> Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nombre</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Name"
                                               name="name"
                                               value={data.name}
                                               onChange={(event) =>
                                                   setData("name", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Dirección</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Address"
                                               name="address"
                                               value={data.address}
                                               onChange={(event) =>
                                                   setData("address", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.address}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <label className="">RUC</label>
                                        <input type="number" className="w-full px-4 py-2 rounded-md" label="Ruc"
                                               name="ruc"
                                               value={data.ruc}
                                               onChange={(event) =>
                                                   setData("ruc", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.ruc}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Teléfono</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="phone"
                                               name="phone"
                                               value={data.phone}
                                               onChange={(event) =>
                                                   setData("phone", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.phone}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded">
                                        Save
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

