import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none 
                        ${active
                            ? 'text-indigo-700 bg-indigo-100 border-l-4 border-indigo-500'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-green-100'
                        } ${className}`}
        >
            {children}
        </Link>
    );
}
