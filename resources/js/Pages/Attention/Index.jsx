/* Modal */
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

/* Slidebar */
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";

/* Componentes de Crear y Editar */
import Create from "./Create";
import Edit from "./Edit";

/* Íconos y Toastr */
import { HiOutlineExclamationCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

export default function Index(props) {
    /* Caracter booleano para abrir y cerrar Modals */
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalInsert, setOpenModalInsert] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [valorID, setValorID] = useState(null);

    const { attention } = usePage().props;
    const columns = ["org", "name", "dni", "phone", "email"];
    const labels = [
        "Nombre de Organización",
        "Nombres y Apellidos",
        "Cédula de identificación",
        "N. Celular",
        "Correo electrónico",
    ];

    const [setToastrMessage] = useState(null);

    function toastr(message) {
        setToastrMessage(message);
    }

    /* Función Eliminar */
    function destroy(e) {
        const value = Number(e.currentTarget.id);

        setValorID(value); // Usa setValorID para actualizar el estado

        setOpenModalDelete(true);
    }

    /* Función confirmar eliminar */
    function confirmDelete() {
        Inertia.delete(route("attentions.destroy", valorID));
        setOpenModalDelete(false);
        toast.error("Atención eliminada!");
    }

    const openUpdateModal = (id) => {
        setValorID(id);
        console.log(id);
        setOpenModalUpdate(true);
    };
    const actions = ["", (id) => openUpdateModal(id), destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Atención" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Button
                                    onClick={() => setOpenModalInsert(true)}
                                    className="bg-emerald-600 p-1 my-3"
                                >
                                    Crear Atención
                                </Button>
                                <Table
                                    items={attention}
                                    columns={columns}
                                    primary={"Atención"}
                                    labels={labels}
                                    actions={actions}
                                    per={"attention"}
                                    openUpdateModal={openUpdateModal}
                                />
                                <Pagination
                                    class="mt-6"
                                    links={attention.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Insert */}
                <Modal
                    show={openModalInsert}
                    onClose={() => {
                        setOpenModalInsert(false);
                        setToastrMessage(null); // Limpiar el mensaje del toastr al cerrar el modal
                    }}
                    size="sm"
                    className={openModalInsert ? "bg-black bg-opacity-50" : ""}
                >
                    <Modal.Body>
                        <div className="space-y-6">
                            <Create
                                onClose={() => setOpenModalInsert(false)}
                                attention={attention}
                                auth={props.auth}
                                errors={props.errors}
                                toastr={toastr}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
                {/* End Modal Insert */}

                {/* Modal Update */}
                <Modal
                    show={openModalUpdate}
                    onClose={() => {
                        setOpenModalUpdate(false);
                        setToastrMessage(null); // Limpiar el mensaje del toastr al cerrar el modal
                    }}
                    size="sm"
                    className={openModalUpdate ? "bg-black bg-opacity-50" : ""}
                >
                    <Modal.Body>
                        <div className="space-y-6">
                            <Edit
                                id={valorID}
                                onSave={() => toastr("Guardado")}
                                onClose={() => setOpenModalUpdate(false)}
                                toastr={toastr}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
                {/* End Modal Update */}

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
                                atención?
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

                {/* Propiedades Toastr */}
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </AuthenticatedLayout>
    );
}
