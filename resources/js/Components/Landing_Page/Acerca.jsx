import React from "react";

function Acerca({ titulo, parrafo, enlace, tituloVideo, alinearDerecha }) {
    return (
        <div className="bg-[#f5faf8]">
            <div
                className={`text-center xl:py-32 items-center py-12 px-4 sm:py-10 sm:px-6 md:py-16 md:px-20 lg:flex ${
                    alinearDerecha ? "flex-row-reverse" : ""
                }`}
            >
                <div className="mb-10 lg:w-1/2 md:px-10">
                    <h2 className="font-alegreya-sans text-[#379a73] font-black text-4xl mb-10">
                        {titulo}
                    </h2>
                    <p className="font-fira-sans text-[#5D5D5D] leading-6 text-base text-justify">
                        {parrafo}
                    </p>
                </div>
                <div className="lg:w-1/2 xl:px-20 md:px-10 mx-auto">
                    <iframe
                        src={enlace}
                        title={tituloVideo}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full lg:h-[280px] h-[350px] rounded-md mb-5"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Acerca;
