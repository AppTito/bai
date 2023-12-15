import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import {usePermissions} from "@/hooks/usePermissions.js";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { hasPermission, hasRole } = usePermissions()

    return (
        //menu lateral interactivo
            <div className="flex h-screen bg-gray-200">
                <div className="flex flex-col flex-shrink-0 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800" style={{ width: "250px" }}>
                    <div className="flex flex-col items-center flex-shrink-0 py-4">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 rounded-full" />
                        </Link>
                    </div>
                    <div className="flex flex-col justify-between flex-1 h-0 overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 bg-white dark:bg-gray-800">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                            {/* Super-admin */}
                            {(hasRole('super-admin') || hasPermission('user-list')) && (
                                <NavLink href={route('users.index')} active={route().current('users.index')}>
                                    Users
                                </NavLink>
                            )}
                            {(hasRole('super-admin') || hasPermission('role-list')) && (
                                <NavLink href={route('roles.index')} active={route().current('roles.index')}>
                                    Roles
                                </NavLink>
                            )}

                            {(hasRole('super-admin') || hasPermission('permission-list')) && (
                                <NavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                                    Permissions
                                </NavLink>
                            )}
                            {/* SuperAdmin y Admin */}
                            {(hasRole('super-admin') || hasPermission('permission-list')) && (
                                <NavLink href={route('categories.index')} active={route().current('categories.index')}>
                                    Categorias
                                </NavLink>
                            )}
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
                        <div className="flex items-center">
                            <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}

                                className="text-gray-500 focus:outline-none lg:hidden">
                                <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"

                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>
                            <div className="relative mx-4 lg:mx-0">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">

                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"

                                            stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </span>
                                <input type="text" className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"

                                    placeholder="Search" />
                            </div>
                        </div>
                        
                        </header>
                        </div>
            
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 rounded-full" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                    {/* Super-admin */}
                                    {(hasRole('super-admin') || hasPermission('user-list')) && (
                                        <NavLink href={route('users.index')} active={route().current('users.index')}>
                                            Users
                                        </NavLink>
                                    )}
                                    {(hasRole('super-admin') || hasPermission('role-list')) && (
                                        <NavLink href={route('roles.index')} active={route().current('roles.index')}>
                                            Roles
                                        </NavLink>
                                    )}
                                    {(hasRole('super-admin') || hasPermission('permission-list')) && (
                                        <NavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                                            Permissions
                                        </NavLink>
                                    )}
                                    {/* SuperAdmin y Admin */}
                                    {(hasRole('super-admin') || hasRole('admin') || hasPermission('permission-list')) && (
                                        <NavLink href={route('categories.index')} active={route().current('categories.index')}>
                                            Categorias
                                        </NavLink>
                                    )}


                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            {(hasRole('super-admin') || hasPermission('user-list')) && (
                                <ResponsiveNavLink href={route('roles.index')} active={route().current('roles.index')}>
                                    Users
                                </ResponsiveNavLink>
                            )}
                            {(hasRole('super-admin') || hasPermission('role-list')) && (
                                <ResponsiveNavLink href={route('users.index')} active={route().current('users.index')}>
                                    Roles
                                </ResponsiveNavLink>
                            )}
                            {(hasRole('super-admin') || hasPermission('permission-list')) && (
                                <ResponsiveNavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                                    Permissions
                                </ResponsiveNavLink>
                            )}
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-red-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}

