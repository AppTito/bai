import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

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
                        {/* video o gif dashboard*/}
                        <video controls>
                            <source
                                src="/resources/vids/food-donation-7179417-5858097.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                            <track kind="captions" />
                        </video>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
