import React from "react";
import "../../../css/Landing/botones.css"

function Button({ BotonValor, BotonLink }) {
    return (
        <div>
            <a className="font-bold inline-block no-underline font-alegreya-sans btn-rounded" href={BotonLink}>
                {BotonValor}
            </a>
        </div>
    );
}

export default Button;
