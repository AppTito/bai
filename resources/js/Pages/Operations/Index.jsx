import React, { useState } from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CalendarSection from "@/Components/Operations/calendarSection";
import useDateUtils from "@/hooks/useDateUtils";

export default function Index(props) {
    const { donors } = usePage().props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const { formatDate } = useDateUtils();

    const { data, setData, errors, post } = useForm({
        donors_id: "",
        date: formatDate(selectedDate),
        date1: formatDate(selectedDate1),
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData("date", formatDate(date)); // Actualiza la fecha en el formulario
    };

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
        setData("date1", formatDate(date)); // Actualiza la fecha en el formulario
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            donors_id: data.donors_id,
            date: formatDate(selectedDate),
        };
        post(route("operations.control"), formData);
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();

        const formData = {
            date1: formatDate(selectedDate1),
        };
        post(route("operations.operationsbydate", formData));
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">

                <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <form onSubmit={handleSubmit1}>
                        {/* Agregar onSubmit */}
                        <div className="p-8 text-center">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Buscar por fecha
                            </label>

                            {/* Calendar */}
                            <CalendarSection selectedDate={selectedDate1} onChange={handleDateChange1} />

                            {/* Next Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </form>

                    //////////

                    <form onSubmit={handleSubmit}>
                        {" "}
                        {/* Agregar onSubmit */}
                        <div className="p-8 text-center">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Crear nuevo
                            </label>
                            {/* Calendar */}
                            <CalendarSection selectedDate={selectedDate} onChange={handleDateChange} />

                            {/* Organization Dropdown */}
                            <div className="mb-6">
                                <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="donors_id_o">
                                    Seleccione el Donante
                                </label>
                                <select
                                    className="w-full px-4 py-2 rounded-md" id="donors_id_o"
                                    name="donors_id"
                                    value={data.donors_id}
                                    onChange={(event) =>
                                        setData("donors_id", event.target.value)
                                    }
                                >
                                    <option value="">
                                        Seleccione el donante
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
