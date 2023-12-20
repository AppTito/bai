import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import Pagination from '@/Components/Pagination';

export default function Index(props) {
    const { dataBank } = usePage().props
    const { hasPermission, hasRole } = usePermissions()

     function destroy(e) {
        //console.log(e.currentTarget.id);
        if (confirm("Are you sure you want to delete this permissions?")) {

            Inertia.delete(route("permissions.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors} >
            <Head title="Badi data" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
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
                                                                Address
                                                            </th>
                                                            <th scope="col"
                                                                className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                                Ruc
                                                            </th>
                                                            <th scope="col"
                                                                className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                                Email
                                                            </th>
                                                            <th scope="col"
                                                                className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                                Phone
                                                            </th>
                                                            {(hasRole('super-admin') || hasPermission('bank-edit') || hasPermission('bank-delete')) && (
                                                                <th scope="col"
                                                                    className="px-6 py-3 text-white text-center text-xs font-medium text-warmGray-50 uppercase tracking-wider">
                                                                    Acciones
                                                                </th>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    {dataBank.data.map(({id, address, ruc, email, phone  }) => (
                                                        <tr key={id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {id}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {address}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {ruc}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {email}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {phone}
                                                            </td>
                                                            {(hasRole('super-admin') || hasPermission('bank-edit') || hasPermission('bank-delete')) && (
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center space-x-2">
                                                                    {(hasRole('super-admin') || hasPermission('bank-edit')) && (
                                                                        <Link tabIndex="1" className="px-4 py-2 text-sm text-white bg-sky-800
                                                                        rounded mr-2"
                                                                            href={route("banks.edit", id)}>Editar</Link>
                                                                    )}

                                                                        {/* <button onClick={destroy} id={id} tabIndex="-1"
                                                                                type="button"
                                                                                className="mx-1 px-4 py-2 text-sm text-white bg-rose-500 rounded mr-2 ">
                                                                            Eliminar
                                                                        </button> */}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
