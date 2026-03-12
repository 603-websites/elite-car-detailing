import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import car5 from '../assets/images/cars/car5.jpg';

// Condensed showcase using scroll animation - FRD mobile-first
export function VehicleShowcase() {
  const title = (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-2 sm:mb-4">
        Luxury Auto <br className="sm:hidden" />
        <span className="text-luxury-gold">Detailing Excellence</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-luxury-white/70 mt-2 sm:mt-4 max-w-2xl mx-auto">
        Precision care for high-performance vehicles across New England
      </p>
    </>
  );

  return (
    <div className="flex flex-col overflow-hidden bg-luxury-black">
      <ContainerScroll titleComponent={title}>
        <img
          src={car5}
          alt="Luxury vehicle detailing"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
          loading="lazy"
        />
      </ContainerScroll>
    </div>
  );
}

export default VehicleShowcase;
