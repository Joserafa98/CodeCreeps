import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/recursos.css";
import { Footer } from "../component/footer";
import Navbar from "../component/navbar";

export const Treats = () => {
    const [activeTab, setActiveTab] = useState(null); // Estado para la card activa

    const resources = {
        videos: [
            { title: "JavaScript Basics", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
            { title: "React Tutorial", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
            { title: "CSS Flexbox & Grid", url: "https://www.youtube.com/watch?v=tXIhdp5R7sc" },
            { title: "Python for beginners", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8" },
            { title: "Aprende Angular", url: "https://www.youtube.com/watch?v=f7unUpshmpA&t=1s" }
        ],
        documents: [
            { title: "Flask Documentation", url: "https://flask.palletsprojects.com/en/stable/" },
            { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
            { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/" },
            { title: "Tailwind CSS", url: "https://tailwindcss.com/docs/installation" },
            { title: "Angular Documentation", url: "https://v17.angular.io/docs" },

        ],
        websites: [
            { title: "Practica Comandos", url: "https://cmdchallenge.com/" },
            { title: "UIverse", url: "https://uiverse.io/" },
            { title: "CodePen", url: "https://codepen.io/" },
            { title: "V0 AI for Devs", url: "https://v0.dev/" },
            { title: "Practica SQL", url: "https://sqlbolt.com/" }
        ],
    };

    const handleTabClick = (tab) => {
        setActiveTab(activeTab === tab ? null : tab); // Alternar entre mostrar/ocultar
    };

    return (
        <>
            <Navbar />
            <section className="home container" id="home">
                <div className="swiper home-swiper">
                    <div className="swiper-wrapper">
                        <section className="swiper-slide">
                            <div className="home__content grid">
                                <div className="home__group">
                                    <img src="https://assets.codepen.io/7773162/about-img.png" alt="" className="about__img" />
                                    <div className="home__indicator"></div>
                                    <div className="home__details-img">
                                        <h4 className="home__details-title">Pocion mágica</h4>
                                        <span className="home__details-subtitle">para codear como un #pro</span>
                                    </div>
                                </div>
                                <div className="home__data">
                                    <h3 className="home__subtitle">Descubre los trucos y herramientas que encantarán tus habilidades de programación</h3>
                                    <h1 className="home__title">LOS <br /> RECURSOS MÁS<br /> TENEBROSOS </h1>
                                    <p className="home__description">
                                        Atrévete a explorar los rincones más oscuros de nuestro catálogo de recursos. Estos son conjuros prohibidos que potenciarán tus habilidades de programación. Solo los más valientes osarán usarlos para desatar su verdadero poder. ¿Te atreves a enfrentarte a los conocimientos más tenebrosos y dominar el código que acecha <strong>en las sombras?</strong>
                                    </p>
                                    <div className="home__buttons">
                                        <a href="#treat" className="button button--ghost">CODEA AHORA</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </section>

            <section className="section about" id="treat">
                <h1 className="text-center">Elige tu camino</h1>
                <div className="cards__container">
                    {/* Tarjeta de Videos */}
                    <div
                        className={`card ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => handleTabClick('videos')}
                    >
                        <i className="fa-brands fa-youtube fa-2x"></i>
                        <div className="card__content">
                            <p className="card__title">Videos</p>
                            <p className="card__description">
                                Sumérgete en nuestra cripta de videos espeluznantes y aprende a conjurar código oscuro paso a paso. ¡No apto para corazones débiles!
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta de Documentación */}
                    <div
                        className={`card ${activeTab === 'documents' ? 'active' : ''}`}
                        onClick={() => handleTabClick('documents')}
                    >
                        <i className="fa-solid fa-file-alt fa-2x"></i>
                        <div className="card__content">
                            <p className="card__title">Documentación</p>
                            <p className="card__description">
                                Consulta nuestros grimorios malditos llenos de documentación oscura. Aquí encontrarás todos los hechizos de código que necesitas para sobrevivir a nuestros retos.
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta de Webs Recomendadas */}
                    <div
                        className={`card ${activeTab === 'websites' ? 'active' : ''}`}
                        onClick={() => handleTabClick('websites')}
                    >
                        <i className="fa-solid fa-globe fa-2x"></i>
                        <div className="card__content">
                            <p className="card__title">Webs Recomendadas</p>
                            <p className="card__description">
                                Explora portales malditos con nuestras webs recomendadas, seleccionadas especialmente para guiarte por los caminos más oscuros del conocimiento.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mostrar las listas de recursos debajo de las cards */}
                <div className="resources__container">
                    {activeTab && (
                        <div className="resource-list">
                            {resources[activeTab].map((item, index) => (
                                <a 
                                    key={index} 
                                    href={item.url} 
                                    className="resource-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer></Footer>
        </>
    );
};
