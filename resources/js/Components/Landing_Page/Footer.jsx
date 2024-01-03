import React from "react";
import logo from "../../../imgs/badi.webp";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#333333] text-white font-alegreya-sans">
            <div className="mx-auto flex flex-wrap py-10">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 px-4 mb-10 sm:mb-0 ">
                    <img src={logo} alt="Logo" className="mb-4 h-16 mx-auto" />
                    <p className="text-center lg:px-24 text-gray-400">
                        Tu donación de alimentos permite que ayudemos a miles de
                        personas a tener una alimentación digna.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-10 sm:mb-0 text-center">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Contáctanos:
                    </h2>
                    <div className="md:mx-0 mx-4 md:text-start text-gray-400">
                        <p className="mb-1 flex">
                            <p className="text-white mr-1">Dirección:</p> Simón
                            Bolívar y Camilo Pompeyo Guzmán - Antonio Ante -
                            Imbabura
                        </p>

                        <p className="mb-1 flex">
                            <p className="text-white mr-1">Correo:</p>{" "}
                            info@bancodealimentos.com
                        </p>
                        <p className="mb-1 flex">
                            <p className="text-white mr-1">Whatsapp:</p> +593
                            999 999 999
                        </p>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-10 sm:mb-0 ">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Nuestras redes sociales:
                    </h2>
                    <div className="flex justify-center">
                        <a
                            href="https://www.facebook.com/BancodeAlimentosImbabura"
                            className="border-2 p-2 mr-4 hover:text-primary hover:border-primary text-gray-400 border-gray-400"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://www.instagram.com/bancodealimentosimbabura/?hl=es"
                            className="border-2 p-2 mr-4 hover:text-primary hover:border-primary text-gray-400 border-gray-400"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.youtube.com/@BancodeAlimentosImbabura"
                            className="border-2 p-2 mr-4 hover:text-primary hover:border-primary text-gray-400 border-gray-400"
                        >
                            <FaYoutube />
                        </a>
                        <a
                            href="https://www.tiktok.com/@bancodealimentosimbabura"
                            className="border-2 p-2 mr-4 hover:text-primary hover:border-primary text-gray-400 border-gray-400"
                        >
                            <FaTiktok />
                        </a>
                    </div>
                </div>
            </div>
            {/* Segunda parte - Copy Right */}
            <div className="w-full text-center py-4 border-t-2 px-3 text-gray-300">
                <p>
                    © 2023. Banco de Alimentos Imbabura - Todos los Derechos
                    Reservados - Diseño en colaboración con Puce|Ibarra
                </p>
            </div>
        </footer>
    );
};

export default Footer;
