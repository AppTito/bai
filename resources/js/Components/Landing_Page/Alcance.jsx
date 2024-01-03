import React from "react";
import "../../../css/Landing/fondoImagen.css";
import ContadorAlcance from "./ContadorAlcance";

import kilosEntregados from "../../../imgs/Alcance/comida.webp";
import voluntariado from "../../../imgs/Alcance/voluntario.webp";
import Organizaciones from "../../../imgs/Alcance/alimento.webp";
import Personas from "../../../imgs/Alcance/amabilidad.webp";

function Impacto() {
    return (
        <div className="fondoImpacto relative">
            <div className="pt-20 pb-10 px-6 md:px-16 relative z-10 text-center">
                <h2 className="text-primary font-black text-4xl mb-6 font-alegreya-sans">
                    Resultados Alcanzados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ContadorAlcance
                        titulo={
                            <>
                                Kilos <br />
                                Entregados
                                <br />
                            </>
                        }
                        imagen={kilosEntregados}
                        tituloImagen="Alimentos_Entregados"
                        contadorTermina={9329000}
                        duracion={5}
                        fecha="(2003 - 2023)"
                    />
                    <ContadorAlcance
                        titulo="Organizaciones Beneficiadas"
                        imagen={Organizaciones}
                        tituloImagen="Organizaciones_Sociales"
                        contadorTermina={30}
                        duracion={9}
                        fecha="(2023)"
                    />
                    <ContadorAlcance
                        titulo="Personas Beneficiadas"
                        imagen={Personas}
                        tituloImagen="Personas_Beneficiadas"
                        contadorTermina={3321000}
                        duracion={7}
                        fecha="C/Mes"
                    />
                    <ContadorAlcance
                        titulo={
                            <>
                                Voluntarios <br />
                                <br />
                                {/* aqui porque hace falta un salto de linea para estar al nivel del resto de titulos */}
                            </>
                        }
                        imagen={voluntariado}
                        tituloImagen="Alimentos Entregados"
                        contadorTermina={35}
                        duracion={10}
                        fecha="C/Mes"
                    />
                </div>
            </div>
        </div>
    );
}

export default Impacto;
