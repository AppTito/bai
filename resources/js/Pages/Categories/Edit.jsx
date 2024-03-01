import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Edit({ onClose, id }) {
    const { setData, data, errors, put } = useForm({
        category: "",
        indicator: "",
        code: "",
        categories: [],
    });

    useEffect(() => {
        fetch("/api/categories-list")
            .then((response) => response.json())
            .then((apiResponse) => {
                setData("categories", apiResponse.data || []);

                const selectedCategory = apiResponse.data.find(
                    (item) => item.id === id
                );

                if (selectedCategory) {
                    setData({
                        code: selectedCategory.code,
                        category: selectedCategory.category,
                        indicator: selectedCategory.indicator,
                    });
                } else {
                    setData("category", "");
                    setData("indicator", "");
                    setData("code", "");
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        onClose();
        toast.success("Editado");
        put(route("categories.update", id), {
            onSuccess: () => {
                console.log("Categoría actualizada con éxito");
            },
            onError: (errors) => {
                console.error("Error al actualizar la categoría:", errors);
            },
        });
    }

    return (
        <form name="editForm" onSubmit={handleSubmit}>
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Editar Categoría</h2>
            </div>
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
                </div>
                <div className="mb-4">
                    <label className="">Indicador</label>
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
                </div>
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
    );
}
