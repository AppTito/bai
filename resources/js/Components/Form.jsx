import { useForm } from '@inertiajs/react';

export default function Form({ fields, onSubmit, initialValues }) {
    const { data, setData, post, put, errors } = useForm(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
                        <select id={field.name} name={field.name} value={data[field.name] || ''} onChange={handleChange}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none
                            focus:ring focus:border-blue-300" >
                            <option value="">Seleccione Rol</option>
                            {field.options.data.map((option) => (
                                <option key={option.value} value={option.value} >
                                    {option.label}
                                </option>
                            ))}
                        </select>
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

