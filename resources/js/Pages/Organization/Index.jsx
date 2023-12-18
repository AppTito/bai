/* useState para funcionamiento de los Modals */
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

/* Íconos de React */
import { Icon } from "@iconify/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import Pagination from "@/Components/Pagination";

/* Estilos CSS */
import styles from "../../../css/modal.css";

/* Toast */
import { Toaster, toast } from "react-hot-toast";

export default function Index(props) {

    const { organization } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();

    /* Control de Modal Abierto */
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    /* Control de Formulario */
    const { data, setData, errors, post } = useForm({
        code: "",
        address: "",
        ruc: "",
    });

    /* Crear organizacion y Toast */
    function handleSubmit(e) {
        e.preventDefault();
        post(route("organizations.store"));
        toggleModal();
    }

    /* Borrar organizacion */
    function destroy(e) {
        if (confirm("Are you sure you want to delete this organization?")) {
            Inertia.delete(route("organizations.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Organizaciones" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                {(hasRole("super-admin") ||
                                    hasPermission("permission-create")) && (
                                    <div className="flex items-center justify-between mb-6">
                                       
                                       
                                        <a
                                            className="px-6 py-2 text-white bg-emerald-600 rounded-md focus:outline-none"
                                            href="#"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                toggleModal();
                                            }}
                                        >
                                            Agregar Organización
                                        </a>
                                        {isOpen && (
                                            

                                            /* Modal Crear Start */
                                            <Modal
                                                isOpen={isOpen}
                                                toggle={toggleModal}
                                                className="modal-custom"
                                            >
                                                <ModalHeader className="modal-header">
                                                    Nueva Organización
                                                </ModalHeader>
                                                <ModalBody className="modal-body">
                                                    <form
                                                        name="createForm"
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <div className="flex flex-col">
                                                            <div className="mb-4">
                                                                <label className="">
                                                                    Código
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full px-4 py-2 rounded-md"
                                                                    label="Code"
                                                                    name="code"
                                                                    value={
                                                                        data.code
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "code",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <span className="text-red-600">
                                                                    {
                                                                        errors.code
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="mb-4">
                                                                <label className="">
                                                                    Dirección
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full px-4 py-2 rounded-md"
                                                                    label="Address"
                                                                    name="address"
                                                                    value={
                                                                        data.address
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "address",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <span className="text-red-600">
                                                                    {
                                                                        errors.address
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="mb-4">
                                                                <label className="">
                                                                    RUC
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full px-4 py-2 rounded-md"
                                                                    label="Ruc"
                                                                    name="ruc"
                                                                    value={
                                                                        data.ruc
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "ruc",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <span className="text-red-600">
                                                                    {errors.ruc}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <button
                                                                type="submit"
                                                                className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                                                
                                                                /* Aplicando Toast */
                                                                onClick={() => toast.success("Registrado con éxito")}
                                                            >
                                                                Guardar
                                                            </button>

                                                            <button
                                                                onClick={
                                                                    toggleModal
                                                                }
                                                                className="mx-2 px-6 py-2 font-bold text-white bg-red-500 rounded"
                                                            >
                                                                Cerrar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </ModalBody>
                                            </Modal>
                                            /* Modal Crear End */
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-7">
                                            <div className="shadow overflow-hidden border-b rounded border-gray-200 ">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-green-700 text-warmGray-50 ">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider"
                                                            >
                                                                Código
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider"
                                                            >
                                                                Dirección
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider"
                                                            >
                                                                RUC
                                                            </th>
                                                            {(hasRole(
                                                                "super-admin"
                                                            ) ||
                                                                hasPermission(
                                                                    "permission-edit"
                                                                ) ||
                                                                hasPermission(
                                                                    "permission-delete"
                                                                )) && (
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-white text-center text-xs font-medium text-warmGray-50 uppercase tracking-wider"
                                                                >
                                                                    Acciones
                                                                </th>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {organization.data.map(
                                                            ({
                                                                id,
                                                                code,
                                                                address,
                                                                ruc,
                                                            }) => (
                                                                <tr key={id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        {code}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        {
                                                                            address
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        {ruc}
                                                                    </td>
                                                                    {(hasRole(
                                                                        "super-admin"
                                                                    ) ||
                                                                        hasPermission(
                                                                            "organizations-edit"
                                                                        ) ||
                                                                        hasPermission(
                                                                            "organizations-delete"
                                                                        )) && (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center space-x-2">
                                                                            {(hasRole(
                                                                                "super-admin"
                                                                            ) ||
                                                                                hasPermission(
                                                                                    "organizations-edit"
                                                                                )) && (
                                                                                <Link
                                                                                    tabIndex="1"
                                                                                    className="px-4 py-2 text-sm text-white bg-sky-800
                                                                        rounded mr-2"
                                                                                    href={route(
                                                                                        "organizations.edit",
                                                                                        id
                                                                                    )}
                                                                                >
                                                                                    Editar
                                                                                </Link>
                                                                            )}
                                                                            {(hasRole(
                                                                                "super-admin"
                                                                            ) ||
                                                                                hasPermission(
                                                                                    "organizations-delete"
                                                                                )) && (
                                                                                <button
                                                                                    onClick={
                                                                                        destroy
                                                                                    }
                                                                                    id={
                                                                                        id
                                                                                    }
                                                                                    tabIndex="-1"
                                                                                    type="button"
                                                                                    
                                                                                    className="mx-1 px-4 py-2 text-sm text-white bg-rose-500 rounded mr-2 "
                                                                                >
                                                                                    Eliminar
                                                                                </button>
                                                                                
                                                                                
                                                                                
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Pagination
                                    class="mt-6"
                                    links={organization.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Configuración Toast */}
                <Toaster 
                position="bottom-right"/>
            </div>
        </AuthenticatedLayout>
    );
}
