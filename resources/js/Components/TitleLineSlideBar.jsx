import { Link } from '@inertiajs/react';

export default function TitleLineSlideBar({ active = false, className = '', children, ...props }) {
    return (
        /* Titulo pegado a la izquiera del slide bar */
        <p
            {...props}
            className={`w-full flex items-start ps-2 pe-3  text-white font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </p>
    );
}
