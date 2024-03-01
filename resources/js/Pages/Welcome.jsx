import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Landing_Page/Navbar";
import HeroHeader from "@/Components/Landing_Page/Hero-Header";
import Acerca from "@/Components/Landing_Page/Acerca";
import Footer from "@/Components/Landing_Page/Footer";
import Alcance from "@/Components/Landing_Page/Alcance";
import Unete from "@/Components/Landing_Page/Unete";

import "../../css/Landing/welcome.css"

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Banco de Alimentos - Imbabura" />
            <Navbar auth={auth} />
            <HeroHeader />
            <Acerca
                titulo="¿Quíenes somos?"
                parrafo="Somos un banco de alimentos con una misión clara:
                    luchar contra el hambre y la desnutrición, rescatamos alimento 
                    y lo distribuimos en donación a personas vulnerables mediante 
                    un sistema de gestión certificado que garantiza trazabilidad 
                    y nos permite ser un aliado estratégico en materia de 
                    responsabilidad social empresarial."
                enlace="https://www.youtube.com/embed/r1xJ6FmN6uc?showinfo=0"
                tituloVideo="Video"
            />
            <div className="lg:border-b-0 border-b-2 mx-5 md:mx-28 lg:mb-[-170px] "></div>
            <Acerca
                titulo="¿Qué hacemos?"
                parrafo="Recopilamos alimentos de supermercados y grandes
                    empresas comprometidas, transformando donaciones masivas
                    en herramientas eficaces contra la inseguridad
                    alimentaria. Clasificamos meticulosamente los alimentos,
                    destinándolos a consumo inmediato o a organizaciones
                    sociales. Este proceso garantiza que cada donación tenga
                    un impacto máximo, alimentando cuerpos y esperanzas en
                    nuestra comunidad."
                enlace="https://www.youtube.com/embed/al644KGriHY/showinfo=0"
                tituloVideo="Video"
                alinearDerecha // Para invertir la alineación, agregar esta prop
            />

            <Alcance />
            <Unete />
            <Footer />
        </>
    );
}
