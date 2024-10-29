import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link

export const Footer = () => (
  <footer className="pt-24 pb-10 gradient-bottom-right"> {/* Agregado de fondo gradiente */}
    <div className="container mw-screen-xl">
      <div className="row">
        <div className="col">
          <div className="pe-6 ml-5 text-center"> {/* Clases Bootstrap y centrado */}
            <h3 className="h2 text-white fw-semibold lh-lg mb-0" style={{ fontSize: '1rem' }}>
              Este proyecto fue creado por
            </h3>
            <h2 className="h2 text-white fw-semibold lh-lg mb-1" style={{ fontSize: '2rem', marginLeft: '5px' }}>
              Los FullStackers
            </h2>
          </div>
        </div>
      </div>
      {/* Texto de copyright centrado */}
      <div className="row justify-content-center">
        <div className="col-auto">
          <p className="text-sm text-white text-center mt-3">
            © Copyright 2024 FullStackers - Joserafa98, cristiann05 & Ruubia.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
