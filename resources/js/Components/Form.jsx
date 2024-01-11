import React from "react";
import { MultiSelect } from 'primereact/multiselect';
import { useForm } from '@inertiajs/react';

export default function Form({ fields, onSubmit, initialValues }) {
    const { data, setData, post, put, errors } = useForm(initialValues);

    const handleChange = (e) => {
        const { name, value, type, options } = e.target;
        const newValue = type === 'select-multiple' ? Array.from(options).filter((option) => option.selected).map((option) => option.value) : value;

        setData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleMultiSelectChange = (name, value) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEditMode = initialValues && initialValues.id;
        if (isEditMode) {
            put(route(onSubmit, initialValues.id));
        } else {
            post(route(onSubmit));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                    </label>
                    {field.type === 'password' ? (
                        <input type="password" id={field.name} name={field.name} value={data[field.name] || ''}
                               onChange={handleChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md
                            shadow-sm focus:outline-none focus:ring focus:border-blue-300"  />
                    ) : field.type === 'select' ? (
                        <div>
                            {field.isMultiple ? (
                                <div className="card flex justify-content-center">
                                    <MultiSelect id={field.name} name={field.name} value={data[field.name] || null}
                                        options={field.options.data} display="chip" optionLabel="label"
                                        onChange={(e) => handleMultiSelectChange(field.name, e.value)}
                                        placeholder={`Seleccione ${field.label}`} className="w-full md:w-20rem mt-1 p-2"
                                        pt={{
                                            label: 'block text-sm font-medium text-itemSA',
                                            header: 'p-3 text-gray-700  bg-gray-300  rounded-t-lg',
                                            item: 'p-2 text-gray-700  bg-gray-300 hover:bg-itemSA hover:text-primary',
                                            selectedItemsWrapper: 'flex flex-wrap ', checkbox: 'mr-2 ',
                                            token: 'py-1 px-2 mr-2 bg-itemSA text-primary m-1 rounded-full' ,
                                            tokenLabel: 'p-1 ',
                                        }}
                                    />
                                </div>
                            ) : (
                                <select id={field.name} name={field.name} value={data[field.name] || ''}
                                        onChange={handleChange} className="mt-1 block w-full p-2 border-gray-300
                                        rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" >
                                        <option value="">Seleccione {field.label}</option>
                                        {field.options.data.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <span className="text-red-600">{errors[field.name]}</span>
                            </div>
                    ) : (
                        <input type={field.type || 'text'} id={field.name} name={field.name}
                            value={data[field.name] || ''} onChange={handleChange}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none
                            focus:ring focus:border-blue-300" />
                    )}
                    <span className="text-red-600">{errors[field.name]}</span>
                </div>
            ))}
            <div className="mt-4">
                <button type="submit" className="px-6 py-2 font-bold text-white bg-green-500 rounded" >
                    Guardar
                </button>
            </div>
        </form>
    );
}
