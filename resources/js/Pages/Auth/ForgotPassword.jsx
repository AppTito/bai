import "../../../css/login.css";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import logo from "../../../imgs/badi.webp";

import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
        <Head title="Recuperar contraseña" />
            <div className="flex flex-col items-center justify-center h-screen p-6 md:p-10 w-full md:w-[460px] mx-auto">
                <div className="my-5">
                    <Link href="/" className="text-center">
                        {/* <ApplicationLogo className="block h-28 w-auto rounded-full my-3 border-[#FF9F14] border-2 shadow-md shadow-[#FF9F14]" /> */}
                        <img
                            src={logo}
                            alt="logo"
                            className="rounded-full my-3"
                        />
                    </Link>
                </div>
                <div className="mb-4 text-sm text-white text-center break-words">
                    ¿Olvidó su contraseña? Ningún problema. Ingrese la dirección
                    de correo electrónico y le enviaremos un enlace para
                    restablecer su contraseña que le permitirá elegir una nueva.
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="w-full max-w-sm">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Correo Electrónico"
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton
                            disabled={processing}
                            className="w-full items-center justify-center bg-[#00553f] h-12"
                        >
                            Recuperar Contraseña
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
