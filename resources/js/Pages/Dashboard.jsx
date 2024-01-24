import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
/* import vid from "../../vids/food.mp4";
 */ import gif from "../../vids/Produce.gif";

export default function Dashboard(props) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-green-800">
                            Bienvenid@! al Banco de Alimentos Imbabura
                        </h2>
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
                    <br />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg text-center">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-4 text-green-800">
                                ¿Qué es el Banco de Alimentos Imbabura?
                            </h2>
                            <p className="text-lg text-gray-700">
                                El Banco de Alimentos Imbabura es una
                                organización sin fines de lucro que tiene como
                                objetivo principal la reducción del hambre, la
                                desnutrición y la pobreza en la provincia de
                                Imbabura, a través de la recuperación de
                                alimentos que se encuentran en buen estado y que
                                de otra manera serían desperdiciados, para luego
                                distribuirlos a través de una red de
                                organizaciones sociales que trabajan con
                                personas en situación de vulnerabilidad.
                            </p>
                        </div>
                {/* btns direcciones vistas */}
                <div className="flex justify-center mt-4">
                    <a
                        href="/operations"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        Operaciones
                    </a>
                    <a
                        href="/distribution"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        Distribución
                    </a>
                    <a
                        href="/users"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        Usuarios
                    </a>
                    <a
                        href="/badi"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        Datos BADI
                    </a>
                </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
