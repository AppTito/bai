import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Edit({ onClose, id }) {
    const { data, setData, errors, put } = useForm({
        address: "",
        ruc: "",
        email: "",
        phone: "",
        banks: [],
    });

    useEffect(() => {
        fetch("/api/banks-list")
            .then((response) => response.json())
            .then((apiResponse) => {
                setData("banks", apiResponse.data || []);

                const selected = apiResponse.data.find(
                    (item) => item.id === id
                );

                if (selected) {
                    setData({
                        address: selected.address,
                        ruc: selected.ruc,
                        email: selected.email,
                        phone: selected.phone,
                    });
                } else {
                    setData("address", "");
                    setData("ruc", "");
                    setData("email", "");
                    setData("phone", "");
                }
            })
            .catch((error) => {
                console.error("Error fetching:", error);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        onClose();
        toast.success("Editado");
        put(route("banks.update", id), {
            onSuccess: () => {
                console.log("Actualizado con éxito");
            },
            onError: (errors) => {
                console.error("Error al actualizar:", errors);
            },
        });
    }

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Editar Datos BAI</h2>
            </div>
            <form name="createForm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Address</label>
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
                        <span className="text-red-600">{errors.code}</span>
                        <label className="">Ruc</label>
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
                        <span className="text-red-600">{errors.code}</span>
                        <label className="">Email</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={(event) =>
                                setData("email", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.code}</span>
                        <label className="">Phone</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Phone"
                            name="phone"
                            value={data.phone}
                            onChange={(event) =>
                                setData("phone", event.target.value)
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
                        href={route("banks.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
