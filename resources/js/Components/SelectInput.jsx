import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ className = '', isFocused = false, options = [], optionD, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select {...props} ref={input} className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ' +
            'rounded-md shadow-sm ' + className}>
            <option value="">Seleccione { optionD}</option>
            {options.map((option) =>
                <option key={option}>{option}</option>
            )}
        </select>
    );
});
