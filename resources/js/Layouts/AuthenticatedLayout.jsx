import React from "react";
import { usePermissions } from "@/hooks/usePermissions.js";
import { Icon } from "@iconify/react";
import {Sidebar} from "@/Components/Sidebar.jsx";
import {SidebarItem} from "@/Components/SidebarItem.jsx";

export default function Authenticated({ user, header, children }) {
    const { hasPermission, hasRole } = usePermissions();
    return (
        <div className="flex flex-row h-screen">
            <Sidebar user={user}>
                <SidebarItem icon={<Icon icon="mdi:home"/>} text="Dashboard" href={route("dashboard")}
                             active={route().current("dashboard")}/>
                {(hasRole("super-admin") || hasPermission("user-list") || hasPermission("role-list") || hasPermission("permission-list")) && (
                    <SidebarItem icon={<Icon icon="mdi:account-group"/>} text="Administrar" categoryIcon={<Icon icon="eva:arrow-down-outline"/>} >
                        {(hasRole("super-admin") || hasPermission("user-list")) && (
                            <SidebarItem icon={<Icon icon="mdi:account"/>} text="Usuarios" href={route("users.index")}
                                         active={route().current("users.index")}/>
                        )}
                        {(hasRole("super-admin") || hasPermission("role-list") ) && (
                            <SidebarItem icon={<Icon icon="tabler:checkup-list"/>} text="Roles" href={route("roles.index")}
                                         active={route().current("roles.index")}/>
                        )}
                        {(hasRole("super-admin") || hasPermission("permission-list")) && (
                            <SidebarItem icon={<Icon icon="icon-park-solid:permissions"/>} text="Permisos"
                                         href={route("permissions.index")} active={route().current("permissions.index")}/>
                        )}
                    </SidebarItem>
                )}
                <SidebarItem icon={<Icon icon="mdi:cog"/>} text="Configuraciones" categoryIcon={<Icon icon="eva:arrow-down-outline"/>}>
                    {(hasRole("super-admin") || hasPermission("category-list")) && (
                        <SidebarItem icon={<Icon icon="mdi:category"/>} text="Categorías" href={route('categories.index')}
                                     active={route().current('categories.index')}/>
                    )}
                    {(hasRole('super-admin') || hasPermission('product-list')) && (
                        <SidebarItem icon={<Icon icon="mdi:cart"/>} text="Valores de Categoría" href={route('categoryValues.index')}
                                     active={route().current('categoryValues.index')}/>
                    )}
                    {(hasRole('super-admin') || hasPermission('product-list')) && (
                        <SidebarItem icon={<Icon icon="mdi:cart"/>} text="Productos" href={route('products.index')}
                                     active={route().current('products.index')}/>
                    )}
                    {(hasRole("super-admin") || hasPermission("organizations-list")) && (
                        <SidebarItem icon={<Icon icon="mdi:building"/>} text="Organizaciones"
                                     href={route('organizations.index')} active={route().current('organizations.index')}/>
                    )}
                    {(hasRole('super-admin') || hasPermission('donor-list')) && (
                        <SidebarItem icon={<Icon icon="streamline:give-gift-solid"/>} text="Donantes"
                                     href={route('donors.index')} active={route().current('donors.index')}/>
                    )}
                    {(hasRole("super-admin") || hasPermission("attentions-list")) && (
                        <SidebarItem icon={<Icon icon="mdi:help-outline"/>} text="Atención"
                                     href={route('attentions.index')} active={route().current('attentions.index')}/>
                    )}
                    {(hasRole("super-admin") || hasPermission("bank-list")) && (
                        <SidebarItem icon={<Icon icon="maki:bank"/>} text="Datos BADI"
                                     href={route('banks.index')} active={route().current('banks.index')}/>
                    )}
                </SidebarItem>
            </Sidebar>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8  text-primary">{header}</div>
                </header>
            )}
            <main className="flex-grow overflow-x-hidden overflow-y-auto bg-gray-200">
                {children}
            </main>
        </div>
    );
}
