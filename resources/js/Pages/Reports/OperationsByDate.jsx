import React from 'react';
import { format } from 'date-fns';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination.jsx";
import Table from '@/Components/Operations/TableOperationsbyDate';

export default function Index(props) {
    const { operations, date, startDate, endDate } = usePage().props
    const columns = ["donor_name", "total_weight", "recovered"];
    const labels = ["Donante", "Peso total", "Recuperado"];
    const actions = ["distribution.distributionbydate"];


    const formattedStartDate = format(new Date(startDate), 'dd-MM-yyyy');
    const formattedEndDate = format(new Date(endDate), 'dd-MM-yyyy');

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Operaciones por fecha" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                            Fecha: 
                        </h2>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-6xl mx-auto py-2 sm:px-6 lg:px-7">
                                <Table
                                    items={operations}
                                    columns={columns}
                                    primary={"#"}
                                    labels={labels}
                                    actions={actions}
                                    per={"role"}
                                    date={date}
                                />
                                <Pagination class="mt-6" links={operations.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
