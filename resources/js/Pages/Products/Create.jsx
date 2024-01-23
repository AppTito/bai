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
        detail: "",
        category_id: "",
    });


    /* Listado del Select */
    const [categories, setCategories] = useState([]);

    /* Llamada por medio de API */
    useEffect(() => {
        fetch("/api/categories-list")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("products.store"));
        onClose();
        toast.success("Guardado");
    }

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Agregar Nuevo Producto</h2>
            </div>
            <form
                name="createForm"
                onSubmit={handleSubmit}
                className="flex flex-col"
            >
                <div className="mb-4">
                    <label className="">Producto</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md"
                        label="Detail"
                        name="detail"
                        value={data.detail}
                        onChange={(event) =>
                            setData("detail", event.target.value)
                        }
                    />
                    <span className="text-red-600">{errors.detail}</span>
                </div>
                <div className="mb-4">
                    <label className="">Categorías</label>
                    <select
                        className="w-full px-4 py-2 rounded-md"
                        label="Category_id"
                        name="category_id"
                        value={data.category_id}
                        onChange={(event) =>
                            setData("category_id", event.target.value)
                        }
                    >
                        <option value="">Seleccione Categoría</option>
                        {categories.map(({ id, category }) => (
                            <option key={id} value={id}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <span className="text-red-600">{errors.category_id}</span>
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
                        href={route("products.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
