import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { organization } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();
    /* fecha actual */
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                                Seleccione una organización
                            </label>
                            <select className="w-full p-2 border-gray-300 rounded">
                                <option value="" disabled selected hidden>
                                    Seleccione
                                </option>
                                <option value="La Favorita">La Favorita</option>
                                <option value="Santa Maria">Santa Maria</option>
                                <option value="San Antonio">San Antonio</option>
                                <option value="Otro">Otro</option>
                            </select>
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
