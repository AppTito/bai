import React, { useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Edit({ id, toastr, onClose, categoryValue }) {
    const { data, setData, errors, put } = useForm({
        value: "",
        category_id: id || 0, // Inicializa con un valor predeterminado (por ejemplo, 0) si id es indefinido.
        categoryValues: "",
    });

    useEffect(() => {
        fetch("/api/categoriesValues-list")
            .then((response) => response.json())
            .then((apiResponse) => {
                setData("categoryValues", apiResponse.data || []);

                const selectedCategory = apiResponse.data.find(
                    (item) => item.id === id
                );

                if (selectedCategory) {
                    setData({
                        value: selectedCategory.value,
                        category_id: selectedCategory.category_id,
                    });
                } else {
                    setData({
                        value: "",
                        category_id: 0,
                    });
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
        put(route("categoryValues.update", id), {
            value: data.value,
            category_id: data.category_id,
        });
    }

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Editar Valor {categoryValue}</h2>
            </div>
            <form name="createForm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Valor</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 rounded-md"
                            label="Value"
                            name="value"
                            value={data.value}
                            onChange={(event) =>
                                setData("value", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.value}</span>
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
                        href={route("categoryValues.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
