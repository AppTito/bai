import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
/* Nuevos componentes */
import AlterResponsiveNavLink from "@/Components/AlterResponsiveNavLink";
import AlterNavLink from "@/Components/AlterNavLink";
import LineSlideBar from "@/Components/LineSlideBar"; // Linea Horizontal Divisoria
import { Icon } from "@iconify/react";
import TitleLineSlideBar from "@/Components/TitleLineSlideBar";

export default function Authenticated({ user, header, children }) {
    const { hasPermission, hasRole } = usePermissions();
    const [showDropdown, setShowDropdown] = useState();

    return (

        <div className="flex h-screen bg-gray-200">
            {/* Barra lateral izquierda */}
            <div
                className={`flex flex-col flex-shrink-0 text-gray-700 bg-green-800 dark-mode:text-gray-200 dark-mode:bg-gray-800 transition-width duration-300 ease-in-out`}
                style={{ width: "11rem" }}
            >
                <div className="flex flex-row items-center flex-shrink-0 py-4 m-4">
                    <Link href={route("dashboard")}>
                        <div className="flex items-center">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 rounded-full" />
                            <span className="ml-2 decoration-inherit font-semibold text-white">
                                BADI
                            </span>

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

                                {
                                    (hasRole('super-admin') || hasPermission('user-list')) && (
                                        <NavLink href={route('users.index')} active={route().current('users.index')}>
                                            Users
                                        </NavLink>
                                    )
                                }

                                {
                                    (hasRole('super-admin') || hasPermission('role-list')) && (
                                        <NavLink href={route('roles.index')} active={route().current('roles.index')}>
                                            Roles
                                        </NavLink>
                                    )
                                }

                                {
                                    (hasRole('super-admin') || hasPermission('permission-list')) && (
                                        <NavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                                            Permissions
                                        </NavLink>
                                    )
                                }

                                {
                                    (hasRole('super-admin')  || hasRole('admin') || hasPermission('permission-list')) && (
                                        <NavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                                            Categories
                                        </NavLink>
                                    )
                                }

                                {
                                    (hasRole('super-admin') || hasPermission('donor-list')) && (
                                        <NavLink href={route('donors.index')} active={route().current('donors.index')}>
                                            Donors
                                        </NavLink>
                                    )
                                }

                            </div>
                        </div>
                    </Link>
                </div>
                <LineSlideBar />
                <TitleLineSlideBar>Menú</TitleLineSlideBar>
                
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 border-green-600">
                        <ul className="space-y-2">
                            <NavLink
                                className="w-full"
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                <Icon icon="mdi:home" />
                                Dashboard
                            </NavLink>

                            {(hasRole("super-admin") ||
                                hasPermission("permission-list")) && (
                                <li className="relative group">
                                    <button
                                        className={`w-full flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
                                            rounded-md focus:shadow-outline text-gree hover:text-orange-700 hover:bg-orange-100 focus:text-orange-800 focus:bg-orange-200
                                            ${
                                                showDropdown
                                                    ? "text-green-700 bg-indigo-100 border-l-4 border-green-500 focus:text-green-700 focus:bg-indigo-100 focus:border-green-500"
                                                    : "text-gray-600 hover:text-gray-800 hover:bg-green-100"
                                            }`}
                                        onClick={() =>
                                            setShowDropdown(!showDropdown)
                                        }
                                    >
                                        <span className="flex items-center w-full text-orange-50">
                                            <Icon icon="mdi:account-group" />
                                            <span className="ml-1 hover:text-orange-700">
                                                Administrar
                                            </span>
                                        </span>
                                        <svg
                                            className={`${
                                                showDropdown
                                                    ? "transform rotate-180"
                                                    : ""
                                            } w-5 h-5 ml-1 text-white group-hover:text-gray-600 transition-transform duration-150 ease-in-out`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6 8l4 4 4-4"
                                            />
                                        </svg>
                                    </button>

                                    {showDropdown && (
                                        <ul className="space-y-2 ml-4 absolute z-10 bg-white p-2 border border-gray-300 rounded">
                                            {(hasRole("super-admin") ||
                                                hasPermission("user-list")) && (
                                                <AlterNavLink
                                                    className="w-full"
                                                    href={route("users.index")}
                                                    active={route().current(
                                                        "users.index"
                                                    )}
                                                >
                                                    Users
                                                </AlterNavLink>
                                            )}
                                            {(hasRole("super-admin") ||
                                                hasPermission("role-list")) && (
                                                <AlterNavLink
                                                    className="w-full"
                                                    href={route("roles.index")}
                                                    active={route().current(
                                                        "roles.index"
                                                    )}
                                                >
                                                    Roles
                                                </AlterNavLink>
                                            )}

                                            {(hasRole("super-admin") ||
                                                hasPermission(
                                                    "permission-list"
                                                )) && (
                                                <AlterNavLink
                                                    className="w-full"
                                                    href={route(
                                                        "permissions.index"
                                                    )}
                                                    active={route().current(
                                                        "permissions.index"
                                                    )}
                                                >
                                                    Permissions
                                                </AlterNavLink>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            )}
                            <LineSlideBar />
                            <TitleLineSlideBar>
                                Administración
                            </TitleLineSlideBar>
                            {(hasRole("super-admin") ||
                                hasPermission("permission-list")) && (
                                <NavLink
                                    className="w-full"
                                    href={route("categories.index")}
                                    active={route().current("categories.index")}
                                >
                                    <Icon icon="mdi:category" />
                                    Categorias
                                </NavLink>
                            )}
                        </ul>
                    </nav>
                    <LineSlideBar />
                    <div className="flex-shrink-0 px-2 py-4 space-y-2">
                        <AlterResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="w-full btn btn-red flex items-center"
                        >
                            <span className="flex items-center">
                                <Icon icon="mdi:logout" className="mr-1" />
                                Cerrar Sesión
                            </span>
                        </AlterResponsiveNavLink>
                    </div>
                </div>
            </div>

            {/* Área principal de contenido */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Encabezado superior */}
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-green-600">
                    <span>
                        <label className="text-xl font-semibold text-green-800">
                            Banco de Alimentos Imbabura
                        </label>
                    </span>
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        {
                            (hasRole('super-admin') || hasPermission('user-list')) && (
                                <ResponsiveNavLink href={route('roles.index')} active={route().current('roles.index')}>
                                    Users
                                </ResponsiveNavLink>
                            )
                        }
                        {
                            (hasRole('super-admin') || hasPermission('role-list')) && (
                                <ResponsiveNavLink href={route('users.index')} active={route().current('users.index')}>
                                    Roles
                                </ResponsiveNavLink>
                            )
                        }
                        {
                            (hasRole('super-admin') || hasPermission('permission-list')) && (
                                <ResponsiveNavLink href={route('permissions.index')} active={route().current('permissions.index')}>
                                    Permissions
                                </ResponsiveNavLink>
                            )
                        }
                        {
                            (hasRole('super-admin') || hasPermission('donor-list')) && (
                                <ResponsiveNavLink href={route('donors.index')} active={route().current('donors.index')}>
                                    Donors
                                </ResponsiveNavLink>
                            )
                        }
                    </div>

                    {/* Menú desplegable de usuario */}
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex text-sm border-2 border-transparent focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                        <span className="ml-2 text-gray-700 text-sm font-medium">
                                            {user.name}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <div className="block px-4 py-2 text-xs text-gray-400">
                                        Administrar Cuenta
                                    </div>

                                    <div className="border-t border-gray-100"></div>

                                    <div className="mt-3 space-y-1">
                                        <ResponsiveNavLink
                                            href={route("profile.edit")}
                                        >
                                            Perfil
                                        </ResponsiveNavLink>

                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                            as="button"
                                        >
                                            Cerrar Sesion
                                        </ResponsiveNavLink>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Encabezado secundario (si es necesario) */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Contenido principal */}
                <main className="flex-grow overflow-x-hidden overflow-y-auto bg-gray-200">
                    {children}
                </main>
            </div>
        </div>
        
    );
}
