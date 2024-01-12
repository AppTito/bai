import React, { useState } from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CalendarSection from "@/Components/Operations/calendarSection";

export default function Index(props) {
    const { donors } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data, setData, errors, post } = useForm({
        donors_id: "",
        date: selectedDate.toISOString().slice(0, 10),
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData("date", date.toISOString().slice(0, 10)); // Actualiza la fecha en el formulario
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            donors_id: data.donors_id,
            date: selectedDate.toISOString().slice(0, 10),
        };
        post(route("operations.control"), formData);
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <form onSubmit={handleSubmit}>
                        {" "}
                        {/* Agregar onSubmit */}
                        <div className="p-8 text-center">
                            {/* Calendar */}
                            <CalendarSection  selectedDate={selectedDate} onChange={handleDateChange}/>

                            {/* Organization Dropdown */}
                            <div className="mb-6">
                                <label className="block text-green-700 text-sm font-bold mb-2">
                                    Seleccione el Donante
                                </label>
                                <select
                                    className="w-full px-4 py-2 rounded-md"
                                    label="Donors_id"
                                    name="donors_id"
                                    value={data.donors_id}
                                    onChange={(event) =>
                                        setData("donors_id", event.target.value)
                                    }
                                >
                                    <option value="">
                                        Seleccione el Donante
                                    </option>
                                    {donors.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-red-600">
                                    {errors.donors_id}
                                </span>
                            </div>

                            {/* Next Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
