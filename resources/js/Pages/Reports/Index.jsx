import React, { useState } from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CalendarSection from "@/Components/Operations/CalendarSection";
import useDateUtils from "@/hooks/useDateUtils";

export default function Index(props) {
    const { donors } = usePage().props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { formatDate } = useDateUtils();

    const initialFormData = {
        donors_id: "",
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    };

    const { data, setData, errors, post } = useForm(initialFormData);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setData("startDate", formatDate(date));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setData("endDate", formatDate(date));
    };

    const handleSubmit = (e, routeName, formData) => {
        e.preventDefault();
        console.log("Start Date:", formData.startDate);
        console.log("End Date:", formData.endDate);
        console.log("Donors ID:", formData.donors_id);
        post(route(routeName), formData);
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <form
                        className="bg-white rounded-lg overflow-hidden shadow-md w-96 mb-8"
                        onSubmit={(e) =>
                            handleSubmit(e, "reports.operationsByDate", {
                                startDate: formatDate(startDate),
                                endDate: formatDate(endDate),
                                donors_id: data.donors_id,
                            })
                        }
                    >
                        <div className="p-8 text-center">
                            <h1 className="block text-green-700  font-bold mb-2">
                                Generar Reporte
                            </h1>
                            <div className="mb-4">
                                <label className="block text-green-700 text-sm font-bold mb-2">
                                    Fecha de inicio
                                </label>
                                <CalendarSection
                                    selectedDate={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-green-700 text-sm font-bold mb-2">
                                    Fecha de fin
                                </label>
                                <CalendarSection
                                    selectedDate={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-green-700 text-sm font-bold mb-2">
                                    Donante
                                </label>
                                <select
                                    name="donors_id"
                                    id="donors_id"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={data.donors_id}
                                    onChange={(e) =>
                                        setData("donors_id", e.target.value)
                                    }
                                >
                                    <option value="">
                                        Selecciona un donante
                                    </option>
                                    {donors.map((donor) => (
                                        <option key={donor.id} value={donor.id}>
                                            {donor.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-red-600">
                                    {errors.donors_id}
                                </span>
                            </div>
                            <div className="flex justify-end">
                                <Link
                                    href={route("reports.distributionbydate", {
                                        donor_id: data.donors_id,
                                        startDate: formatDate(startDate),
                                        endDate: formatDate(endDate),
                                    })}
                                    method="get"
                                    as="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Buscar
                                </Link>
                            
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
