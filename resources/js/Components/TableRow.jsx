import {Button} from "@/Components/Button.jsx";
import {DeleteIcon} from "@/Components/Icons/DeleteIcon.jsx";
import {EyeOpenIcon} from "@/Components/Icons/EyeOpenIcon.jsx";

export function TableRow({ row, isEditing, onSelectChangeOrganization, onInputChange, handleDeleteRow,handleSubmit2, organizations,editedData,calculatePendingKg}) {

    const { id, organization, percentage, fruver, lacteos, panaderia,  granos, embutidos,
        huevos,cereales, reposteria, carbohidratoprocesado, salsaaderezocondimentos, proteinaprocesada, jugosbebidas,
        carbohidrato,floristeria, enlatadosconservas, proteinakfc, alimentoprocesadokfc, pendingKg } = row;

    return (
        <>
            <tr data-id={id} className={` cursor-pointer`} >
                <td className="w-3 px-2 py-2 border-b">
                    {isEditing  ? (
                        <select
                            id="organization"
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
                <td className="px-2 py-2 border-b" >
                    <div id="percentage"
                        name="percentage"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.percentage}
                    >
                        {percentage}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="fruver"
                        name="fruver"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.fruver}
                    >
                        {fruver}
                    </div>
                </td>
                <td className="px-2 py-2 border-b">
                    <div id="lacteos"
                        name="lacteos"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.lacteos}
                    >
                        {lacteos}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="panaderia"
                        name="panaderia"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.panaderia}
                    >
                        {panaderia}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="granos"
                        name="granos"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.granos}
                    >
                        {granos}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="embutidos"
                        name="embutidos"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.embutidos}
                    >
                        {embutidos}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="huevos"
                        name="huevos"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.huevos}
                    >
                        {huevos}
                    </div>
                </td>
                <td className="px-2 py-2 border-b">
                    <div id="cereales"
                        name="cereales"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.cereales}
                    >
                        {cereales}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="reposteria"
                        name="reposteria"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.reposteria}
                    >
                        {reposteria}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="carbohidratoprocesado"
                        name="carbohidratoprocesado"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.carbohidratoprocesado}
                    >
                        {carbohidratoprocesado}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="salsaaderezocondimentos"
                        name="salsaaderezocondimentos"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.salsaaderezocondimentos}
                    >
                        {salsaaderezocondimentos}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="proteinaprocesada"
                        name="proteinaprocesada"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.proteinaprocesada}
                    >
                        {proteinaprocesada}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="jugosbebidas"
                        name="jugosbebidas"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.jugosbebidas}
                    >
                        {jugosbebidas}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="carbohidrato"
                        name="carbohidrato"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.carbohidrato}
                    >
                        {carbohidrato}
                    </div>
                </td>
                <td className="px-2 py-2 border-b">
                    <div id="floristeria"
                        name="floristeria"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.floristeria}
                    >
                        {floristeria}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="enlatadosconservas"
                        name="enlatadosconservas"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.enlatadosconservas}
                    >
                        {enlatadosconservas}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="proteinakfc"
                        name="proteinakfc"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.proteinakfc}
                    >
                        {proteinakfc}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    <div id="alimentoprocesadokfc"
                        name="alimentoprocesadokfc"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.alimentoprocesadokfc}
                    >
                        {alimentoprocesadokfc}
                    </div>
                </td>
                <td className="px-2 py-2 border-b">{ calculatePendingKg(fruver, lacteos, panaderia,  granos, embutidos,
        huevos,cereales, reposteria, carbohidratoprocesado, salsaaderezocondimentos, proteinaprocesada, jugosbebidas,
        carbohidrato,floristeria, enlatadosconservas, proteinakfc, alimentoprocesadokfc)}</td>
                <td className="px-2 py-2 border-b" >
                    <div id="pendingKg"
                        name="pendingKg"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={onInputChange}
                        value={editedData.pendingKg}
                    >
                        {pendingKg}
                    </div>
                </td>
                <td className="px-2 py-2 border-b" >
                    {isEditing ? (
                        <></>
                    ) : (
                        <div className='flex flex-row justify-around' >
                            <Button  size="sm" onClick={() => handleDeleteRow(id)} danger="true" >
                                <DeleteIcon />
                            </Button>
                            <form onSubmit={(e) => handleSubmit2(e, id)}>
                                <button type="submit" className="flex flex-row items-center justify-center p-1 my-2 text-white bg-gray-400 rounded-xl font-title ">
                                    <EyeOpenIcon /> Ver
                                </button>
                            </form>
                        </div>
                    )}
                </td>
            </tr>
        </>
    )
}
