// AdminMenu.js
import React from "react";
import AlterNavLink from "@/Components/AlterNavLink";
import { Icon } from "@iconify/react";

const AdminMenu = ({ route, hasRole, hasPermission }) => {
    return (
        <ul className="space-y-2 ml-4">
            {(hasRole("super-admin") || hasPermission("user-list")) && (
            
                <AlterNavLink
                    className="w-full mt-2"
                    href={route("users.index")}
                    active={route().current("users.index")}
                >
                    <Icon icon="mdi:users" className="mr-2" />
                    Users
                </AlterNavLink>
            )}
            {(hasRole("super-admin") || hasPermission("role-list")) && (
                <AlterNavLink
                    className="w-full"
                    href={route("roles.index")}
                    active={route().current("roles.index")}
                >
                    <Icon icon="mdi:edit" className="mr-2" />
                    Roles
                </AlterNavLink>
            )}
            {(hasRole("super-admin") || hasPermission("permission-list")) && (
                <AlterNavLink
                    className="w-full"
                    href={route("permissions.index")}
                    active={route().current("permissions.index")}
                >
                    <Icon icon="mdi:lock" className="mr-2" />
                    Permissions
                </AlterNavLink>
            )}
        </ul>
    );
};

export default AdminMenu;
