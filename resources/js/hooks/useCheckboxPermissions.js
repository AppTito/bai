// En useCheckboxPermissions.js
import { useState } from 'react';

export function useCheckboxPermissions(initialPermissions) {
    const [selectedPermissions, setSelectedPermissions] = useState(initialPermissions);

    const handleCheckboxChange = (event, setData) => {
        const { value } = event.target;
        setSelectedPermissions((prevPermissions) => {
            const numValue = Number(value);
            const updatedPermissions = prevPermissions.includes(numValue)
                ? prevPermissions.filter((id) => id !== numValue)
                : [...prevPermissions, numValue];
            setData('permissions', updatedPermissions);
            return updatedPermissions;
        });
    };

    return { selectedPermissions, handleCheckboxChange,setSelectedPermissions };
}


