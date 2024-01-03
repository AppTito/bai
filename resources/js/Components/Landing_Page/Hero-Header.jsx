import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../imgs/carousel1.webp";
import img2 from "../../../imgs/carousel2.webp";
import img3 from "../../../imgs/compartir.webp";

function HeroHeader() {
    return (
        <div className="min-h-screen h-screen relative bg-black">
            <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay
                infiniteLoop={true}
                transitionTime={500} // Ajusta según tus preferencias
                interval={3000}
            >
                <img
                    src={img1}
                    alt="banner"
                    className="w-full h-screen object-cover object-center opacity-70"
                />
                <img
                    src={img2}
                    alt="banner"
                    className="w-full h-screen object-cover object-center opacity-70"
                />
                <img
                    src={img3}
                    alt="banner"
                    className="w-full h-screen object-cover object-right opacity-70"
                />
            </Carousel>
        </div>
    );
}

export default HeroHeader;
