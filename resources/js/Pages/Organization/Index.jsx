/* Modals */
import { Button, Modal } from "flowbite-react";

/* useState es necesario para inicializar los Modals */
import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";

import { HiOutlineExclamationCircle } from "react-icons/hi";

/* Toastr para notificaciones */
import toast, { Toaster } from "react-hot-toast";

export default function Index(props) {

    /* Caracter booleano para abrir y cerrar Modals */
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalInsert, setOpenModalInsert] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [valorID, setValorID] = useState(0);

    const { organization } = usePage().props;

    /* Entidades de la tabla "organizaciones" */
    const columns = ["name", "code", "address", "ruc"];
    const labels = ["Nombre", "Código", "Dirección", "RUC"];

    /* Toastr */
    const notify = () => toast('');

    /* Tomar el ".create" y poner esto "" */
    const actions = ["", "organizations.edit", destroy];

    /* Esto recomiendo eliminar al equipo backend
    metiendo lo que está en el formulario ModalInsert */
    const { data, setData, errors, post } = useForm({
        code: "",
        address: "",
        ruc: "",
        name: "",
    });

    /* Almacenar datos del ModalInsert */
    function handleSubmit(e) {
        e.preventDefault();
        post(route("organizations.store"));
        setOpenModalInsert(false);
        toast.success('Organización Registrada!'); // Notificación de registro exitoso
    }

    function FormularioActualizar(e) {
        e.preventDefault();
        put(route("organizations.update", organization.id));
    }

    /* Función Eliminar */
    function destroy(e) {
        const value = Number(e.currentTarget.id);

        setValorID(value); // Usa setValorID para actualizar el estado

        setOpenModalDelete(true);
    }

    /* Función confirmar eliminar */
    function confirmDelete() {
        Inertia.delete(route("organizations.destroy", valorID));
        setOpenModalDelete(false);
        toast.error("Organización eliminada!")

    }

    return (
        /* Auth de roles */

        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Organizaciones" />

            <Button onClick={() => setOpenModalUpdate(true)}>
                Toggle modal
            </Button>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Button
                                    onClick={() => setOpenModalInsert(true)}
                                    className="bg-emerald-600 p-1 my-3"
                                >
                                    Crear Organización
                                </Button>
                                <Table
                                    items={organization}
                                    columns={columns}
                                    primary={"Organización"}
                                    labels={labels}
                                    actions={actions}
                                    per={"organization"}
                                />
                                <Pagination
                                    class="mt-6"
                                    links={organization.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Insert */}
                <Modal
                    show={openModalInsert}
                    onClose={() => setOpenModalInsert(false)}
                    size="sm"
                    className={openModalInsert ? "bg-black bg-opacity-50" : ""}
                >
                    <Modal.Header>
                        <h1>Hola</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col mb-4">
                                    <label>Código</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
                                        name="code"
                                        value={data.code}
                                        onChange={(event) =>
                                            setData("code", event.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errors.code}
                                    </span>
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
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

                                <div className="flex flex-col mb-4">
                                    <label>Dirección</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
                                        name="address"
                                        value={data.address}
                                        onChange={(event) =>
                                            setData(
                                                "address",
                                                event.target.value
                                            )
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errors.address}
                                    </span>
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label>RUC</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
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
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="bg-green-500 mr-2"
                            onClick={handleSubmit}
                        >
                            Crear
                        </Button>

                        <Button
                            color="gray"
                            onClick={() => setOpenModalInsert(false)}
                        >
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* End Modal Insert */}

                {/* Modal Eliminar */}
                <Modal
                    show={openModalDelete}
                    size="md"
                    onClose={() => setOpenModalDelete(false)}
                    popup
                    className={openModalDelete ? "bg-black bg-opacity-50" : ""}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                ¿Está seguro de que desea eliminar esta
                                organización?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    className="bg-red-500"
                                    onClick={() => confirmDelete()}
                                >
                                    Sí, estoy seguro
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() => setOpenModalDelete(false)}
                                >
                                    No, cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* End Modal Eliminar */}

                {/* Modal Actualizar */}
                <Modal
                    show={openModalUpdate}
                    onClose={() => setOpenModalUpdate(false)}
                    size="sm"
                    className={openModalUpdate ? "bg-black bg-opacity-50" : ""}
                >
                    <Modal.Header>
                        <h1>Hola</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col mb-4">
                                    <label>Código</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
                                        name="code"
                                        value={data.code}
                                        onChange={(event) =>
                                            setData("code", event.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errors.code}
                                    </span>
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
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

                                <div className="flex flex-col mb-4">
                                    <label>Dirección</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
                                        name="address"
                                        value={data.address}
                                        onChange={(event) =>
                                            setData(
                                                "address",
                                                event.target.value
                                            )
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errors.address}
                                    </span>
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label>RUC</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-md"
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
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="bg-green-500 mr-2"
                            onClick={handleSubmit}
                        >
                            Crear
                        </Button>

                        <Button
                            color="gray"
                            onClick={() => setOpenModalUpdate(false)}
                        >
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* End Modal Actualizar */}

                {/* Propiedades Toastr */}
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </AuthenticatedLayout>
    );
}
