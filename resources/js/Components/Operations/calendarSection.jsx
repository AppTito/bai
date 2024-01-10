import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarSection = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="mb-6">
            <label className="block text-green-700 text-sm font-bold mb-2">
                Seleccione una fecha
            </label>
            <DatePicker
                showIcon={true}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full p-2 border rounded border-gray-300 text-center"
                isClearable
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccione una fecha"
                withPortal
            />
        </div>
    );
};

export default CalendarSection;
