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
    /* Booleanos para manejar el estado de los modals */
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalInsert, setOpenModalInsert] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    /* Valor ID */
    const [valorID, setValorID] = useState(null);

    const { categories } = usePage().props;
    const columns = ["code", "category", "indicator"];
    const labels = ["Código", "Categoría", "Indicador"];

    const [setToastrMessage] = useState(null);

    function toastr(message) {
        setToastrMessage(message);
    }

    function destroy(e) {
        const value = Number(e.currentTarget.id);
        setValorID(value);
        setOpenModalDelete(true);
    }

    async function confirmDelete() {
        try {
            // Utiliza await para esperar la respuesta de Inertia.delete
            await Inertia.delete(route("categories.destroy", valorID));

            // Puedes realizar acciones adicionales después de una eliminación exitosa
            setOpenModalDelete(false);
            toast.error("Categoría eliminado!");

            // Puedes redirigir a una nueva página o realizar otras acciones necesarias
            // Por ejemplo, puedes utilizar history.push('/') para redirigir a la página de inicio
        } catch (error) {
            console.error("Error al eliminar categoría:", error);

            // Puedes manejar errores de eliminación aquí, como mostrar un mensaje de error al usuario
            toast.error(
                "Error al eliminar la categoría. Por favor, inténtalo de nuevo."
            );
        }
    }

    const openUpdateModal = (id) => {
        setValorID(id);
        console.log(id);
        setOpenModalUpdate(true);
    };
    const actions = ["", (id) => openUpdateModal(id), destroy];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Categorías" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Button
                                    onClick={() => setOpenModalInsert(true)}
                                    className="bg-emerald-600 p-1 my-3"
                                >
                                    Crear Categoría
                                </Button>
                                <Table
                                    items={categories}
                                    columns={columns}
                                    primary={"Categoría"}
                                    labels={labels}
                                    actions={actions}
                                    per={"category"}
                                    openUpdateModal={openUpdateModal}
                                />
                                <Pagination
                                    class="mt-6"
                                    links={categories.links}
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
                                categories={categories}
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
                                categoría?
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

                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </AuthenticatedLayout>
    );
}
