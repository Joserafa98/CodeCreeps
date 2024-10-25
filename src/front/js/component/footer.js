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

      {/* Redes sociales centradas */}
      <div className="row mt-1 mb-7 justify-content-center" style={{marginRight: '15px'}}>
        <div className="col-auto">
          <ul className="nav mx-n4">
            <li className="nav-item mx-3"> {/* Espaciado entre iconos */}
              <a 
                href="https://github.com/4GeeksAcademy/Ruubia-joserafa98-cristiann05-smokeless-finalproyect" 
                className="nav-link text-lg text-white text-primary-hover" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github fa-2x"></i>
              </a>
            </li>
            <li className="nav-item mx-3"> {/* Espaciado entre iconos */}
              <Link to="/" className="nav-link text-lg text-white text-primary-hover">
                <i className="fa-brands fa-instagram fa-2x"></i>
              </Link>
            </li>
            <li className="nav-item mx-3"> {/* Espaciado entre iconos */}
              <Link to="/" className="nav-link text-lg text-white text-primary-hover">
                <i className="fa-brands fa-facebook fa-2x"></i>
              </Link>
            </li>
            <li className="nav-item mx-3"> {/* Espaciado entre iconos */}
              <Link to="/" className="nav-link text-lg text-white text-primary-hover">
                <i className="fa-brands fa-linkedin fa-2x"></i>
              </Link>
            </li>
          </ul>
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
