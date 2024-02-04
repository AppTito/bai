import { useCallback, useState } from 'react';
import {Calendar} from "@/Components/Calendar.jsx";
import useDateUtils from "@/hooks/useDateUtils.js";
import {TableHead} from "@/Components/TableHead.jsx";
import {TableRow} from "@/Components/TableRow.jsx";
import {CompanyIcon} from "@/Components/Icons/CompanyIcon.jsx";
import {Button} from "@/Components/Button.jsx";
import {ClientPlusIcon} from "@/Components/Icons/ClientPlusIcon.jsx";
import {SecurityIcon} from "@/Components/Icons/SecurityIcon.jsx";
import {CheckCircleIcon} from "@/Components/Icons/CheckCircleIcon.jsx";

import { router } from '@inertiajs/react'
export function Table({ organization,donors_id ,date2 }) {

    const initialOrganization = { id: '', name: 'Seleccione un Donante' };
    const [selectedDate, setSelectedDate] = useState(new Date());
    const columnNames=  [
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
        { Floristeria: "floristeria" },
        { Enlatados: "enlatados" },
        { "Proteina (KFC)": "proteina-kfc" },
        { "Procesado (KFC)": "procesado-kfc" },
        { Total: "total" },
        { "Kg Pendientes": "kg-pendientes" },
    ];

    const [data, setData] = useState([
        { id: 1, organization: initialOrganization, percentage: 0, fruver: 0, lacteos: 0, panaderia: 0,
            granos: 0, embutidos: 0, huevos: 0, reposteria: 0, procesados: 0, salsas: 0, proteina: 0,
            jugos: 0, carbohidratos: 0,floristeria: 0, enlatados: 0, proteinakfc: 0, procesadokfc: 0, pendingKg: 0
        }
    ]);
    const [editedData, setEditedData] = useState({
        id: null, organization: { id: null, name: '' }, percentage: 0, fruver:0, lacteos:0, panaderia:0,
        granos:0, embutidos:0, huevos:0, reposteria:0, procesados:0, salsas:0, proteina:0, jugos:0,
        carbohidratos:0,floristeria: 0, enlatados:0, proteinakfc:0, procesadokfc:0, pendingKg: 0,
    });
    const { formatDate } = useDateUtils();
    const [ sendData , setSendData] = useState([
        { date: formatDate(selectedDate) },
        { donors_id: donors_id.id}
    ]);

    const [editingId, setEditingId] = useState(null);

    const findOrganizationById = useCallback((orgArray, id) => {
        if (Array.isArray(orgArray)) {
            return orgArray.find((org) => org.id === id) || { id: null, name: '' };
        } else {
            return orgArray || { id: null, name: '' };
        }
    }, []);

    const onChangeOrganization = useCallback((e) => {
        const selectedOrganization = findOrganizationById(organization, Number(e.target.value));
        setEditedData(prevState => ({
            ...prevState,
            organization: selectedOrganization || { id: null, name: '' },
        }));
    }, [findOrganizationById, organization]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevState) => ({ ...prevState, [name]: parseFloat(value) || 0 }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSendData("date", formatDate(date));
    };

    const calculatePendingKg = useCallback((fruver, lacteos,
        panaderia, granos, embutidos, huevos, reposteria, procesados, salsas,
        proteina, jugos, carbohidratos,floristeria , enlatados, proteinakfc, procesadokfc) => {
        return fruver + lacteos + panaderia + granos + embutidos + huevos + reposteria + procesados + salsas +
            proteina + jugos + carbohidratos + floristeria + enlatados + proteinakfc + procesadokfc;
    }, []);

    const calculateTotals = useCallback(() => {
        const totalPercentage = data.reduce((acc, row) => acc + parseFloat(row.percentage) || 0, 0);
        const totalFruver = data.reduce((acc, row) => acc + parseFloat(row.fruver) || 0, 0);
        const totalLacteos = data.reduce((acc, row) => acc + parseFloat(row.lacteos) || 0, 0);
        const totalPanaderia = data.reduce((acc, row) => acc + parseFloat(row.panaderia) || 0, 0);
        const totalGranos = data.reduce((acc, row) => acc + parseFloat(row.granos) || 0, 0);
        const totalEmbutidos = data.reduce((acc, row) => acc + parseFloat(row.embutidos) || 0, 0);
        const totalHuevos = data.reduce((acc, row) => acc + parseFloat(row.huevos) || 0, 0);
        const totalReposteria = data.reduce((acc, row) => acc + parseFloat(row.reposteria) || 0, 0);
        const totalProcesados = data.reduce((acc, row) => acc + parseFloat(row.procesados) || 0, 0);
        const totalSalsas = data.reduce((acc, row) => acc + parseFloat(row.salsas) || 0, 0);
        const totalProteina = data.reduce((acc, row) => acc + parseFloat(row.proteina) || 0, 0);
        const totalJugos = data.reduce((acc, row) => acc + parseFloat(row.jugos) || 0, 0);
        const totalCarbohidratos = data.reduce((acc, row) => acc + parseFloat(row.carbohidratos) || 0, 0);
        const totalFloristeria = data.reduce((acc, row) => acc + parseFloat(row.floristeria) || 0, 0);
        const totalEnlatados = data.reduce((acc, row) => acc + parseFloat(row.enlatados) || 0, 0);
        const totalProteinaKfc = data.reduce((acc, row) => acc + parseFloat(row.proteinakfc) || 0, 0);
        const totalProcesadoKfc = data.reduce((acc, row) => acc + parseFloat(row.procesadokfc) || 0, 0);
        const totalPendingKg = data.reduce((acc, row) => acc + parseFloat(row.pendingKg) || 0, 0);
        const totalKg = data.reduce(
            (acc, row) => acc + calculatePendingKg(parseFloat(row.fruver) || 0, parseFloat(row.lacteos) || 0,
                parseFloat(row.panaderia) || 0, parseFloat(row.granos) || 0, parseFloat(row.embutidos) || 0,
                parseFloat(row.huevos) || 0, parseFloat(row.reposteria) || 0, parseFloat(row.procesados) || 0,
                parseFloat(row.salsas) || 0, parseFloat(row.proteina) || 0, parseFloat(row.jugos) || 0,
                parseFloat(row.carbohidratos) || 0, parseFloat(row.floristeria) || 0,  parseFloat(row.enlatados) || 0,
                parseFloat(row.proteinakfc) || 0, parseFloat(row.procesadokfc) || 0), 0
        );
        return { totalPercentage, totalFruver, totalLacteos, totalPanaderia, totalGranos, totalEmbutidos,
            totalHuevos, totalReposteria , totalProcesados, totalSalsas, totalProteina, totalJugos,
            totalCarbohidratos, totalFloristeria ,totalEnlatados, totalProteinaKfc, totalProcesadoKfc,totalKg, totalPendingKg };
    }, [data,calculatePendingKg]);

    const handleAddRow = () => {
        const newRow = {
            id: data.length + 1, organization: initialOrganization, percentage: 0, fruver: 0, lacteos: 0, panaderia: 0,
            granos: 0, embutidos: 0, huevos: 0, reposteria: 0,  procesados: 0, salsas: 0, proteina: 0, jugos: 0,
            carbohidratos: 0,floristeria: 0, enlatados: 0, proteinakfc: 0, procesadokfc: 0, pendingKg: 0,
          };
        setData((prevData) => [...prevData, newRow]);
    };

    const handleDeleteRow = (id) => {
        setData((prevData) => prevData.filter((row) => row.id !== id));
    };

    // const handleShowRow = (id) => {
    //     data.find((row) => row.id === id);
    //     console.log(data.find((row) => row.id === id));
    // }

    const handleShowRow = (e) => {
        e.preventDefault();
        const id = e.target.closest('tr').dataset.id;
        const selectedRow = data.find((row) => row.id === id);
        console.log(selectedRow);
        router.post('/factura', selectedRow)
    };

    const handleEditRow = (id, organization, percentage, fruver, lacteos, panaderia,
        granos, embutidos, huevos, reposteria, procesados, salsas, proteina, jugos,
        carbohidratos,floristeria, enlatados, proteinakfc, procesadokfc, pendingKg) => {
        setEditingId(id);
        const selectedOrganization = findOrganizationById(organization, id);
        setEditedData((prevState) => ({
            ...prevState, id, organization: selectedOrganization, percentage, fruver, lacteos, panaderia,
            granos, embutidos, huevos, reposteria, procesados, salsas, proteina, jugos,
            carbohidratos,floristeria, enlatados, proteinakfc, procesadokfc, pendingKg,
        }));
    };

    const handleSaveEdit = () => {
        const updatedData = data.map((row) =>
            row.id === editedData.id
                ? {
                    ...row,
                    organization: { id: editedData.organization.id, name: editedData.organization.name },
                    percentage: editedData.percentage,
                    fruver:editedData.fruver,
                    lacteos:editedData.lacteos,
                    panaderia:editedData.panaderia,
                    granos:editedData.granos,
                    embutidos:editedData.embutidos,
                    huevos:editedData.huevos,
                    reposteria:editedData.reposteria,
                    procesados:editedData.procesados,
                    salsas:editedData.salsas,
                    proteina:editedData.proteina,
                    jugos:editedData.jugos,
                    carbohidratos:editedData.carbohidratos,
                    floristeria:editedData.floristeria,
                    enlatados:editedData.enlatados,
                    proteinakfc:editedData.proteinakfc,
                    procesadokfc:editedData.procesadokfc,
                    totalKg: calculatePendingKg(editedData.fruver,
                        editedData.lacteos, editedData.panaderia, editedData.granos,
                        editedData.embutidos, editedData.huevos, editedData.reposteria,
                        editedData.procesados, editedData.salsas, editedData.proteina,
                        editedData.jugos, editedData.carbohidratos,
                        editedData.floristeria, editedData.enlatados,
                        editedData.proteinakfc, editedData.procesadokfc),
                    pendingKg: editedData.pendingKg,
                }
                : row
        );
        setData(updatedData);
        setEditingId(null);
        setEditedData({
            id: null, organization: { id: null, name: '' }, percentage: 0,
            fruver:0, lacteos:0, panaderia:0, granos:0, embutidos:0, huevos:0, reposteria:0,
            procesados:0, salsas:0, proteina:0, jugos:0, carbohidratos:0,floristeria: 0, enlatados:0,
            proteinakfc:0, procesadokfc:0, pendingKg: 0,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({
            id: null, organization: { id: null, name: '' }, percentage: 0,
            fruver:0, lacteos:0, panaderia:0, granos:0, embutidos:0, huevos:0, reposteria:0,
            procesados:0, salsas:0, proteina:0, jugos:0, carbohidratos:0,floristeria: 0, enlatados:0,
            proteinakfc:0, procesadokfc:0, pendingKg: 0,
        });
    };

    const handleSaveAll = () => {
        // Calcular Kg Pendientes antes de guardar
        const dataToSave = data.map((row) => ({
            organization: row.organization.id,
            percentage: row.percentage,
            fruver: row.fruver,
            lacteos: row.lacteos,
            panaderia: row.panaderia,
            granos: row.granos,
            embutidos: row.embutidos,
            huevos: row.huevos,
            reposteria: row.reposteria,
            procesados: row.procesados,
            salsas: row.salsas,
            proteina: row.proteina,
            jugos: row.jugos,
            carbohidratos: row.carbohidratos,
            floristeria: row.floristeria,
            enlatados: row.enlatados,
            proteinakfc: row.proteinakfc,
            procesadokfc: row.procesadokfc,
            totalKg: calculatePendingKg(row.fruver,   row.lacteos, row.panaderia, row.granos,
                row.embutidos, row.huevos, row.reposteria, row.procesados, row.salsas,
                row.proteina, row.jugos, row.carbohidratos, row.floristeria , row.enlatados, row.proteinakfc,
                row.procesadokfc),
            pendingKg: row.pendingKg,
        }));
        console.log(dataToSave);
    };

    function handleSubmit(e) {
        e.preventDefault()
            const formData = {
                donors_id: donors_id.id,
                date: date2,
                totals: calculateTotals(),
            };
        router.post('/operations/control', formData)
    }

    const handleRowClick = (id) => {
        const selectedRow = data.find((row) => row.id === id);
        if (!editingId) {
            handleEditRow(
                id,
                selectedRow.organization,
                selectedRow.percentage,
                selectedRow.fruver,
                selectedRow.lacteos,
                selectedRow.panaderia,
                selectedRow.granos,
                selectedRow.embutidos,
                selectedRow.huevos,
                selectedRow.reposteria,
                selectedRow.procesados,
                selectedRow.salsas,
                selectedRow.proteina,
                selectedRow.jugos,
                selectedRow.carbohidratos,
                selectedRow.floristeria,
                selectedRow.enlatados,
                selectedRow.proteinakfc,
                selectedRow.procesadokfc,
                selectedRow.pendingKg
            );
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && editingId) {
            handleSaveEdit();
        } else if (e.key === 'Escape' && editingId) {
            handleCancelEdit();
        }
    };

    const totals = calculateTotals();
    const isEditing = (id) => editingId === id;

    const handleLoadData = async () => {
        try {
            // const url = new URL('http://localhost/bai/public/distribution/load');
            const url = new URL('http://bai.test/distribution/load');
            url.searchParams.append('date', formatDate(selectedDate));
            url.searchParams.append('donors_id', donors_id.id);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            const organizationMap = organization.reduce((acc, org) => {
                acc[org.id] = org;
                return acc;
            }, {});

            const newData = data.estimates.map((estimate, index) => ({
                id: index + 1,
                organization: {
                    id: estimate.organization_id,
                    name: organizationMap[estimate.organization_id]?.name || ''
                },
                percentage: parseFloat(estimate.percentage),
                fruver: 0,
                lacteos: 0,
                panaderia: 0,
                granos: 0,
                embutidos: 0,
                huevos: 0,
                reposteria: 0,
                procesados: 0,
                salsas: 0,
                proteina: 0,
                jugos: 0,
                carbohidratos: 0,
                floristeria: 0,
                enlatados: 0,
                proteinakfc: 0,
                procesadokfc: 0,
                totalKg: 0,
                pendingKg: parseFloat(estimate.kilos_pending),
            }));

            setData(newData);
        } catch (error) {
            console.error('Error al cargar datos:', error.message);
        }
    };

    return (
        <>
            <div>
                <div className="flex flex-row justify-evenly">
                    <Button  size="sm" onClick={handleAddRow} success="true" >
                        <ClientPlusIcon />
                        <span className="inline-block mx-2"> Agregar Donante </span>
                    </Button>
                    <Calendar selectedDate={selectedDate} onChange={handleDateChange}/>
                    <Button  size="sm" onClick={handleLoadData} success="true" >
                        <CompanyIcon />
                        <span className="inline-block mx-2"> Cargar Estimación </span>
                    </Button>
                </div>
                <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
                    <table className="w-full bg-white border border-gray-300" onKeyDown={handleKeyPress}>
                        <thead className="text-sm text-[#ffc42a] bg-[#00553f] uppercase">
                            <TableHead columnNames={columnNames} />
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    isEditing={isEditing(row.id)}
                                    organizations={organization}
                                    onSelectChangeOrganization={onChangeOrganization}
                                    onInputChange={onInputChange}
                                    calculatePendingKg={calculatePendingKg}
                                    handleRowClick={handleRowClick}
                                    handleDeleteRow={handleDeleteRow}
                                    handleShowRow={handleShowRow}
                                    onSubmitShowRow={handleShowRow}
                                    editedData={editedData}
                                />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="px-2 py-2">Totales</td>
                                <td className="px-2 py-2">{totals.totalPercentage}</td>
                                <td className="px-2 py-2">{totals.totalFruver}</td>
                                <td className="px-2 py-2">{totals.totalLacteos}</td>
                                <td className="px-2 py-2">{totals.totalPanaderia}</td>
                                <td className="px-2 py-2">{totals.totalGranos}</td>
                                <td className="px-2 py-2">{totals.totalEmbutidos}</td>
                                <td className="px-2 py-2">{totals.totalHuevos}</td>
                                <td className="px-2 py-2">{totals.totalReposteria}</td>
                                <td className="px-2 py-2">{totals.totalProcesados}</td>
                                <td className="px-2 py-2">{totals.totalSalsas}</td>
                                <td className="px-2 py-2">{totals.totalProteina}</td>
                                <td className="px-2 py-2">{totals.totalJugos}</td>
                                <td className="px-2 py-2">{totals.totalCarbohidratos}</td>
                                <td className="px-2 py-2">{totals.totalFloristeria}</td>
                                <td className="px-2 py-2">{totals.totalEnlatados}</td>
                                <td className="px-2 py-2">{totals.totalProteinaKfc}</td>
                                <td className="px-2 py-2">{totals.totalProcesadoKfc}</td>
                                <td className="px-2 py-2">{totals.totalKg}</td>
                                <td className="px-2 py-2">{totals.totalPendingKg}</td>
                                <td className="px-2 py-2"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="flex flex-row justify-between">
                    <Button size="sm" onClick={handleSaveAll}>
                        <SecurityIcon/>
                        <span className="inline-block mx-2"> Guardar </span>
                    </Button>
                    <form onSubmit={handleSubmit}>
                        <button type="submit" className="flex flex-row items-center justify-center p-1 my-2 text-white bg-gray-400 rounded-xl font-title ">
                            <CheckCircleIcon/> Control</button>
                    </form>
                </div>
            </div>
        </>
    );
}
