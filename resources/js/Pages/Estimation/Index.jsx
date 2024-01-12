import React, { useState } from "react";
import {Head, useForm} from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CalendarSection from "@/Components/Operations/calendarSection";

export default function Index(props) {
    const { hasPermission, hasRole } = usePermissions();
    /* fecha actual */
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { data, setData, errors, post } = useForm({
        date: selectedDate.toISOString().slice(0, 10),
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData("date", date.toISOString().slice(0, 10)); // Actualiza la fecha en el formulario
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            date: selectedDate.toISOString().slice(0, 10),
        };
        post(route("estimation.distribution"), formData);
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Estimacion" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <form onSubmit={handleSubmit}>
                        <div className="p-8 text-center">
                            {/* Calendar */}
                            <CalendarSection selectedDate={selectedDate} onChange={handleDateChange}/>
                            {/* siguiente distribution*/}
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
