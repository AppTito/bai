// Index.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import TableRowControl from "@/Components/Distribution/TableRowControl";
import TableHeaderRow from "@/Components/TableTheadControl";
import CalendarSection from "@/Components/Operations/calendarSection";

/* Columnas */
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

  const { data, setData, errors, post } = useForm({
    date: selectedDate.toISOString().slice(0, 10),
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setData("date", date.toISOString().slice(0, 10));
  };

  const addRow = () => {
    const newRow = [null, ...Array(columnNames.length - 2).fill(0), null];
    setTableRows((prevRows) => [...prevRows, newRow]);
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
                Distribución
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
            <div className="flex mt-4">
              <button
                onClick={addRow}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                + Añadir Distribución
              </button>
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
