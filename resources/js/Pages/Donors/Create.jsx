import React from "react";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create({ onClose }) {
    const { data, setData, errors, post } = useForm({
        name: "",
        address: "",
        ruc: "",
        phone: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("donors.store"));
        onClose();
        toast.success("Guardado");
    };

    const formFields = [
        { name: "name", label: "Nombre" },
        { name: "address", label: "Dirección" },
        { name: "ruc", label: "RUC" },
        { name: "phone", label: "Teléfono" },
    ];

    return (
        <div className="py-12">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">
                    Agregar Nuevo Donante
                </h2>
            </div>

            <form name="createForm" onSubmit={handleSubmit}>
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
                            <span className="text-red-600">
                                {errors[field.name]}
                            </span>
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
