import React , { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link} from "@inertiajs/react";
import TableRowControl from "@/Components/Operations/TableRowControl";
import TableHeaderRow from "@/Components/TableTheadControl.jsx";

export default function Index(props) {
    const columnNames = [
        "Grupo Alimentos",
        "Recuperado",
        "Consumo Animal",
        "Compostaje",
        "Basura",
        "Refrigerios",
        "Consumo Inmediato",
        "Peso Total",
    ];

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

        // Calcular el Peso Total: gaveta - procesado
        const total = parseFloat(pesoGavetas) - parseFloat(value);
        setPesoTotal(isNaN(total) ? "" : total);
    };

    // Función para manejar el clic en el botón de calcular
    const handleCalcularClick = () => {
        // Rcibir los valores de los inputs
        const valueGavetas = parseFloat(pesoGavetas) || 0;
        const valueProcesado = parseFloat(pesoProcesado) || 0;

        // Calcular el Peso Total: gaveta - procesado
        const total = valueGavetas - valueProcesado;
        setPesoTotal(isNaN(total) ? "" : total);
    };


    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Control" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Volver */}
                        <div className="flex justify-start mb-4">
                            <Link
                                href={route("operations.index")}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Volver
                            </Link>
                        </div>

                        {/* Pesos */}
                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                            Donante: {/* {organization.name} */}
                        </h2>

                        {/* Inputs de pesos */}
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-first-name"
                                >
                                    Peso Total
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name"
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
                                    htmlFor="grid-last-name"
                                >
                                    Peso Recuperado
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
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
                                    htmlFor="grid-last-name"
                                >
                                    Peso Final
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="number"
                                    placeholder="Peso Final"
                                    min={0}
                                    contentEditable={false}
                                    value={pesoTotal}
                                    onChange={(event) => setPesoTotal(event.target.value)}
                                />
                            </div>
                        </div>
                        {/* Tabla para llenar con los pesos */}
                        <h2 className="text-2xl font-bold text-start text-green-700 p-2">
                            Control:
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                <TableHeaderRow columnNames={columnNames} />
                                </thead>
                                <tbody>
                                <TableRowControl />
                                </tbody>
                            </table>
                        </div>

                        {/* Botón siguiente vista distribución */}
                        <div className="flex justify-end mt-4">
                            <Link
/*                                 href={route("operations.distribution")}
 */                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Guardar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
