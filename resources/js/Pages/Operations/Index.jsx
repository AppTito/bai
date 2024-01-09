import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CalendarSection from "@/Components/Operations/calendarSection";

export default function Index(props) {
    const { hasPermission, hasRole } = usePermissions();
    /* fecha actual */
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedOrganization, setSelectedOrganization] = useState("");

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <div className="p-8 text-center">
                        {/* Calendar */}
                        <CalendarSection />

                        {/* Organization Dropdown */}
                        <div className="mb-6">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Seleccione un Donante
                            </label>
                            <select
                                value={selectedOrganization} // Add this line
                                onChange={(e) => setSelectedOrganization(e.target.value)} // Add this line
                                className="w-full p-2 border-gray-300 rounded"
                            >
                                <option value="" disabled hidden>
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
                                href={route("operations.control")}
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
