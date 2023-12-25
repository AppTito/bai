import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import DistributionTable from "@/Components/TableDistribution";

export default function Index(props) {
    const { organization } = usePage().props;

    const [data, setData] = useState([
        {
            organization: organization,
            percentage: 0,
            kg_deliver: 0,
            fruits: 0,
            dairy: 0,
            bakery: 0,
            grains: 0,
            sausages: 0,
            eggs: 0,
            pastry: 0,
            processed: 0,
            sauces: 0,
            protein: 0,
            juices: 0,
            carbohydrates: 0,
            canned: 0,
            protein: 0,
            processed: 0,
            total: 0,
            kg_pending: 0,
        },
    ]);

    const handleUpdateData = (newData) => {
        setData(newData);
    };

    const handleAddRow = () => {
        setData([...data 
            ,{
                organization: organization,
                percentage: 0,
                kg_deliver: 0,
                fruits: 0,
                dairy: 0,
                bakery: 0,
                grains: 0,
                sausages: 0,
                eggs: 0,
                pastry: 0,
                processed: 0,
                sauces: 0,
                protein: 0,
                juices: 0,
                carbohydrates: 0,
                canned: 0,
                protein: 0,
                processed: 0,
                total: 0,
                kg_pending: 0,
            }
            
        ]);
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Distribution" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Volver */}
                        <div className="flex justify-start px-6 py-4">
                            <Link
                                href={route("operations.control")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Volver
                            </Link>
                        </div>
                        {/* Tabla para llenar con los pesos */}
                        <DistributionTable
                            data={data}
                            onUpdateData={handleUpdateData}
                            onAddRow={handleAddRow}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
