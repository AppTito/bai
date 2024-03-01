import React, { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Edit({ onClose, id }) {
    const {
        products: { data, categories: initialCategories },
    } = usePage().props;
    const product = data.find((item) => item.id === id);
    const productCategory = product ? product.category : undefined;

    const [categories, setCategories] = useState(initialCategories || []);
    const {
        data: formData,
        setData,
        errors,
        put,
    } = useForm({
        detail: product ? product.detail : "",
        category_id: productCategory ? productCategory.id : "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories-list");
                const data = await response.json();
                setCategories(data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onClose();
        toast.success("Editado");
        if (!product || !productCategory) {
            console.error("Product or productCategory is undefined");
            return;
        }

        put(route("products.update", product.id), {
            onSuccess: () => {
                xconsole.log("Producto actualizado con éxito");
            },
            onError: (errors) => {
                console.error("Error al actualizar el producto:", errors);
            },
        });
    }

    return (
        <form name="editForm" onSubmit={handleSubmit}>
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Editar Producto</h2>
            </div>
            <div className="flex flex-col">
                <div className="mb-4">
                    <label className="">Producto</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md"
                        label="Detail"
                        name="detail"
                        value={formData.detail}
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
                        value={formData.category_id}
                        onChange={(event) =>
                            setData("category_id", event.target.value)
                        }
                    >
                        <option value="">Seleccione Categoría</option>
                        {Array.isArray(categories) &&
                            categories.map(({ id, category }) => (
                                <option key={id} value={id}>
                                    {category}
                                </option>
                            ))}
                    </select>
                    <span className="text-red-600">{errors.category_id}</span>
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
                    href={route("products.index")}
                >
                    Cerrar
                </Link>
            </div>
        </form>
    );
}
