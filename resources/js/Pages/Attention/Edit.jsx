import React, { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Edit({ onClose, id }) {
    const page = usePage();

    // Verificar si page o page.props no están definidos
    if (!page || !page.props) {
        console.error("Error: page o page.props no está definido");
        return null;
    }

    const { attentions = {} } = page.props;
    const { data = [], organization: initialOrganization } = attentions;

    // Verificar si data no está definido
    if (!data) {
        console.error("Error: data no está definido");
        return null;
    }

    const attention = data.find((item) => item.id === id);
    const attentionOrganization = attention ? attention.organization : undefined;

    const [organization, setOrganization] = useState(initialOrganization);

    const {
        data: formData,
        setData,
        errors,
        put,
    } = useForm({
        organization_id: attentionOrganization ? attentionOrganization.id : "",
        dni: attention ? attention.dni : "",
        name: attention ? attention.name : "",
        phone: attention ? attention.phone : "",
        email: attention ? attention.email : "",
    });

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await fetch("/api/organizations-list");
                const data = await response.json();
                setOrganization(data.data);
            } catch (error) {
                console.error("Error fetching organizations:", error);
            }
        };

        fetchOrganizations();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onClose();
        toast.success("Editado");
        if (!attention || !attentionOrganization) {
            console.error("undefined");
            return;
        }

        put(route("attentions.update", attention.id), {
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
                <h2 className="text-xl font-bold">Editar Atención</h2>
            </div>
            <form name="createForm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="">Organización</label>
                        <select
                            className="w-full px-4 py-2 rounded-md"
                            label="Organization_id"
                            name="organization_id"
                            value={formData.organization_id}
                            onChange={(event) =>
                                setData("organization_id", event.target.value)
                            }
                        >
                            <option value="">Seleccione Organización</option>
                            {Array.isArray(organization) &&
                                organization.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                        </select>
                        <span className="text-red-600">
                            {errors.organization_id}
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="">Nombres y Apellidos</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(event) =>
                                setData("name", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.name}</span>
                    </div>
                    <div className="mb-4">
                        <label className="">Cédula de identificación</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Dni"
                            name="dni"
                            value={formData.dni}
                            onChange={(event) =>
                                setData("dni", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.dni}</span>
                    </div>
                    <div className="mb-4">
                        <label className="">N. Teléfono</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(event) =>
                                setData("phone", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.phone}</span>
                    </div>
                    <div className="mb-4">
                        <label className="">Correo Electrónico</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-md"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={(event) =>
                                setData("email", event.target.value)
                            }
                        />
                        <span className="text-red-600">{errors.email}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
