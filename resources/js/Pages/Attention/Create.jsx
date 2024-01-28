import React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create({ onClose }) {
    const { data, setData, errors, post } = useForm({
        organization_id: "",
        dni: "",
        name: "",
        phone: "",
        email: "",
    });

    /* Listado del Select */
    const [organization, setAttention] = useState([]);

    /* Llamada por medio de API */
    useEffect(() => {
        fetch("/api/organizations-list")
            .then((response) => response.json())
            .then((data) => {
                setAttention(data.data);
            })
            .catch((error) => {
                console.error("Error fetching attentions:", error);
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await post(route("attentions.store"));
            onClose();
            toast.success("Guardado");
        } catch (error) {
            // Verificar si el error es de duplicado por correo electrónico
            if (
                error.response &&
                error.response.data &&
                error.response.data.message &&
                error.response.data.message.toLowerCase().includes("duplicate entry") &&
                error.response.data.message.toLowerCase().includes("attentions_email_unique")
            ) {
                toast.error("Correo electrónico duplicado");
            } else {
                // Manejar otros tipos de errores aquí si es necesario
                console.error("Error al guardar la atención:", error);
                toast.error("Error al guardar la atención");
            }
            
        }
    }

    return (
        <div className="py-5">
            <div className="text-center mb-5">
                <h2 className="text-xl font-bold">Agregar Nueva Atención</h2>
            </div>
            <form
                name="createForm"
                onSubmit={handleSubmit}
                className="flex flex-col"
            >
                <div className="mb-4">
                    <label className="">Organización</label>
                    <select
                        className="w-full px-4 py-2 rounded-md"
                        label="Organization_id"
                        name="organization_id"
                        value={data.organization_id}
                        onChange={(event) =>
                            setData("organization_id", event.target.value)
                        }
                    >
                        <option value="">Seleccione Organización</option>
                        {organization.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <span className="text-red-600">
                        {errors.organization_id}
                    </span>
                </div>

                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Nombres y Apellidos</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Name"
                            name="name"
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
                        <label className="">Cédula de identificación</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Dni"
                            name="dni"
                            value={data.dni}
                            onChange={(event) =>
                                setData("dni", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.dni}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">N. Teléfono</label>
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
                        <span className="text-red-600">{errors.phone}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Correo Electrónico</label>
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
                        <span className="text-red-600">{errors.email}</span>
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
                        href={route("attentions.index")}
                    >
                        Cerrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
