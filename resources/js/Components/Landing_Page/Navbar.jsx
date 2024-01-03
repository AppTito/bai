import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "@inertiajs/react";

import logo from "../../../imgs/badi.webp";

const Navbar = ({ auth }) => {
    const [navbarBg, setNavbarBg] = useState("bg-transparent");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Cambia la clase de fondo dependiendo de la posición de desplazamiento
            if (scrollY > 100) {
                setNavbarBg("bg-fondoVerde"); // Cambia a tu color verde deseado
            } else {
                setNavbarBg("bg-transparent");
            }
        };

        // Agrega un listener de eventos de desplazamiento cuando el componente se monta
        window.addEventListener("scroll", handleScroll);

        // Limpia el listener de eventos cuando el componente se desmonta
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // El segundo parámetro es un array vacío para asegurar que el efecto se ejecute solo una vez al montar el componente

    return (
        <Disclosure as="nav" className={`fixed w-full z-50 ${navbarBg}`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-[70px] items-center justify-between md:px-10 px-5">
                    <div className="flex items-center">
                        <img
                            className="md:h-[60px] h-12"
                            src={logo}
                            alt="lobo BAI"
                        />
                    </div>
                    <Link
                        href={
                            auth.user.id ? route("dashboard") : route("login")
                        }
                    >
                        <a className="font-semibold text-gray-200 hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                            {auth.user.id ? auth.user.name : "Iniciar Sesión"}
                        </a>
                    </Link>
                </div>
            </div>
        </Disclosure>
    );
};

export default Navbar;
