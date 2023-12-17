import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";
import AlterResponsiveNavLink from "@/Components/AlterResponsiveNavLink";
import AlterNavLink from "@/Components/AlterNavLink";
import LineSlideBar from "@/Components/LineSlideBar"; // Linea Horizontal Divisoria
import { Icon } from "@iconify/react";
import TitleLineSlideBar from "@/Components/TitleLineSlideBar";
/* nuevos imports */
import AdminMenu from "@/Components/AdminMenu";

export default function Authenticated({ user, header, children }) {
    const { hasPermission, hasRole } = usePermissions();
    const [showDropdown, setShowDropdown] = useState(false);
    /* nuevos const */
    const [showAdminMenu, setShowAdminMenu] = useState();

    const handleAdminMenuClick = () => {
        setShowAdminMenu(!showAdminMenu);
    };

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
                        </div>
                    </Link>
                </div>
                <LineSlideBar />
                <TitleLineSlideBar>Menú</TitleLineSlideBar>

                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 border-green-600">
                        <ul className="space-y-2">
                            <NavLink
                                className="w-full"
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                <Icon icon="mdi:home" className={"mr-2"} />
                                Dashboard
                            </NavLink>

                            {(hasRole("super-admin") ||
                                hasPermission("permission-list")) && (
                                <li className="relative group">
                                    <button
                                        className={`w-full flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
                                            rounded-md focus:shadow-outline text-gree hover:bg-orange-100 focus:text-orange-800 focus:bg-orange-200 text-orange-50  hover:text-orange-700
                                            ${
                                                showAdminMenu
                                                    ? "text-green-700 bg-orange-700 border-l-4 border-green-500 focus:text-green-700 focus:bg-indigo-100 focus:border-green-500"
                                                    : "text-orange-00 hover:text-gray-800 hover:bg-green-100"
                                            }`}
                                        onClick={handleAdminMenuClick}
                                    >
                                        <span className="flex items-center w-full ">
                                            <Icon
                                                icon="mdi:account-group"
                                                className={"mr-2"}
                                            />
                                            <span className="ml-1">
                                                Administrar
                                            </span>
                                        </span>
                                        <svg
                                            className={`${
                                                showAdminMenu
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
                                    {showAdminMenu && (
                                        <AdminMenu
                                            route={route}
                                            hasRole={hasRole}
                                            hasPermission={hasPermission}
                                        />
                                    )}
                                </li>
                            )}
                            <LineSlideBar />
                            <TitleLineSlideBar>
                                Administración
                            </TitleLineSlideBar>

                            {(hasRole("super-admin") ||
                                hasPermission("category-list")) && (
                                <NavLink
                                    className="w-full"
                                    href={route("categories.index")}
                                >
                                    <Icon
                                        icon="mdi:category"
                                        className={"mr-2"}
                                    />
                                    Categorías
                                </NavLink>
                            )}
                            {(hasRole("super-admin") ||
                                hasPermission("organizations-list")) && (
                                <NavLink
                                    href={route("donors.index")}
                                    active={route().current("donors.index")}
                                >
                                    <Icon
                                        icon="streamline:give-gift-solid"
                                        className={"mr-2"}
                                    />
                                    Donantes
                                </NavLink>
                            )}
                            {(hasRole("super-admin") ||
                                hasPermission("organizations-list")) && (
                                <NavLink
                                    href={route("organizations.index")}
                                    active={route().current(
                                        "organizations.index"
                                    )}
                                >
                                    <Icon
                                        icon="mdi:building"
                                        className={"mr-2"}
                                    />

                            {(hasRole("super-admin") || hasPermission("category-list")) && (
                                <NavLink className="w-full" href={route("categories.index")} >
                                    <Icon icon="mdi:category" className={"mr-2"} />
                                    Categorías
                                </NavLink>
                            )}
                            {(hasRole('super-admin') || hasPermission('product-list')) && (
                                <NavLink className="w-full" href={route('products.index')} active={route().current('products.index')}>
                                    <Icon icon="mdi:cart" className={"mr-2"}/>
                                    Productos
                                </NavLink>
                            )}
                            {(hasRole('super-admin') || hasPermission('organizations-list')) && (
                                <NavLink className="w-full" href={route('donors.index')} active={route().current('donors.index')}>
                                    <Icon icon="streamline:give-gift-solid" className={"mr-2"} />
                                    Donantes
                                </NavLink>
                            )}
                            {(hasRole('super-admin') || hasPermission('organizations-list')) && (
                                <NavLink className="w-full" href={route('organizations.index')} active={route().current('organizations.index')}>
                                    <Icon icon="mdi:building" className={"mr-2"}/>

                                    Organizaciones
                                </NavLink>
                            )}
                        </ul>
                    </nav>
                    {/* Confuguraciones */}

                    <div className="flex-shrink-0 px-2 py-4 space-y-2">
                        <NavLink>
                            <Icon icon="mdi:cog" className={"mr-2"} />
                            Configuraciones
                        </NavLink>
                    </div>
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

                                        <ResponsiveNavLink method="post" href={route("logout")} as="button" >
                                            Cerrar Sesión

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
