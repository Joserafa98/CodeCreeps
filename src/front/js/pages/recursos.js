import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Treats =()=>{

    return (
        <>
        <nav className="nav container">
            <Link to="/" className="nav__logo"> CodeCreeps </Link>
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
        </>
    )
}