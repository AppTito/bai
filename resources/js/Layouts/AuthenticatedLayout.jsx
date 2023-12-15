import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { usePermissions } from "@/hooks/usePermissions.js";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { hasPermission, hasRole } = usePermissions();

    return (
        <div className="flex h-screen bg-gray-200">
            {/* Left Sidebar */}
            <div className="flex flex-col flex-shrink-0 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800" style={{ width: "250px" }}>
                <div className="flex flex-col items-center flex-shrink-0 py-4">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 rounded-full" />
                    </Link>
                </div>
                <div className="flex flex-col justify-between flex-1 h-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 bg-white bg-gray-800">
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </NavLink>
                        {/* Super-admin */}
                        {(hasRole("super-admin") || hasPermission("user-list")) && (
                            <NavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                            >
                                Users
                            </NavLink>
                        )}
                        {(hasRole("super-admin") || hasPermission("role-list")) && (
                            <NavLink
                                href={route("roles.index")}
                                active={route().current("roles.index")}
                            >
                                Roles
                            </NavLink>
                        )}

                        {(hasRole("super-admin") || hasPermission("permission-list")) && (
                            <NavLink
                                href={route("permissions.index")}
                                active={route().current("permissions.index")}
                            >
                                Permissions
                            </NavLink>
                        )}
                        {/* SuperAdmin y Admin */}
                        {(hasRole("super-admin") || hasPermission("permission-list")) && (
                            <NavLink
                                href={route("categories.index")}
                                active={route().current("categories.index")}
                            >
                                Categorias
                            </NavLink>
                        )}
                    </nav>
                    <div className="flex-shrink-0 px-2 py-4 space-y-2">
                        <ResponsiveNavLink
                            href="/logout"
                            as="button"
                            method="post"
                            icon="logout"
                            className="w-full btn btn-red"
                        >
                            Cerrar Sesión
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top Header */}
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
                    <div className="flex items-center">
                        {/* Toggle sidebar button */}
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="text-gray-500 focus:outline-none lg:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {showingNavigationDropdown ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Search input */}
                        <div className="hidden mx-10 lg:flex lg:items-center">
                            <span className="text-gray-400">
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.25 14.5a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zM14.5 9.75a4.25 4.25 0 11-8.5 0 4.25 4.25 0 018.5 0z"
                                        fill="#A0AEC0"
                                    />
                                </svg>
                            </span>

                            <input
                                className="hidden lg:block bg-gray-200 text-sm text-gray-700 placeholder-gray-600 border-0 border-gray-200 focus:ring-0 focus:outline-none w-32 h-10 pl-2 rounded-md"
                                type="text"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    {/* User Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={user.profile_photo_url}
                                            alt={user.name}
                                        />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {/* Account Management */}
                                    <div className="block px-4 py-2 text-xs text-gray-400">
                                        Manage Account
                                    </div>

                                    <Dropdown.Link
                                        href="/user/profile"
                                        icon="user-circle"
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href="/user/settings"
                                        icon="cog"
                                    >
                                        Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href="/user/api-tokens"
                                        icon="key"
                                    >
                                        API Tokens
                                    </Dropdown.Link>

                                    <div className="border-t border-gray-100"></div>

                                    {/* Authentication */}
                                    <form method="POST" action="/logout">
                                        <Dropdown.Link
                                            as="button"
                                            method="post"
                                            icon="logout"
                                        >
                                            Logout
                                        </Dropdown.Link>
                                    </form>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 focus:text-white transition duration-150 ease-in-out"
                        >
                            {/* Menu open: "hidden", Menu closed: "block" */}
                            <svg
                                className={`${
                                    showingNavigationDropdown
                                        ? "hidden"
                                        : "block"
                                } h-6 w-6`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={`${
                                        showingNavigationDropdown
                                            ? "hidden"
                                            : "block"
                                    } rounded-md`}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                <path
                                    className={`${
                                        showingNavigationDropdown
                                            ? "block"
                                            : "hidden"
                                    } rounded-md`}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                            {/* Menu open: "block", Menu closed: "hidden" */}
                            <svg
                                className={`${
                                    showingNavigationDropdown
                                        ? "block"
                                        : "hidden"
                                } h-6 w-6`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={`${
                                        showingNavigationDropdown
                                            ? "block"
                                            : "hidden"
                                    } rounded-md`}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Secondary Header (if needed) */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Main Content */}
                <main className="flex-grow overflow-x-hidden overflow-y-auto bg-gray-200">
                    {children}
                </main>
            </div>
        </div>
    );
}
