import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import Pagination from '@/Components/Pagination';

export default function Index( props ) {
    const { categoryValue } = usePage().props
    const { hasPermission, hasRole } = usePermissions()

    /* function destroy(e) {
        if (confirm("Are you sure you want to delete this permissions?")) {
            Inertia.delete(route("permissions.destroy", e.currentTarget.id));
        }
    } */

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Category Value" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                {(hasRole('super-admin') || hasPermission('permission-create')) && (
                                    <div className="flex items-center justify-between mb-6">
                                        <Link
                                            className="px-6 py-2 text-white bg-emerald-600 rounded-md focus:outline-none"
                                            href={route("permissions.create")}>Crear Permiso </Link>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-7">
                                            <div className="shadow overflow-hidden border-b rounded border-gray-200 ">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-green-700 text-warmGray-50 ">
                                                    <tr>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                            ID
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                            CODIGO
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                            CATEGORIA
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                            PRECIO
                                                        </th>
                                                        {(hasRole('super-admin') || hasPermission('permission-edit') || hasPermission('permission-delete')) && (
                                                            <th scope="col"
                                                                className="px-6 py-3 text-white text-center text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                                Acciones
                                                            </th>
                                                        )}
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    {categoryValue.data.map(({id,category,value}) => (
                                                        <tr key={id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {id}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {category.code}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {category.category}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {value}
                                                            </td>
                                                            {/* {(hasRole('super-admin') || hasPermission('config-edit') || hasPermission('config-delete')) && (
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center space-x-2">
                                                                    {(hasRole('super-admin') || hasPermission('config-edit')) && (
                                                                        <Link tabIndex="1" className="px-4 py-2 text-sm text-white bg-sky-800
                                                                        rounded mr-2"
                                                                        //Cambiar la ruta en caso de cambiar a modales
                                                                            href={route("permissions.edit", id)}>Editar</Link>
                                                                    )}
                                                                    {(hasRole('super-admin') || hasPermission('config-delete')) && (
                                                                        <button onClick={destroy} id={id} tabIndex="-1"
                                                                                type="button"
                                                                                className="mx-1 px-4 py-2 text-sm text-white bg-rose-500 rounded mr-2 ">
                                                                            Eliminar</button>
                                                                    )}
                                                                </td>
                                                            )} */}
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Pagination class="mt-6" links={categoryValue.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
