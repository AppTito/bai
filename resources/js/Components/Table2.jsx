import { useCallback, useState } from 'react';
import {Calendar} from "@/Components/Calendar.jsx";
import useDateUtils from "@/hooks/useDateUtils.js";
import {TableHead} from "@/Components/TableHead.jsx";
import {TableRow} from "@/Components/TableRow.jsx";
import {CompanyIcon} from "@/Components/Icons/CompanyIcon.jsx";
import {Button} from "@/Components/Button.jsx";
import {ClientPlusIcon} from "@/Components/Icons/ClientPlusIcon.jsx";
import {CheckCircleIcon} from "@/Components/Icons/CheckCircleIcon.jsx";

import { router } from '@inertiajs/react'
export function Table({ organization,donors_id ,date2 ,category }) {

    const initialOrganization = { id: '', name: 'Seleccione un Donante' };
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { formatDate } = useDateUtils();

    const categoryNames = category.map((cat) => ({
        [`${cat.category}`]:  cat.category.toLowerCase().replace(/,/g, "").replace(/y/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, ""),
        [cat.category.toLowerCase().replace(/,/g, "").replace(/y/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "")]:0,
    }));

    const firstOtherNames = [ { Organización: "organization" }, { "Porcentaje (%)": "percentage" }, ];
    const lastOtherNames = [ { Total: "totalKg" }, { "Kg Pendientes": "pendingKg" }, { Nota: "nota" }, ];
    const categoryData = categoryNames.reduce((acc, cat) => ({ ...acc, [Object.keys(cat)[1]]: 0 }), {});

    const [data, setData] = useState([
        { id: 1, organization: initialOrganization, percentage: 0,...categoryData, pendingKg: 0 }
    ]);

    const [editedData, setEditedData] = useState({
        id: null, organization: { id: null, name: '' }, percentage: 0, ...categoryData, pendingKg: 0,
    });

    const [ sendData , setSendData] = useState([
        { date: formatDate(selectedDate) },
        { donors_id: donors_id.id}
    ]);
    const [editingId, setEditingId] = useState(true);

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

    function onInputChange(event) {
        const targetId = event.target.id;
        const newValue = parseFloat(event.target.innerText) || 0;
        const idRow = parseFloat(event.target.closest('tr').dataset.id)-1;
        const row = data.find((row) => row.id) ;
        if (row) {
            setEditedData((prevState) => {
                const newState = { ...prevState };
                newState[idRow][targetId] = newValue;
                return newState;
            });
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSendData("date", formatDate(date));
    };

    const calculatePendingKg = useCallback((fruver, lacteos, panaderia,  granos, embutidos,
        huevos,cereales, reposteria, carbohidratoprocesado, salsaaderezocondimentos, proteinaprocesada, jugosbebidas,
        carbohidrato,floristeria, enlatadosconservas, proteinakfc, alimentoprocesadokfc) => {
        return fruver + lacteos + panaderia + granos + embutidos + huevos + cereales + reposteria + carbohidratoprocesado + salsaaderezocondimentos +
        proteinaprocesada + jugosbebidas + carbohidrato + floristeria + enlatadosconservas + proteinakfc + alimentoprocesadokfc;
    }, []);

    const calculateTotals = useCallback(() => {
        const totalPercentage = data.reduce((acc, row) => acc + parseFloat(row.percentage) || 0, 0);
        const totalFruver = data.reduce((acc, row) => acc + parseFloat(row.fruver) || 0, 0);
        const totalLacteos = data.reduce((acc, row) => acc + parseFloat(row.lacteos) || 0, 0);
        const totalPanaderia = data.reduce((acc, row) => acc + parseFloat(row.panaderia) || 0, 0);
        const totalGranos = data.reduce((acc, row) => acc + parseFloat(row.granos) || 0, 0);
        const totalEmbutidos = data.reduce((acc, row) => acc + parseFloat(row.embutidos) || 0, 0);
        const totalHuevos = data.reduce((acc, row) => acc + parseFloat(row.huevos) || 0, 0);
        const totalCereales = data.reduce((acc, row) => acc + parseFloat(row.cereales) || 0, 0);
        const totalReposteria = data.reduce((acc, row) => acc + parseFloat(row.reposteria) || 0, 0);
        const totalProcesados = data.reduce((acc, row) => acc + parseFloat(row.carbohidratoprocesado) || 0, 0);
        const totalSalsas = data.reduce((acc, row) => acc + parseFloat(row.salsaaderezocondimentos) || 0, 0);
        const totalProteina = data.reduce((acc, row) => acc + parseFloat(row.proteinaprocesada) || 0, 0);
        const totalJugos = data.reduce((acc, row) => acc + parseFloat(row.jugosbebidas) || 0, 0);
        const totalCarbohidratos = data.reduce((acc, row) => acc + parseFloat(row.carbohidrato) || 0, 0);
        const totalFloristeria = data.reduce((acc, row) => acc + parseFloat(row.floristeria) || 0, 0);
        const totalEnlatados = data.reduce((acc, row) => acc + parseFloat(row.enlatadosconservas) || 0, 0);
        const totalProteinaKfc = data.reduce((acc, row) => acc + parseFloat(row.proteinakfc) || 0, 0);
        const totalProcesadoKfc = data.reduce((acc, row) => acc + parseFloat(row.alimentoprocesadokfc) || 0, 0);
        const totalPendingKg = data.reduce((acc, row) => acc + parseFloat(row.pendingKg) || 0, 0);
        const totalKg = data.reduce(
            (acc, row) => acc + calculatePendingKg(parseFloat(row.fruver) || 0, parseFloat(row.lacteos) || 0,
                parseFloat(row.panaderia) || 0, parseFloat(row.granos) || 0, parseFloat(row.embutidos) || 0,
                parseFloat(row.huevos) || 0,parseFloat(row.cereales) || 0, parseFloat(row.reposteria) || 0, parseFloat(row.carbohidratoprocesado) || 0,
                parseFloat(row.salsaaderezocondimentos) || 0, parseFloat(row.proteinaprocesada) || 0, parseFloat(row.jugosbebidas) || 0,
                parseFloat(row.carbohidrato) || 0, parseFloat(row.floristeria) || 0,  parseFloat(row.enlatadosconservas) || 0,
                parseFloat(row.proteinakfc) || 0, parseFloat(row.alimentoprocesadokfc) || 0), 0
        );
        return { totalPercentage, totalFruver, totalLacteos, totalPanaderia, totalGranos, totalEmbutidos,
            totalHuevos,totalCereales, totalReposteria , totalProcesados, totalSalsas, totalProteina, totalJugos,
            totalCarbohidratos, totalFloristeria ,totalEnlatados, totalProteinaKfc, totalProcesadoKfc,totalKg, totalPendingKg };
    }, [data,calculatePendingKg]);

    const handleAddRow = () => {
        const newRow = {
            id: data.length + 1, organization: initialOrganization, percentage: 0, ...categoryData, pendingKg: 0,
        };
        setData((prevData) => [...prevData, newRow]);
        setEditedData((prevData) => [...prevData, newRow]);
    };

    const handleDeleteRow = (id) => {
        setData((prevData) => prevData.filter((row) => row.id !== id));
    };

    const handleSubmit2 = (e,id) => {
        e.preventDefault();
        const selectedRow = data.find((row) => row.id === id);
        router.post('/factura', selectedRow);
    }

    function handleSubmit(e) {
        e.preventDefault()
            const formData = {
                donors_id: donors_id.id,
                date: date2,
                totals: calculateTotals(),
            };
            console.log("formData",formData);
        // router.post('/operations/control', formData)
    }

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
                ...categoryData,
                totalKg: 0,
                pendingKg: parseFloat(estimate.kilos_pending),
            }));

            setData(newData);
            setEditedData(newData);
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
                    <table className="w-full bg-white border border-gray-300">
                        <thead className="text-sm text-[#ffc42a] bg-[#00553f] uppercase">
                            <TableHead firstOtherNames={firstOtherNames} categoryNames={categoryNames} lastOtherNames={lastOtherNames} />
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
                                    handleDeleteRow={handleDeleteRow}
                                    handleSubmit2={handleSubmit2}
                                    editedData={editedData}
                                    setEditedData={setEditedData}
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
                                <td className="px-2 py-2">{totals.totalCereales}</td>
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
                    <form onSubmit={handleSubmit}>
                        <button type="submit" className="flex flex-row items-center justify-center p-1 my-2 text-white bg-gray-400 rounded-xl font-title ">
                            <CheckCircleIcon/> Control</button>
                    </form>
                </div>
            </div>
        </>
    );
}
