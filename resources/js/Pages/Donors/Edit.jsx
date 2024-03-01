import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Edit({ onClose, id }) {
    const { setData, data, put } = useForm({
        name: "",
        address: "",
        ruc: "",
        phone: "",
        donors: [],
    });

    useEffect(() => {
        fetch("/api/donors-list")
            .then((response) => response.json())
            .then((apiResponse) => {
                setData("donors", apiResponse.data || []);

                const selected = apiResponse.data.find(
                    (item) => item.id === id
                );

                if (selected) {
                    setData({
                        name: selected.name,
                        address: selected.address,
                        ruc: selected.ruc,
                        phone: selected.phone,
                    });
                } else {
                    setData({
                        name: "",
                        address: "",
                        ruc: "",
                        phone: "",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching:", error);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        onClose();

        put(route("donors.update", id), {
            onSuccess: () => {
                console.log("Actualizado con éxito");
            },
            onError: (error) => {
                console.error("Error al actualizar:", error);

                // Muestra los mensajes de error de una manera que tenga sentido para tu aplicación
                if (error && error.response && error.response.data) {
                    const errors = error.response.data;

                    // Itera sobre los mensajes de error y muestra cada uno
                    Object.keys(errors).forEach((fieldName) => {
                        toast.error(`${fieldName}: ${errors[fieldName][0]}`);
                    });
                } else {
                    toast.error("Error desconocido al actualizar el donante");
                }
            },
        });
    }

    const formFields = [
        { name: "name", label: "Nombre" },
        { name: "address", label: "Dirección" },
        { name: "ruc", label: "RUC" },
        { name: "phone", label: "Teléfono" },
    ];

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Editar Donante</h2>
            </div>
            <form name="editForm" onSubmit={handleSubmit}>
                {formFields.map((field) => (
                    <div className="flex flex-col" key={field.name}>
                        <div className="mb-4">
                            <label>{field.label}</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-md"
                                label={field.label}
                                name={field.name}
                                value={data[field.name]}
                                onChange={(event) =>
                                    setData(field.name, event.target.value)
                                }
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                    >
                        Guardar
                    </button>
                    <Link
                        className="px-6 py-2 text-white bg-red-500 rounded-md focus:outline-none"
                        href={route("donors.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
