import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Swiper from 'swiper';

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	
useEffect(() => {
  const swiper = new Swiper('.home-swiper', {
    // Opciones de Swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Otras configuraciones
  });
}, []);

	return (
		  <>
			{/* HEADER */}
			<header className="header" id="header">
			  <nav className="nav container">
				<a href="#" className="nav__logo"> CodeCreeps </a>
				<div className="nav__menu" id="nav-menu">
				  <ul className="nav__list">
					<li className="nav__item">
					  <a href="#home" className="nav__link active-link">Home</a>
					</li>
					<li className="nav__item">
					  <a href="#trick" className="nav__link">Trick</a>
					</li>
					<li className="nav__item">
					  <a href="#treat" className="nav__link">Treat</a>
					</li>
					<a href="#" className="button button--ghost">ÚNETE AHORA</a>
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
			</header>
			<main className="main">
			  {/* HOME */}
			  <section className="home container" id="home">
				<div className="swiper home-swiper">
				  <div className="swiper-wrapper">
					{/* HOME SLIDER 1 */}
					<section className="swiper-slide">
					  <div className="home__content grid">
						<div className="home__group">
						  <img src="https://assets.codepen.io/7773162/home3-img.png" alt="" className="home__img" />
						  <div className="home__indicator"></div>
						  <div className="home__details-img">
							<h4 className="home__details-title">Captain Sem</h4>
							<span className="home__details-subtitle">Veteran Spooky Ghost</span>
						  </div>
						</div>
						<div className="home__data">
						  <h3 className="home__subtitle">Reta tus habilidades mientras conjuras código</h3>
						  <h1 className="home__title">APRENDE Y <br /> JUEGA CON<br />  NOSOTROS </h1>
						  <p className="home__description">
						  En CodeCreeps, te invitamos a adentrarte en un oscuro mundo de desafíos de programación. Desbloquea tus habilidades mientras enfrentas retos escalofriantes y te diviertes creando hechizos de código. ¡Prepárate para aprender y jugar en esta noche de brujas llena de sorpresas <strong>espeluznantes! </strong>
						  </p>
						  <div className="home__buttons">
							<a href="#" className="book--now">
							  <img src="https://assets.codepen.io/7773162/svgviewer-output+%281%29_3.svg" alt="" />
							</a>
							<a href="#" className="button--link button--flex">
							  Track Record <i className='bx bx-right-arrow-alt button__icon'></i>
							</a>
						  </div>
						</div>
					  </div>
					</section>
					{/* HOME SLIDER 2 */}
					<section className="swiper-slide">
					  <div className="home__content grid">
						<div className="home__group">
						  <img src="https://assets.codepen.io/7773162/home2-img.png" alt="" className="home__img" />
						  <div className="home__indicator"></div>
						  <div className="home__details-img">
							<h4 className="home__details-title">Adino & Grahami</h4>
							<span className="home__details-subtitle">No words can describe them</span>
						  </div>
						</div>
						<div className="home__data">
						  <h3 className="home__subtitle">#2 top Best duo</h3>
						  <h1 className="home__title">BRING BACK <br /> MY COTTON <br /> CANDY </h1>
						  <p className="home__description">
							Adino steals cotton candy from his brother and eats them all in one bite, a hungry beast. Grahami can no longer contain his anger towards Adino.
						  </p>
						  <div className="home__buttons">
							<a href="#" className="book--now">
							  <img src="https://assets.codepen.io/7773162/svgviewer-output+%281%29_3.svg" alt="" />
							</a>
							<a href="#" className="button--link button--flex">
							  Track Record <i className='bx bx-right-arrow-alt button__icon'></i>
							</a>
						  </div>
						</div>
					  </div>
					</section>
					{/* HOME SLIDER 3 */}
					<section className="swiper-slide">
					  <div className="home__content grid">
						<div className="home__group">
						  <img src="https://assets.codepen.io/7773162/home1-img.png" alt="" className="home__img" />
						  <div className="home__indicator"></div>
						  <div className="home__details-img">
							<h4 className="home__details-title">The Labu “Reiza”</h4>
							<span className="home__details-subtitle">The Living Pumpkin</span>
						  </div>
						</div>
						<div className="home__data">
						  <h3 className="pumpkin__subtitle">#3 Top Scariest Ghost 2020</h3>
						  <h1 className="home__title">UOOOO <br /> TRICK OR <br /> TREAT!! </h1>
						  <p className="home__description">
							Hi I’m Reiza, people call me “The Labu” currently I’m trying to learn something new, building my own bike with parts only made from Malaysia.
						  </p>
						  <div className="home__buttons">
							<a href="#" className="book--now">
							  <img src="https://assets.codepen.io/7773162/svgviewer-output+%282%29_2.svg" alt="" />
							</a>
							<a href="#" className="button--link button--flex">
							  Track Record <i className='bx bx-right-arrow-alt button__icon'></i>
							</a>
						  </div>
						</div>
					  </div>
					</section>
				  </div>
				  <div className="swiper-pagination"></div>
				</div>
			  </section>
			  {/* CATEGORY */}
			  <section className="section category" id="trick">
				<h2 className="section__title">Codea-te con <br /> <strong>Los mejores</strong> </h2>
				<div className="category__container container grid">
				  <div className="category__data">
					<img src="https://assets.codepen.io/7773162/category1-img.png" alt="" className="category__img" />
					<h3 className="category__title">Ghosts</h3>
					<p className="category__description">Choose the ghosts, the scariest there are.</p>
				  </div>
				  <div className="category__data">
					<img src="https://assets.codepen.io/7773162/category2-img.png" alt="" className="category__img" />
					<h3 className="category__title">Pumpkins</h3>
					<p className="category__description">You look at the scariest pumpkins there is.</p>
				  </div>
				  <div className="category__data">
					<img src="https://assets.codepen.io/7773162/category3-img.png" alt="" className="category__img" />
					<h3 className="category__title">Witch Hat</h3>
					<p className="category__description">Pick the most stylish witch hats out there.</p>
				  </div>
				</div>
			  </section>
			  {/* ABOUT */}
			  <section className="section about" id="treat">
				<div className="about__container container grid">
				  <div className="about__data">
					<h2 className="section__title about__title">Una experiencia de aprendizaje <br /> Tenebrosa </h2>
					<p className="about__description">
					Atrévete a ingresar al siniestro laboratorio del conocimiento en CodeCreeps, donde cada recurso es una delicia tenebrosa que enriquecerá tu viaje de aprendizaje. 
					</p>
					<a href="#" className="book--now">
					  <img src="https://assets.codepen.io/7773162/svgviewer-output+%281%29_3.svg" alt="" />
					</a>
				  </div>
				  <img src="https://assets.codepen.io/7773162/about-img.png" alt="" className="about__img" />
				</div>
			  </section>
			  {/* TRICK */}
			  <section className="section trick" id="trick">
				<div className="trick__container container grid">
				  <img src="https://assets.codepen.io/7773162/trick-img.png" alt="" className="trick__img" />
				  <div className="trick__data">
					<h2 className="section__title">The best treat <br /> for this year </h2>
					<p className="trick__description">
					  This year’s treat is the scariest one ever, the one you’ve never seen. Each treat comes with its own trick.
					</p>
					<a href="#" className="button--link button--flex">
					  Know More <i className='bx bx-right-arrow-alt button__icon'></i>
					</a>
				  </div>
				</div>
			  </section>
			</main>
		  </>
		);
	  }
	  
export default Home;
