import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit(props) {
    const { categoryValues } = usePage().props;

    const { data, setData, errors, put } = useForm({
        value: categoryValues.value || "",
        category_id: categoryValues.category_id || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("categoryValues.update",categoryValues.id));
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Valores de Categoria" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("categoryValues.index")} >
                                    Back
                                </Link>
                            </div>
                            <form name="createForm"  onSubmit={handleSubmit} >
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Valor</label>
                                        <input type="number" className="w-full px-4 py-2 rounded-md" label="Value"
                                               name="value" value={data.value}
                                               onChange={(event) =>
                                                   setData("value", event.target.value)}
                                        />
                                        <span className="text-red-600">{errors.value}</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Categorías</label>
                                        <input type={"text"} className="w-full px-4 py-2 rounded-md" label="Category"
                                               name="category_id" value={categoryValues.category} readOnly={true} />
                                        <input type="hidden" name="category_id" value={categoryValues.category_id}  />
                                        <span className="text-red-600">{errors.category_id}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                <button type="submit"
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
}
