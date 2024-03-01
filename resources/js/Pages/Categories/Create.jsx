import React, { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create({ onClose }) {
    const { errors } = usePage().props;
    const {
        data,
        setData,
        errors: formErrors,
        post,
    } = useForm({
        category: "",
        indicator: "",
        code: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("categories.store"));
        onClose();
        toast.success("Guardado");
    }

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Agregar Nueva Categoría</h2>
            </div>
            <form name="createForm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Categoría</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Category"
                            name="category"
                            value={data.category}
                            onChange={(event) =>
                                setData("category", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.category}</span>
                        <label className="">Indicador nutricional</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Indicator"
                            name="indicator"
                            value={data.indicator}
                            onChange={(event) =>
                                setData("indicator", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.indicator}</span>
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
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                    >
                        Guardar
                    </button>
                    <Link
                        className="px-6 py-2 text-white bg-red-500 rounded-md focus:outline-none"
                        href={route("categories.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
