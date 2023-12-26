import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';

export default function Create ( props ){
    const { organizacion } = usePage().props;
    const { data, setData, errors, post } = useForm({
        organization_id:"",
        dni:"",
        name:"",
        phone:"",
        email:"",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("attentions.store"));
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Crear Atención"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("attentions.index")}> Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Organización</label>
                                        <select className="w-full px-4 py-2 rounded-md"
                                                label="Organization_id" name="organization_id" value={data.organization_id}
                                                onChange={(event) =>
                                                    setData("organization_id", event.target.value)
                                                }>
                                            <option value="">Seleccione Organización</option>
                                            {organizacion.map(({id, name}) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">{errors.organization_id}</span>
                                    </div> 
                                </div>
                                 <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nombres y Apellidos</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Name" name="name"
                                               value={data.name}
                                               onChange={(event) =>
                                                   setData("name", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div> 
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Cédula de identificación</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Dni" name="dni"
                                               value={data.dni}
                                               onChange={(event) =>
                                                   setData("dni", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.dni}
                                        </span>
                                    </div> 
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">N. Teléfono</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Phone" name="phone"
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
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Correo Electrónico</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Email" name="email"
                                               value={data.email}
                                               onChange={(event) =>
                                                   setData("email", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
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

