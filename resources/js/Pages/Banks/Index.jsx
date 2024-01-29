/* Modal */
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

/* Slidebar */
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";

/* Componente Editar */
import Edit from "./Edit";

/* Íconos y Toastr */
import { HiOutlineExclamationCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

export default function Index(props) {
    /* Caracter booleano para abrir y cerrar Modals */
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [valorID, setValorID] = useState(null);

    const { dataBank } = usePage().props;
    const columns = ["address", "ruc", "email", "phone"];
    const labels = ["Dirección", "RUC", "Correo", "Teléfono"];

    const [setToastrMessage] = useState(null);

    function toastr(message) {
        setToastrMessage(message);
    }

    const openUpdateModal = (id) => {
        setValorID(id);
        console.log(id);
        setOpenModalUpdate(true);
    };

    const actions = ["", (id) => openUpdateModal(id), ""];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Badi data" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table
                                    items={dataBank}
                                    columns={columns}
                                    primary={"Badi data"}
                                    labels={labels}
                                    actions={actions}
                                    per={"bank"}
                                    openUpdateModal={openUpdateModal}
                                />
                                <Pagination
                                    class="mt-6"
                                    links={dataBank.links}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </AuthenticatedLayout>
    );
}
