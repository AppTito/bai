import { Link } from '@inertiajs/react';

export default function AlterNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
                        border rounded-md focus:shadow-outline text-green-700 hover:text-orange-700 hover:bg-orange-100 focus:text-orange-800 focus:bg-orange-200
                        ${active
                            ? 'text-indigo-700 bg-indigo-100 border-l-4 border-indigo-500 focus:text-indigo-800 focus:bg-indigo-200'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-green-100 focus:text-gray-800 focus:bg-gray-200'
                        } ${className}`}
        >
            {children}
        </Link>
    );
}
