// Index.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import TableRowControl from "@/Components/Distribution/TableRowControl";
import TableHeaderRow from "@/Components/TableTheadControl";
import CalendarSection from "@/Components/Operations/calendarSection";
import useDateUtils from "@/hooks/useDateUtils";

const columnNames = [
    { Organización: "organization" },
    { "Porcentaje (%)": "percentage" },
    { Fruver: "fruver" },
    { Lacteos: "lacteos" },
    { Panaderia: "panaderia" },
    { Granos: "granos" },
    { Embutidos: "embutidos" },
    { Huevos: "huevos" },
    { Reposteria: "reposteria" },
    { Procesados: "procesados" },
    { Salsas: "salsas" },
    { Proteina: "proteina" },
    { Jugos: "jugos" },
    { Carbohidratos: "carbohidratos" },
    { Enlatados: "enlatados" },
    { "Proteina (KFC)": "proteina-kfc" },
    { "Procesado (KFC)": "procesado-kfc" },
    { Total: "total" },
    { "Kg Pendientes": "kg-pendientes" },
    { Nota: "nota" },
];

export default function Index(props) {
    const { organization } = usePage().props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tableRows, setTableRows] = React.useState([
        [null, ...Array(columnNames.length - 2).fill(0), null],
    ]);

    const { formatDate } = useDateUtils();

    const { data, setData, errors, post } = useForm({
        date: formatDate(selectedDate),
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData("date", formatDate(date));
    };

    const addRow = () => {
        const newRow = [null, ...Array(columnNames.length - 2).fill(0), null];
        setTableRows((prevRows) => [...prevRows, newRow]);
    };

    /* pesos */

    // Estados para los valores de peso
    const [pesoGavetas, setPesoGavetas] = useState("");
    const [pesoProcesado, setPesoProcesado] = useState("");
    const [pesoTotal, setPesoTotal] = useState("");

    // Función para manejar el cambio en el input de peso Gavetas
    const handlePesoGavetasChange = (event) => {
        const value = event.target.value;
        setPesoGavetas(value);

        // Calcular el Peso Total: gaveta - procesado
        const total = parseFloat(value) - parseFloat(pesoProcesado);
        setPesoTotal(isNaN(total) ? "" : total);
    };

    // Función para manejar el cambio en el input de peso Procesado
    const handlePesoProcesadoChange = (event) => {
        const value = event.target.value;
        setPesoProcesado(value);
    };

    const handlePesoTotalChange = (event) => {
        // Calcular el Peso Total: gaveta - procesado
        const total = parseFloat(pesoGavetas) - parseFloat(value);
        setPesoTotal(isNaN(total) ? "" : total);
    };

    // Función para manejar el cambio en los valores de la tabla
    const handleTableChange = (newAllCellValues) => {
        // Actualizar el estado con todos los valores de las celdas
        const columnSums = Array(7).fill(0);
        newAllCellValues.forEach((row) => {
            row.forEach((value, index) => {
                columnSums[index] += value;
            });
        });

        // Actualizar los estados solo si hay cambios
        setPesoGavetas(newAllCellValues[17][6].toString());
        setPesoProcesado(newAllCellValues[17][0].toString());
        const valueGavetas = parseFloat(pesoGavetas);
        const valueProcesado = parseFloat(pesoProcesado);
        const total = valueGavetas - valueProcesado;
        setPesoTotal(total.toString());
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6">
                        {/* Titulo */}
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-green-700">
                                Distribución → Donante
                            </h1>
                        </div>

                        {/* Calendar y seleccionar fecha*/}
                        <div className="container mb-6 flex items-center">
                            <CalendarSection
                                selectedDate={selectedDate}
                                onChange={handleDateChange}
                            />
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                                <Link>Cargar</Link>
                            </button>
                        </div>

                        {/* pesos */}
                        {/* Inputs de pesos */}
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-peso-total"
                                >
                                    Peso Total
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-peso-total"
                                    type="number"
                                    placeholder="Peso Total"
                                    min={0}
                                    value={pesoGavetas}
                                    onChange={handlePesoGavetasChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-peso-recuperado"
                                >
                                    Peso Recuperado
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-peso-recuperado"
                                    type="number"
                                    placeholder="Peso Recuperado"
                                    min={0}
                                    contentEditable={false}
                                    value={pesoProcesado}
                                    onChange={handlePesoProcesadoChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-peso-final"
                                >
                                    Peso Final
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-peso-final"
                                    type="number"
                                    placeholder="Peso Final"
                                    min={0}
                                    contentEditable={false}
                                    value={pesoTotal}
                                    onChange={handlePesoTotalChange}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-1">
                            <table className="min-w-full border border-gray-300 text-center mt-5">
                                <thead>
                                    <TableHeaderRow columnNames={columnNames} />
                                </thead>
                                <tbody>
                                    <TableRowControl
                                        tableRows={tableRows}
                                        organization={organization}
                                    />
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between mt-4 m-2">
                            <button
                                onClick={addRow}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                + Añadir Distribución
                            </button>
                            <a
                                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                               /* ir a control */
                                 href={route("operations.control")}
                                  active={route().current("operations.control")}

                            >
                                Control
                            </a>
                        </div>

                        {/* guardar */}
                        <div className="mt-4 text-end">
                            <button
                                onClick={addRow}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
