import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import vid from "../../vids/food.mp4";

export default function Dashboard(props) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Bienvenido!</div>
                    </div>
                    <br />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/*gif dashboard*/}
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                        >
                            <source src={vid} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
