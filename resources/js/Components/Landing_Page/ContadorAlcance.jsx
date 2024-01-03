import React from "react";
import CountUp from "react-countup";

function ContadorImpacto({
    titulo,
    imagen,
    tituloImagen,
    contadorTermina,
    duracion,
    fecha,
}) {
    return (
        <div className="mb-6 md:mr-4 md:px-7 px-5 text-white">
            <h3 className="font-alegreya-sans text-3xl my-5 font-bold">
                {titulo}
            </h3>
            <img
                src={imagen}
                alt={tituloImagen}
                className="md:w-full rounded-full mx-auto w-1/2 mb-5"
            />

            <CountUp
                end={contadorTermina}
                duration={duracion}
                className="font-extrabold text-2xl"
            />
            <p className="font-thin my-2 text-lg">{fecha}</p>
        </div>
    );
}

export default ContadorImpacto;
