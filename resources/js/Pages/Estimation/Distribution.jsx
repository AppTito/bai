import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, usePage} from "@inertiajs/react";
import TableRowEstimation from "@/Components/Operations/TableRowEstimation.jsx";

const columnNames = [
    "Organización",
    "Porcentaje (%)",
    "Kg a entregar",
    "Total",
    "Kg Pendientes",
];

export default function Index(props) {
    const { date, organization, donors_id } = usePage().props;

    const [tableRows, setTableRows] = React.useState([
        [null, ...Array(columnNames.length - 2).fill(0), null], // Inicializar con una fila donde la primera columna es null y el resto son ceros
    ]);

    const addRow = () => {
        const newRow = [null, ...Array(columnNames.length - 2).fill(0), null]; // Crea una nueva fila con la primera columna como null y el resto de las columnas con valores de 0
        setTableRows((prevRows) => [...prevRows, newRow]);
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-start mb-4">
                            <Link href={route("estimations.index")}
                                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Volver
                            </Link>
                        </div>
                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                            Donante: {donors_id.name}
                        </h2>
                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                            Fecha: {date}
                        </h2>
                        <div className="overflow-x-auto mb-1">
                            <TableRowEstimation tableRows={tableRows} setTableRows={setTableRows} donors={donors_id}
                                                organization={organization} date={date} columnNames={columnNames}/>
                        </div>
                        <div className="flex mt-4">
                            <button onClick={addRow}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                + Añadir Distribución
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
