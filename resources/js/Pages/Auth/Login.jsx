import { useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import imagenGif from "@/imgs/imagenGif.gif";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="bg-[#F2F2F2]">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-around md:pb-10">
                    <Card className="bg-white mx-auto md:w-[390px] md:h-[600px] h-screen md:rounded-2xl shadow-2xl shadow-gray-400 md:mb-0 lg:my-16 ">
                        <CardHeader>
                            <ApplicationLogo className="block h-28 w-auto mx-auto rounded-full mt-3" />
                        </CardHeader>
                        <CardBody>
                            <h2 className="text-3xl text-center mb-5 font-semibold">
                                Banco de Alimentos - Imbabura
                            </h2>
                            <form className="px-10 py-3" onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Correo/Usuario"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Contraseña"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            className="text-[#00553f]"
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            Recordarme
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <PrimaryButton
                                        className="w-full items-center justify-center bg-[#00553f] h-12"
                                        disabled={processing}
                                    >
                                        Iniciar Sesión
                                    </PrimaryButton>
                                </div>
                                <div className="mt-4 text-center">
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            ¿Olvidaste la contraseña?
                                        </Link>
                                    )}
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                    {/* Imagen */}
                    <div className="w-full md:w-[750px] mx-auto hidden md:block">
                        <Image
                            width={1000}
                            alt="git de login"
                            src="https://admin-panel-portfolio.netlify.app/static/media/Revenue-cuate.86ac51593ee251c24d99c2b0ddf39a6f.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
