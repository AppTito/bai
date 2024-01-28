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

    const initialFormData = {
        donors_id: "",
        date: formatDate(selectedDate),
        date1: formatDate(selectedDate1),
    };

    const { data, setData, errors, post } = useForm(initialFormData);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData("date", formatDate(date));
    };

    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
        setData("date1", formatDate(date));
    };

    const handleSubmit = (e, routeName, formData) => {
        e.preventDefault();
        post(route(routeName), formData);
    };

    const handleSubmit2 = (e, routeName, formData) => {
        e.preventDefault();
        post(route(routeName), formData);
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    {/* Form 1 */}
                    <form
                        className="bg-white rounded-lg overflow-hidden shadow-md w-96 mb-8"
                        onSubmit={(e) =>
                            handleSubmit(e, "operations.operationsbydate", {
                                date1: formatDate(selectedDate1),
                            })
                        }
                    >
                        <div className="p-8 text-center">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Buscar por fecha
                            </label>
                            <CalendarSection
                                selectedDate={selectedDate1}
                                onChange={handleDateChange1}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Form 2 */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                         <form
                            onSubmit={(e) =>
                                handleSubmit2(e, "distribution.distribution", {
                                    donors_id: data.donors_id,
                                    date: formatDate(selectedDate),
                                })
                            }
                        >
                        <div className="p-8 text-center">
                            <label className="block text-green-700 text-sm font-bold mb-2">
                                Crear nuevo
                            </label>
                            <CalendarSection
                                selectedDate={selectedDate}
                                onChange={handleDateChange}
                            />

                            <div className="mb-6">
                                <label
                                    className="block text-green-700 text-sm font-bold mb-2"
                                    htmlFor="donors_id_o"
                                >
                                    Seleccione el Donante
                                </label>
                                <select
                                    className="w-full px-4 py-2 rounded-md"
                                    id="donors_id_o"
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
            </div>
        </AuthenticatedLayout>
    );
}
