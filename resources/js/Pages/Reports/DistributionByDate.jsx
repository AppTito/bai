import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import TableRowControlAlt from "@/Components/Distribution/TableRowControlAlt";
import Chart from "react-google-charts";

export default function Index(props) {
    const { auth, errors, startDate, endDate, donor_name, waste, control } = props;

    const chartData = [
        ['Categoría', 'Valor'],
        ['Recuperado', control.recuperado],
        ['Consumo Animal', control.c_animal],
        ['Compostaje', control.compostaje],
        ['Basura', control.basura],
        ['Refrigerio', control.refrigerio],
        ['Consumo Inmediato', control.c_inmediato],
        ['Reciclaje Papel', control.r_papel],
        ['Reciclaje Carton', control.r_carton],
        ['Reciclaje Plástico', control.r_plastico],

    ];

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Distribución por fecha" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="flex items-center mb-4">
                        <Link
                            href={route("reports.index")}
                            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            Volver
                        </Link>
                    </div>
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                                Fecha de Inicio: {startDate}
                            </h2>
                            <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                                Fecha de Fin: {endDate}
                            </h2>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                                Donante: {donor_name}
                            </h2>
                        </div>

                        <div className="overflow-x-auto mb-1">
                            <div className="overflow-x-auto">
                                <TableRowControlAlt
                                    waste={waste}
                                    control={control}
                                />
                            </div>
                        </div>
                        {/* Gráfico */}
                        <div className="mb-6">
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType="PieChart"
                                loader={<div>Cargando Gráfico...</div>}
                                data={chartData}
                                options={{
                                    hAxis: {title: 'Categoría'},
                                    vAxis: {title: 'Valor'},
                                    is3D: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
