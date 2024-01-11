import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
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
            <Head title="Estimacion" />
            <div className="container mx-auto mt-8 py-12 max-w-7xl sm:px-6 lg:px-7 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <div className="p-8 text-center">
                        {/* Calendar */}
                        <CalendarSection />
                        {/* siguiente distribution*/}
                        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            href={route('estimation.distribution')}
                        >
                            Siguiente
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
