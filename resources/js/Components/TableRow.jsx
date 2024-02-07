import {Button} from "@/Components/Button.jsx";
import {DeleteIcon} from "@/Components/Icons/DeleteIcon.jsx";
import {EyeOpenIcon} from "@/Components/Icons/EyeOpenIcon.jsx";

export function TableRow({ row, isEditing, onSelectChangeOrganization, onInputChange, handleRowClick, handleDeleteRow,handleShowRow,onSubmitShowRow, organizations,editedData,calculatePendingKg}) {

    const { id, organization, percentage, fruver, lacteos, panaderia,
        granos, embutidos, huevos, reposteria, procesados, salsas, proteina, jugos,
        carbohidratos, floristeria,enlatados, proteinakfc, procesadokfc, pendingKg } = row;

    return (
        <>
            <tr onClick={() => handleRowClick(id)} data-id={id} className={`${isEditing ? 'bg-gray-200' : ''} cursor-pointer`} >
                <td className="w-3 px-2 py-2 border-b">
                    {isEditing ? (
                        <select
                            id="organizationSelect"
                            value={editedData.organization.id}
                            onChange={onSelectChangeOrganization}
                        >
                            <option value="" disabled>
                                Donante
                            </option>
                            {organizations.map((org) => (
                                <option key={org.id} value={org.id}>
                                    {org.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        organization.name
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="percentageInput"
                            name="percentage"
                            type="number"
                            value={editedData.percentage}
                            onChange={onInputChange}
                        />
                    ) : (
                        percentage
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="fruverInput"
                            name="fruver"
                            type="number"
                            value={editedData.fruver}
                            onChange={onInputChange}
                        />
                    ) : (
                        fruver
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="lacteosInput"
                            name="lacteos"
                            type="number"
                            value={editedData.lacteos}
                            onChange={onInputChange}
                        />
                    ) : (
                        lacteos
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="panaderiaInput"
                            name="panaderia"
                            type="number"
                            value={editedData.panaderia}
                            onChange={onInputChange}
                        />
                    ) : (
                        panaderia
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="granosInput"
                            name="granos"
                            type="number"
                            value={editedData.granos}
                            onChange={onInputChange}
                        />
                    ) : (
                        granos
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="embutidosInput"
                            name="embutidos"
                            type="number"
                            value={editedData.embutidos}
                            onChange={onInputChange}
                        />
                    ) : (
                        embutidos
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="huevosInput"
                            name="huevos"
                            type="number"
                            value={editedData.huevos}
                            onChange={onInputChange}
                        />
                    ) : (
                        huevos
                    )}
                </td>

                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="reposteriaInput"
                            name="reposteria"
                            type="number"
                            value={editedData.reposteria}
                            onChange={onInputChange}
                        />
                    ) : (
                        reposteria
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="procesadosInput"
                            name="procesados"
                            type="number"
                            value={editedData.procesados}
                            onChange={onInputChange}
                        />
                    ) : (
                        procesados
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="salsasInput"
                            name="salsas"
                            type="number"
                            value={editedData.salsas}
                            onChange={onInputChange}
                        />
                    ) : (
                        salsas
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="proteinaInput"
                            name="proteina"
                            type="number"
                            value={editedData.proteina}
                            onChange={onInputChange}
                        />
                    ) : (
                        proteina
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="jugosInput"
                            name="jugos"
                            type="number"
                            value={editedData.jugos}
                            onChange={onInputChange}
                        />
                    ) : (
                        jugos
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="carbohidratosInput"
                            name="carbohidratos"
                            type="number"
                            value={editedData.carbohidratos}
                            onChange={onInputChange}
                        />
                    ) : (
                        carbohidratos
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="floristeriaInput"
                            name="floristeria"
                            type="number"
                            value={editedData.floristeria}
                            onChange={onInputChange}
                        />
                    ) : (
                        floristeria
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="enlatadosInput"
                            name="enlatados"
                            type="number"
                            value={editedData.enlatados}
                            onChange={onInputChange}
                        />
                    ) : (
                        enlatados
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="proteinakfcInput"
                            name="proteinakfc"
                            type="number"
                            value={editedData.proteinakfc}
                            onChange={onInputChange}
                        />
                    ) : (
                        proteinakfc
                    )}
                </td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="procesadokfcInput"
                            name="procesadokfc"
                            type="number"
                            value={editedData.procesadokfc}
                            onChange={onInputChange}
                        />
                    ) : (
                        procesadokfc
                    )}
                </td>
                <td className="px-2 py-2 border-b">{ calculatePendingKg(fruver, lacteos,panaderia, granos, embutidos, huevos, reposteria, procesados,
                    salsas, proteina, jugos, carbohidratos,floristeria, enlatados, proteinakfc, procesadokfc)}</td>
                <td className="px-2 py-2 border-b">
                    {isEditing ? (
                        <input className='w-14'
                            id="pendingKgKgInput"
                            name="pendingKg"
                            type="number"
                            value={editedData.pendingKg}
                            onChange={onInputChange}
                        />
                    ) : (
                        pendingKg
                    )}
                </td>
                <td className="px-2 py-2 border-b" >
                    {isEditing ? (
                        <> </>
                    ) : (
                        <div className='flex flex-row justify-around' >
                            <Button  size="sm" onClick={() => handleDeleteRow(id)} danger="true" >
                                <DeleteIcon />
                            </Button>
                            {/* <Button size="sm" onClick={() => handleShowRow(id)} >
                                <EyeOpenIcon />
                            </Button> */}
                            <form onSubmit={() => handleShowRow(id)}>
                                <Button size="sm" type="submit">
                                    <EyeOpenIcon />
                                </Button>
                            </form>
                        </div>
                    )}
                </td>
            </tr>
        </>
    )
}
