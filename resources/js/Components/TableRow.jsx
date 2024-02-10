import {Button} from "@/Components/Button.jsx";
import {DeleteIcon} from "@/Components/Icons/DeleteIcon.jsx";
import {EyeOpenIcon} from "@/Components/Icons/EyeOpenIcon.jsx";

const renderEditableCell = ({ id, name, value, onChange, editedData }) => (
    <div key={id} className="px-2 py-2 border-b">
        <div id={name} name={name} contentEditable={true} suppressContentEditableWarning={true} onBlur={onChange} value={editedData[name]} >
            {value}
        </div>
    </div>
);

export function TableRow({ row, onSelectChangeOrganization, onInputChange, handleDeleteRow,handleSubmit2, organizations,editedData,calculatePendingKg }) {

    const { id, organization, percentage, fruver, lacteos, panaderia,  granos, embutidos,
        huevos,cereales, reposteria, carbohidratoprocesado, salsaaderezocondimentos, proteinaprocesada, jugosbebidas,
        carbohidrato,floristeria, enlatadosconservas, proteinakfc, alimentoprocesadokfc, pendingKg } = row;

    const fields = Object.entries(row).filter(([key]) => !['id', 'organization', 'pendingKg','totalKg'].includes(key))
    .map(([key, value]) => ({ id: key, name: key, value }));

    return (
        <tr data-id={id}>
            <td className="w-3 px-2 py-2 border-b">
                <select id={`organization-${id}`}
                        value={organization.id} name="organization" className="w-40 mt-1 block py-1 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                    onChange={(e) => onSelectChangeOrganization(e, id)}  autoComplete="organization">
                    <option value="" disabled> Donante </option>
                    {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                            {org.name}
                        </option>
                    ))}
                </select>
            </td>
            {fields.map((field) => (
                <td key={field.id} className="px-2 py-2 border-b">
                    {renderEditableCell({
                        id: field.id, name: field.name, value: row[field.name],
                        onChange: onInputChange,  editedData,
                    })}
                </td>
            ))}
            <td className="px-2 py-2 border-b">{ calculatePendingKg(fruver, lacteos, panaderia,  granos, embutidos,
                huevos,cereales, reposteria, carbohidratoprocesado, salsaaderezocondimentos, proteinaprocesada, jugosbebidas,
                carbohidrato,floristeria, enlatadosconservas, proteinakfc, alimentoprocesadokfc)}
            </td>
            <td className="px-2 py-2 border-b" >
                <div id="pendingKg" name="pendingKg" contentEditable={true}  suppressContentEditableWarning={true}
                    onBlur={onInputChange} value={editedData.pendingKg} >
                    {pendingKg}
                </div>
            </td>
            <td className="px-2 py-2 border-b">
                <div className="flex flex-row justify-around">
                    <Button size="sm" onClick={() => handleDeleteRow(id)} danger="true">
                    <DeleteIcon />
                    </Button>
                    <form onSubmit={(e) => handleSubmit2(e, id)}>
                        <button type="submit"
                            className="flex flex-row items-center justify-center p-1 my-2 text-white bg-gray-400 rounded-xl font-title" >
                            <EyeOpenIcon />
                        </button>
                    </form>
                </div>
            </td>
        </tr>
    );
}
