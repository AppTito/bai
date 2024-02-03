import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calendar({ selectedDate, onChange }) {
    return (
        <div className="mb-6">
            <label htmlFor="datePicker" className="block text-green-700 text-sm font-bold mb-2">
                Seleccione una fecha
            </label>
            <DatePicker id="datePicker"
                        showIcon={true}
                        selected={selectedDate}
                        onChange={onChange}
                        className="w-full p-2 border rounded border-gray-300 text-center"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Seleccione una fecha"
                        withPortal
            />
        </div>
    )
}
