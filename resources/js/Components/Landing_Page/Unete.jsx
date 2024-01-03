import React from "react";
import Button from "./Button";

function Unete() {
    return (
        <div className="bg-[#f5faf8]">
            <div className=" py-16 lg:py-32 px-4 sm:py-10 sm:px-6 md:py-16 md:px-20 xl:px-32">
                <h2 className="text-center font-alegreya-sans text-[#379a73] font-black text-4xl mb-10">
                    ¡ÚNETE!
                </h2>
                <p className="text-justify font-fira-sans text-[#5D5D5D] mb-10">
                    Únete a nuestra causa y conviértete en parte del cambio. En
                    el voluntariado, encontrarás la oportunidad de ser un agente
                    de transformación, ofreciendo tu tiempo y habilidades para
                    ayudar a quienes más lo necesitan. Descubre cómo contribuir
                    a la alimentación de niños, adolescentes, mujeres y adultos
                    mayores. Como donante, tu generosidad asegura el acceso a
                    alimentos esenciales. Nuestra estrategia se centra en el
                    aprovechamiento integral de los alimentos y su distribución
                    efectiva. Sé parte de esta misión significativa y únete a
                    nosotros hoy.
                </p>
                <div className="flex flex-col lg:flex-row mx-auto">
                    {/* Voluntariado */}
                    <div className="lg:w-1/2 w-full mx-auto mb-10 pb-6 lg:mb-0 lg:mr-10 lg:border-b-0 border-b-2">
                        <h3 className="text-center mb-5 text-3xl font-bold text-[#379a73] font-fira-sans">
                            Voluntariado
                        </h3>
                        <iframe
                            src="https://www.youtube.com/embed/a2nAU4oJ4bc"
                            title="Cómo puedo sumarme a la causa siendo voluntario?"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full lg:h-[280px] h-[350px] rounded-md"
                        ></iframe>
                        <p className="text-justify py-5 px-3 text-[#5D5D5D]">
                            El Voluntariado es el corazón del Banco de
                            Alimentos, es la mejor forma de convertirte en un
                            agente de cambio ofreciendo tu tiempo, tu
                            experiencia, tu conocimiento, tus competencias y tu
                            trabajo en beneficio de las personas menos
                            atendidas.
                        </p>
                    </div>
                    {/* Donante */}
                    <div className="lg:w-1/2 w-full mx-auto lg:ml-10">
                        <h3 className="text-center mb-5 text-3xl font-bold text-[#379a73] font-fira-sans">
                            Donante
                        </h3>
                        <iframe
                            src="https://www.youtube.com/embed/18ZI-oibW6M"
                            title="Qué tipo de donaciones receptamos?"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full lg:h-[280px] h-[350px] rounded-md"
                        ></iframe>
                        <p className="text-justify py-5 px-3 text-[#5D5D5D]">
                            Todas las donaciones realizadas aseguran la
                            alimentación de niños, adolescentes, mujeres,
                            adultos mayores y personas con capacidades
                            especiales. Nuestra estrategia está enfocada en
                            desarrollar procesos de aprovechamiento integral de
                            los alimentos, asegurando su distribución inmediata
                            o la prolongación del ciclo de vida, a través de
                            asesoría técnica profesional.
                        </p>
                    </div>
                </div>
                <div className="text-center my-10">
                    <Button BotonValor="Contáctanos" BotonLink="#"/>
                </div>
            </div>
        </div>
    );
}

export default Unete;
