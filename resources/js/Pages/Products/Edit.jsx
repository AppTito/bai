import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit(props) {
    const { product ,categories , productCategory  } = usePage().props;

    const { data, setData, errors, put } = useForm({
        detail: product.detail || "",
        category_id: productCategory ? productCategory.id : "", // Set default value
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("products.update",product.id));
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Edit User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("products.index")} >
                                    Back
                                </Link>
                            </div>
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Producto</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Detail"
                                               name="detail" value={data.detail}
                                               onChange={(event) =>
                                                   setData("detail", event.target.value)}
                                        />
                                        <span className="text-red-600">{errors.detail}</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Categorías</label>
                                        <select className="w-full px-4 py-2 rounded-md"
                                                label="Category_id" name="category_id"  value={data.category_id}
                                                onChange={(event) =>
                                                    setData("category_id", event.target.value)
                                                } >
                                            {categories.map(({id,category}) => (
                                                <option key={id} value={id}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
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
