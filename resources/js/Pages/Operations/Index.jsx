import React, { useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { donors } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();
    /* fecha actual */
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { data, setData, errors, post } = useForm({
        donors_id:"",
        name:"",
    });

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <div className="p-8 text-center">
                        {/* Calendar */}
                        <div className="mb-6">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Seleccione una fecha
                            </label>
                            <DatePicker
                                showIcon={true}
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="w-full p-2 border rounded border-gray-300 text-center"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Seleccione una fecha"
                                withPortal
                            />
                        </div>

                        {/* Organization Dropdown */}
                        <div className="mb-6">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Seleccione el Donante
                            </label>
                            <select className="w-full px-4 py-2 rounded-md"
                            label="Donors_id" name="donors_id" value={data.donors_id}
                                onChange={(event) =>
                                    setData("donors_id", event.target.value)
                                }>
                                <option value="">Seleccione el Donante</option>
                                {donors.map(({id, name}) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                            <span className="text-red-600">{errors.donors_id}</span>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end">
                            <Link
                                href={route("operations.weight")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Siguiente
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
