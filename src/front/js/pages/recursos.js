import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/recursos.css";

export const Treats = () => {
    const [activeTab, setActiveTab] = useState('videos');

    const resources = {
        videos: [
            { title: "JavaScript Basics", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
            { title: "React Tutorial", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
            { title: "CSS Flexbox & Grid", url: "https://www.youtube.com/watch?v=tXIhdp5R7sc" },
        ],
        documents: [
            { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
            { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
            { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/" },
        ],
        websites: [
            { title: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
            { title: "Codecademy", url: "https://www.codecademy.com/" },
            { title: "GitHub", url: "https://github.com/" },
        ],
    };

    return (
        <>
            <nav className="nav container">
                <Link to="/" className="nav__logo">CodeCreeps</Link>
                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">Inicio</a>
                        </li>
                        <li className="nav__item">
                            <a href="#trick" className="nav__link">Trucos</a>
                        </li>
                        <li className="nav__item">
                            <Link to="/Treats" className="nav__link">Tratos</Link>
                        </li>
                        <a href="#" className="button button--ghost">ÚNETE AHORA</a>
                        <a href="#" className="button button--ghost">INICIA SESIÓN</a>
                    </ul>
                    <div className="nav__close" id="nav-close">
                        <i className='bx bx-x'></i>
                    </div>
                    <img src="https://assets.codepen.io/7773162/nav-img.png" alt="" className="nav__img" />
                </div>
                <div className="nav__toggle" id="nav-toggle">
                    <i className='bx bx-grid-alt'></i>
                </div>
            </nav>

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
                                        <a href="#" className="button button--ghost">CODEA AHORA</a>
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
                    <div className="card">
                        <i className="fa-brands fa-youtube fa-2x"></i>
                        <div className="card__content">
                            <p className="card__title">Videos</p>
                            <p className="card__description">
                                Sumérgete en nuestra cripta de videos espeluznantes y aprende a conjurar código oscuro paso a paso. ¡No apto para corazones débiles!
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta de Documentación */}
                    <div className="card">
                        <i className="fa-solid fa-file-alt fa-2x"></i>
                        <div className="card__content">
                            <p className="card__title">Documentación</p>
                            <p className="card__description">
                                Consulta nuestros grimorios malditos llenos de documentación oscura. Aquí encontrarás todos los hechizos de código que necesitas para sobrevivir a nuestros retos.
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta de Webs Recomendadas */}
                    <div className="card">
                        <i className="fa-solid fa-globe fa-2x"></i>
                        <div className="card__content">
                            <p className="card__title">Webs Recomendadas</p>
                            <p className="card__description">
                                Explora portales malditos con nuestras webs recomendadas, seleccionadas especialmente para guiarte por los caminos más oscuros del conocimiento.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="custom-card-container">
                <div className="custom-card">
                    <div className="custom-card-header">
                        <h3 className="mb-0">Spooky Coding Resources</h3>
                        <p>Haunting materials for junior programmers</p>
                    </div>
                    <div className="custom-card-body">
                        <ul className="nav nav-tabs mb-4">
                            {Object.keys(resources).map((category) => (
                                <li className="nav-item" key={category}>
                                    <button
                                        className={`nav-link ${activeTab === category ? 'active' : ''}`}
                                        onClick={() => setActiveTab(category)}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content">
                            {Object.entries(resources).map(([category, items]) => (
                                <div key={category} className={`tab-pane fade ${activeTab === category ? 'show active' : ''}`}>
                                    <ul className="list-group">
                                        {items.map((item, index) => (
                                            <li key={index} className="list-group-item">
                                                <Link to={item.url} target="_blank" rel="noopener noreferrer" className="d-flex justify-content-between align-items-center resource-item">
                                                    <span>{item.title}</span>
                                                    <span className="badge bg-primary">Open</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
