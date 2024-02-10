import { useCallback, useState } from 'react';
import {Calendar} from "@/Components/Calendar.jsx";
import useDateUtils from "@/hooks/useDateUtils.js";
import {TableHead} from "@/Components/TableHead.jsx";
import {TableRow} from "@/Components/TableRow.jsx";
import {CompanyIcon} from "@/Components/Icons/CompanyIcon.jsx";
import {Button} from "@/Components/Button.jsx";
import {ClientPlusIcon} from "@/Components/Icons/ClientPlusIcon.jsx";
import {CheckCircleIcon} from "@/Components/Icons/CheckCircleIcon.jsx";
import {SecurityIcon} from "@/Components/Icons/SecurityIcon.jsx";
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

    const [pesoGavetas, setPesoGavetas] = useState("");
    const [pesoProcesado, setPesoProcesado] = useState("");
    const [pesoTotal, setPesoTotal] = useState("");
    const [totalKg, setTotalKg] = useState(0);
    const [displayTotalKg, setDisplayTotalKg] = useState(0);

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

    const findOrganizationById = useCallback((orgArray, id) => {
        if (Array.isArray(orgArray)) {
            return orgArray.find((org) => org.id === id) || { id: null, name: '' };
        } else {
            return orgArray || { id: null, name: '' };
        }
    }, []);

    const onChangeOrganization = useCallback((e,rowId) => {
        const selectedOrganization = findOrganizationById(organization, Number(e.target.value));
        const id = rowId-1;

        setEditedData(prevState =>  ({
            ...prevState, [id ]: { ...prevState[id], organization: { id: selectedOrganization.id, name: selectedOrganization.name } }, }));

        setData(prevData => {
            const newData = [...prevData];
            newData[id].organization = { id: selectedOrganization.id, name: selectedOrganization.name };
            return newData;
        });
    }, [findOrganizationById, organization]);

    function onInputChange(event) {
        const targetId = event.target.id;
        const newValue = parseFloat(event.target.innerText) || 0;
        const idRow = parseFloat(event.target.closest('tr').dataset.id)-1;

        setEditedData((prevState) => {
            const newState = { ...prevState };
            if (!newState[idRow]) {
                newState[idRow] = { ...categoryData };
            }
            newState[idRow][targetId] = newValue;
            return newState;
        });

        setData((prevData) => {
            const newData = [...prevData];
            if (!newData[idRow]) {
                newData[idRow] = { ...categoryData };
            }
            newData[idRow][targetId] = newValue;
            return newData;
        });
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSendData("date", formatDate(date));
    };

    const calculatePendingKg = useCallback((...values) => {
        return values.reduce((acc, value) => acc + value, 0);
    }, []);

    const calculateTotals = useCallback(() => {
        const totalPercentage = data.reduce((acc, row) => acc + parseFloat(row.percentage) || 0, 0);
        const totalValues = Object.keys(categoryData).map((key) => {
            return data.reduce((acc, row) => acc + row[key] || 0, 0)
        });
        const totalPendingKg = data.reduce((acc, row) => acc + parseFloat(row.pendingKg) ||   0, 0);
        const totalKg = calculatePendingKg(...totalValues);

        if (totalKg > displayTotalKg) {
            setDisplayTotalKg(totalKg);
        }

        return { totalPercentage, totalValues, totalPendingKg, totalKg };
    }, [editedData, calculatePendingKg, displayTotalKg]);

    const handleAddRow = () => {
        const newRow = {
            id: data.length + 1, organization: initialOrganization, percentage: 0, ...categoryData, pendingKg: 0,
        };
        setData((prevData) => [...(Array.isArray(prevData) ? prevData : []), newRow]);

        setEditedData((prevData) => {
            const newData = Array.isArray(prevData) ? [...prevData] : [];
            newData[newRow.id - 1] = newRow;
            return newData;
        });
    };

    const handleDeleteRow = (id) => {
        setData((prevData) => prevData.filter((row) => row.id !== id));
    };

    const handleSubmit2 = (e,id) => {
        e.preventDefault();
        const selectedRow = data.find((row) => row.id === id);
        console.log("selectedRow",selectedRow);
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
        router.post('/operations/control', formData)
    }

    function handleSubmitSave(e) {
        e.preventDefault()
        
        const formData = {
            donors_id: donors_id.id,
            date: date2,
            totals: calculateTotals(),
            pesoTotal: displayTotalKg,
            pesoRecuperado: pesoProcesado,
            pesoFinal: pesoTotal,
        };
        console.log("formData",formData);
         router.post('/operations/control', formData)
    }

    const totals = calculateTotals();

    const handleLoadData = async () => {
        try {
             const url = new URL('http://localhost/bai/public/distribution/load');
            //const url = new URL('http://bai.test/distribution/load');
            url.searchParams.append('date', formatDate(selectedDate));
            url.searchParams.append('donors_id', donors_id.id);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("data",data);
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
            const totalKg = data.totalKilos;
            setTotalKg(totalKg);
            setDisplayTotalKg(totalKg);

            setData(newData);
            setEditedData(newData);
        } catch (error) {
            console.error('Error al cargar datos:', error.message);
        }
    };

    const handlePesoProcesadoChange = (event) => {
        const value = parseFloat(event.target.value);
        if (value > displayTotalKg) {
            alert("Peso Recuperado no puede ser mayor que Peso Total");
            return;
        }
        setPesoProcesado(value);
        const total = displayTotalKg - value;
        setPesoTotal(isNaN(total) ? "" : total);
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
                <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-peso-total" >
                            Peso Total
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-peso-total" type="number" placeholder="Peso Total"  min={0} value={displayTotalKg}
                            readOnly />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-peso-recuperado"  >
                            Peso Recuperado
                        </label>
                        <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                            rounded py-3 px-4 leading-tight " id="grid-peso-recuperado"  type="number"
                            placeholder="Peso Recuperado" min={0}  contentEditable={false} value={pesoProcesado}
                            onChange={handlePesoProcesadoChange} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-peso-final" >
                            Peso Final
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                            rounded py-3 px-4 leading-tight" id="grid-peso-final" type="number"
                            placeholder="Peso Final"  min={0} contentEditable={false} value={pesoTotal} readOnly />
                    </div>
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
                                <td className="-2 py-">{totals.totalPercentage}</td>
                                {totals.totalValues.map((total, index) => (
                                    <td key={index} className="px-2 py-2">{total}</td>
                                ))}
                                <td className="px-2 py-2">{totals.totalKg}</td>
                                <td className="px-2 py-2">{totals.totalPendingKg}</td>
                                <td className="px-2 py-2"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="flex flex-row justify-between">
                    <Button size="sm" onClick={handleSubmitSave}>
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
