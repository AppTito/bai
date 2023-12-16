import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { usePermissions } from "@/hooks/usePermissions.js";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { permissions } = usePage().props;
    const { hasPermission, hasRole } = usePermissions();

    function destroy(e) {
        if (confirm("Are you sure you want to delete this permissions?")) {
            Inertia.delete(route("permissions.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Categorias" />
            {/* tabla categorias  de alimentos*/}
       
        </AuthenticatedLayout>
    );
}
