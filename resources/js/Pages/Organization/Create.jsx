import React from "react";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create({ onClose }) {
    const { data, setData, errors, post } = useForm({
        code: "",
        address: "",
        ruc: "",
        name: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("organizations.store"));
        onClose();
        toast.success("Guardado");
    }

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Agregar Nueva Organización</h2>
            </div>
            <form name="createForm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Código</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Code"
                            name="code"
                            value={data.code}
                            onChange={(event) =>
                                setData("code", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.code}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Nombre</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Code"
                            name="code"
                            value={data.name}
                            onChange={(event) =>
                                setData("name", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.name}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Dirección</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Address"
                            name="address"
                            value={data.address}
                            onChange={(event) =>
                                setData("address", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.address}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">RUC</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Ruc"
                            name="ruc"
                            value={data.ruc}
                            onChange={(event) =>
                                setData("ruc", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.ruc}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                    >
                        Guardar
                    </button>
                    <Link
                        className="px-6 py-2 text-white bg-red-500 rounded-md focus:outline-none"
                        href={route("organizations.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
