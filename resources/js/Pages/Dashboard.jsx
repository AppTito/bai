import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
/* import vid from "../../vids/food.mp4";
 */import gif from "../../vids/Produce.gif";

export default function Dashboard(props) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-green-800">Bienvenid@! al Banco de Alimentos Imbabura</h2>
                        {/* Additional content can be added here */}
                    </div>
                    <br />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg text-center">
                        {/* Video or GIF dashboard */}
                        {/* Video */}
                        {/* <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                        >
                            <source src={vid} type="video/mp4" />
                        </video> */}
                        
                        {/* GIF */}
                        <img className="mx-auto mt-4" src={gif} alt="gif" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
