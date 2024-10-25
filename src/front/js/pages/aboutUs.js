import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/aboutUs.css';
import Cristian from "../../img/Cristian.jpg"; 
import Jose from "../../img/Jose.jpeg";
import Beatriz from "../../img/Beatriz.jpg";
import calabaza from "../../img/calabaza.jpg";
import espantapajaros from "../../img/espantapajaros.jpg";
import spooky from "../../img/spooky.jpg";

export const AboutUs = () => {
    const navigate = useNavigate(); // Hook para redirigir

    // Estilos para los fondos
    const sectionStyle1 = {
        backgroundImage: `url(${calabaza})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
    };

    const sectionStyle2 = {
        backgroundImage: `url(${espantapajaros})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
    };

    const sectionStyle3 = {
        backgroundImage: `url(${spooky})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
    };

    return (
        <>
            {/* Sección 1: Calabaza */}
            <div className="about-us" style={sectionStyle1}>
                <div className="container text-overlay" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                    <div className="row align-items-center g-10">
                        <div className="col-lg-8 col-md-12 mt-5 text-center">
                            <h1 className="ls-tight fw-bolder display-4 text-halloween-orange mb-4 mt-4 text-wrap spooky-font spooky-title fade-in" style={{ marginTop: '10px', fontSize: '6rem' }}>
                                Conoce al equipo detrás de CodeCreeps...
                            </h1>
                            <p className="w-xl-75 lead text-halloween-white text-wrap mb-5 spooky-font fade-in">
                                Desarrolladores apasionados creando soluciones innovadoras para disfrutar de un Halloween lleno de trucos y tratos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección 2: Espantapájaros */}
            <div style={sectionStyle2}>
                <div className="container text-overlay" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                    <div className="row justify-content-center mb-10 mb-lg-24">
                        <div className="col-md-6 text-center">
                            <h2 className="display-1 font-display text-halloween-orange fw-bold spooky-font fade-in">
                                Los FullStackers...
                            </h2>
                            <h1 className="font-display lh-tight text-halloween-white fw-bolder display-5 mb-3 spooky-font fade-in">
                                ¡Un grupo de jóvenes que llevan su talento al siguiente nivel!
                                <span className="text-halloween-orange spooky-font fade-in"> Este es nuestro equipo:</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección 3: Spooky - Descripciones de los desarrolladores */}
            <div style={sectionStyle3}>
                <div className="container py-5">
                    {/* Descripción de Cristian */}
                    <div className="section-step-lg mb-5">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-5 mb-7 mb-lg-0">
                                <h5 className="h5 mb-3 text-uppercase fw-bolder text-halloween-orange spooky-font">Cristian Ayala Sánchez</h5>
                                <h2 className="ls-tight font-display text-halloween-orange fw-bolder mb-3 spooky-font">Full Stack Developer</h2>
                                <p className="lead mb-5 spooky-font fade-in">
                                    Soy Cristian Ayala Sánchez, un Full Stack Developer apasionado por la tecnología y la creación de soluciones web. Me encanta enfrentar desafíos y aprender constantemente nuevas habilidades en el desarrollo de software...
                                </p>
                                <div className="social-buttons d-flex mt-4">
                                    <a href="https://github.com/cristiann05" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">GitHub</a>
                                    <a href="https://www.linkedin.com/in/cristian05/" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">LinkedIn</a>
                                    <a href="https://www.instagram.com/cristian_as05" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">Instagram</a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <img src={Cristian} className="img-fluid rounded highlight-image spooky-image" alt="Cristian Ayala Sánchez" />
                            </div>
                        </div>
                    </div>

                    {/* Descripción de José */}
                    <div className="section-step-lg mb-5">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <img src={Jose} className="img-fluid rounded highlight-image spooky-image" alt="José Hernández" />
                            </div>
                            <div className="col-lg-5 mb-7 mb-lg-0">
                                <h5 className="h5 mb-3 text-uppercase fw-bolder text-halloween-orange spooky-font">José Hernández</h5>
                                <h2 className="ls-tight font-display text-halloween-orange fw-bolder mb-3 spooky-font">Full Stack Developer</h2>
                                <p className="lead mb-5 spooky-font fade-in">Soy José Hernández, periodista y marketer egresado de la Universidad Arturo Michelena...</p>
                                <div className="social-buttons d-flex mt-4">
                                    <a href="https://github.com/Joserafa98" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">GitHub</a>
                                    <a href="https://www.linkedin.com/in/jose-hernandez-67605813b/" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">LinkedIn</a>
                                    <a href="https://www.instagram.com/joserafa98" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Descripción de Beatriz */}
                    <div className="section-step-lg mb-5">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-5 mb-7 mb-lg-0">
                                <h5 className="h5 mb-3 text-uppercase fw-bolder text-halloween-orange spooky-font">Beatriz Carmona Jurado</h5>
                                <h2 className="ls-tight font-display text-halloween-orange fw-bolder mb-3 spooky-font">Full Stack Developer</h2>
                                <p className="lead mb-5 spooky-font fade-in">Soy Beatriz Carmona, una entusiasta de la tecnología y el desarrollo de software...</p>
                                <div className="social-buttons d-flex mt-4">
                                    <a href="https://github.com/Ruubia" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">GitHub</a>
                                    <a href="https://www.linkedin.com/in/beatrizcarmonajurado" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">LinkedIn</a>
                                    <a href="https://www.instagram.com/ruubi_a/" target="_blank" rel="noopener noreferrer" className="btn btn-halloween btn-lg mx-2">Instagram</a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <img src={Beatriz} className="img-fluid rounded highlight-image spooky-image" alt="Beatriz Carmona Jurado" />
                            </div>
                        </div>
                    </div>

                    {/* Botón para volver a la página anterior */}
                    <div className="text-center">
                        <button onClick={() => navigate(-1)} className="btn btn-halloween fade-in">Volver</button>
                    </div>
                </div>
            </div>
        </>
    );
};