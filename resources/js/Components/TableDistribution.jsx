import React from "react";

const DistributionTable = ({ data, onUpdateData, onAddRow }) => {
  const handleCellValueChange = (index, column, value) => {
    const newData = [...data];
    newData[index][column] = value;
    onUpdateData(newData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
                    <tr className="bg-primary">
                        <th className="p-2 border">Organizaciones</th>
                        <th className="p-2 border">Porcentaje</th>
                        <th className="p-2 border">KG a Entregar</th>
                        <th className="p-2 border">Fruver</th>
                        <th className="p-2 border">Lácteos</th>
                        <th className="p-2 border">Panadería</th>
                        <th className="p-2 border">Granos</th>
                        <th className="p-2 border">Embutidos</th>
                        <th className="p-2 border">Huevos</th>
                        <th className="p-2 border">Repostería</th>
                        <th className="p-2 border">Procesados</th>
                        <th className="p-2 border">Salsas</th>
                        <th className="p-2 border">Proteína</th>
                        <th className="p-2 border">Jugos</th>
                        <th className="p-2 border">Carbohidratos</th>
                        <th className="p-2 border">Enlatados</th>
                        <th className="p-2 border">Proteína</th>
                        <th className="p-2 border">Procesado</th>
                        <th className="p-2 border">Total</th>
                        <th className="p-2 border">KG Pendientes</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="p-2 border" contentEditable="true">
                {row.organizaciones}
              </td>
              <td className="p-2 border" contentEditable="true">
                {row.porcentaje}
              </td>
                <td className="p-2 border" contentEditable="true">
                    {row.kg_entregar}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.fruver}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.lacteos}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.panaderia}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.granos}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.embutidos}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.huevos}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.reposteria}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.procesados}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.salsas}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.proteina}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.jugos}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.carbohidratos}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.enlatados}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.proteina}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.procesado}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.total}
                </td>
                <td className="p-2 border" contentEditable="true">
                    {row.kg_pendientes}
                </td>

              <td className="p-2 border">
                <button
                  onClick={onAddRow}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
                <button
                  onClick={onAddRow}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                  Nota Donacion
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributionTable;
