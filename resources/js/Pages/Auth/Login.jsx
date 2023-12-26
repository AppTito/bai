import { useEffect } from "react";

import "../../../css/login.css";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

import formaAmarilla from "../../../imgs/amarillo.png";
import lampara from "../../../imgs/lampara.png";
import persona from "../../../imgs/persona.png";
import logo from "../../../imgs/badi.webp";

import { Link, useForm, Head } from "@inertiajs/react";

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
        <>
            <Head title="Iniciar Sesión" />
            <div className="flex flex-col md:flex-row h-screen">
                <div className="md:w-1/2 flex-1 flex flex-col justify-center items-center p-8">
                    <img
                        src={logo}
                        alt="logo"
                        className="md:w-1/2 rounded-full my-3"
                    />
                    {/* <img
                    src={logo2}
                    alt="logo"
                    className="w-1/2 rounded-full my-3"
                /> */}
                    <h2 className="text-3xl text-center font-semibold text-white my-5 tracking-normal">
                        BIENVENIDO
                    </h2>
                    <form onSubmit={submit} className="w-full max-w-md">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Correo Electrónico"
                            />

                            <TextInput
                                id="email" isLogin
                                type="email"
                                name="email"
                                value={data.email}
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
                            <InputLabel htmlFor="password" value="Contraseña" />

                            <TextInput
                                id="password" isLogin
                                type="password"
                                name="password"
                                value={data.password}
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
                        <div className="mt-1 text-right text-white">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-white hover:text-[#FF9F14] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    ¿Olvidaste la contraseña?
                                </Link>
                            )}
                        </div>
                        <div className="mt-4">
                            <PrimaryButton
                                className="w-full items-center justify-center bg-[#00553f] h-12"
                                disabled={processing}
                            >
                                Iniciar Sesión
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                <div className="lg:w-1/2 relative hidden lg:flex">
                    {/* Imágenes a la derecha */}
                    <img
                        src={formaAmarilla}
                        alt="forma"
                        className="absolute inset-0 h-full w-full"
                    />
                    <img
                        src={lampara}
                        alt="lampara"
                        className="absolute top-0 left-[10%] w-1/6 h-1/5 "
                    />
                    <img
                        src={persona}
                        alt="persona"
                        className="absolute bottom-1/3 right-[50%] w-1/3"
                    />
                </div>
            </div>
        </>
    );
}
