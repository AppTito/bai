import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Modal, Button } from "flowbite-react";
import Edit from "./Edit";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";

export default function Index(props) {
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [valorID, setValorID] = useState(null);
    const [categoryValue, setCategoryValue] = useState(null); // Nuevo estado para el valor de la categoría
    const { categoryValues } = usePage().props;
    const columns = ["value", "category"];
    const labels = ["Valor", "Categoría"];
    const [toastrMessage, setToastrMessage] = useState(null);

    function toastr(message) {
        setToastrMessage(message);
    }

    const openUpdateModal = (id) => {
        setValorID(id);

        // Encuentra el objeto con el mismo id en la propiedad 'data'
        const selectedItem = categoryValues.data.find((item) => item.id === id);

        // Obtén la propiedad 'category' del objeto encontrado
        const categoryValue = selectedItem?.category;

        // Pasar el ID y el valor a Edit
        setOpenModalUpdate(true);
        setToastrMessage(null); // Limpiar el mensaje del toastr al abrir el modal
        setCategoryValue(categoryValue); // Asegúrate de tener un estado para el valor de la categoría
    };

    const actions = ["", (id) => openUpdateModal(id), ""];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table
                                    items={categoryValues}
                                    columns={columns}
                                    primary={"Producto"}
                                    labels={labels}
                                    actions={actions}
                                    per={"categoryValue"}
                                    openUpdateModal={openUpdateModal}
                                />
                                <Pagination
                                    class="mt-6"
                                    links={categoryValues.links}
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
                                categoryValue={categoryValue} // Pasa el valor de la tercera columna al componente Edit
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
