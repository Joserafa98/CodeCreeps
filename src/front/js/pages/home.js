import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Footer } from "../component/footer";
import { Link } from "react-router-dom";
import Navbar from "../component/navbar";
import FAQList from "../component/FAQList";
export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const swiper = new window.Swiper('.home-swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });

        return () => {
            swiper.destroy(); // Limpiar el swiper al desmontar el componente
        };
    }, []);

    const handleLogout = () => {
        // Llama a la función de logout desde las acciones
        actions.logout(); 
    };

    return (
        <>
            {/* HEADER */}
            <header className="header" id="header">
                <Navbar />
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
                                            <h4 className="home__details-title">Los retos te están esperando</h4>
                                            <span className="home__details-subtitle">¡Participa ahora!</span>
                                        </div>
                                    </div>
                                    <div className="home__data">
                                        <h3 className="home__subtitle" id="home-subtitle">Reta tus habilidades mientras conjuras código</h3>
                                        <h1 className="home__title" id="home-title">APRENDE Y <br /> JUEGA CON<br /> NOSOTROS </h1>
                                        <p className="home__description">
                                            En CodeCreeps, te invitamos a adentrarte en un oscuro mundo de desafíos de programación. 
                                            Desbloquea tus habilidades mientras enfrentas retos escalofriantes y te diviertes creando hechizos de código. 
                                            ¡Prepárate para aprender y jugar en esta noche de brujas llena de sorpresas <strong>espeluznantes!</strong>
                                        </p>
                                        <div className="home__buttons">
                                            <Link to="/Treats"className="button button--ghost" id="button-font">CODEA AHORA</Link>
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
                                            <h4 className="home__details-title">tú y tu amig@</h4>
                                            <span className="home__details-subtitle">Con el #mood para aprender</span>
                                        </div>
                                    </div>
                                    <div className="home__data">
                                        <h3 className="home__subtitle" id="home-subtitle">No te enfrentes solo a estos desafíos… ¡Invita a tus amigos a unirse al horror!</h3>
                                        <h1 className="home__title" id="home-title">COMPARTE<br /> CODECREEPS <br /> CON TODOS</h1>
                                        <p className="home__description">
                                            No guardes los secretos de CodeCreeps solo para ti. Invita a tus amigos a adentrarse en nuestros desafíos de programación infernales y a compartir la diversión macabra.
                                        </p>
                                        <div className="home__buttons">
                                            <Link to="/login" className="button button--ghost" id="button-font">INICIA SESIÓN Y COMPARTE</Link>
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
                                            <h4 className="home__details-title">El top</h4>
                                            <span className="home__details-subtitle">Mundial</span>
                                        </div>
                                    </div>
                                    <div className="home__data">
                                        <h3 className="home__subtitle" id="home-subtitle">Sé parte del Top Mundial...</h3>
                                        <h1 className="home__title" id="home-title">¡¡CONQUISTA <br /> EL RANKING <br /> MONSTRUOSO!!</h1>
                                        <p className="home__description">
                                            ¿Tienes lo que se necesita para sobrevivir a los retos de programación más escalofriantes? En CodeCreeps, los desafíos no son para los débiles. Acepta el llamado de la oscuridad, demuestra tu destreza y escala en nuestro temido Ranking <strong>MONSTRUOSO</strong>.
                                        </p>
                                        <div className="home__buttons">
                                            <Link to="/challenges" className="button button--ghost" id="button-font">RANKEA AHORA</Link>
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
                    <h2 className="section__title" id="home-subtitle">Retos <br /> Espeluznantes <br /> Para todos los niveles </h2>
                    <div className="category__container container grid">
                        <div className="category__data">
                            <img src="https://assets.codepen.io/7773162/category1-img.png" alt="" className="category__img" />
                            <h3 className="category__title" id="home-subtitle">Fantasmas</h3>
                            <p className="category__description">Retos especiales para los que quieren una experiencia aterradora... BUU</p>
                        </div>
                        <div className="category__data">
                            <img src="https://assets.codepen.io/7773162/category2-img.png" alt="" className="category__img" />
                            <h3 className="category__title" id="home-subtitle">Calabazas</h3>
                            <p className="category__description">¡Retos diseñados para los que quieren un primer susto!</p>
                        </div>
                        <div className="category__data">
                            <img src="https://assets.codepen.io/7773162/category3-img.png" alt="" className="category__img" />
                            <h3 className="category__title" id="home-subtitle">Brujas</h3>
                            <p className="category__description">Retos tan mágicos que sacarán el developer que eres</p>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="section about" id="treat">
                    <div className="about__container container grid">
                        <div className="about__data">
                            <h2 className="section__title about__title" id="home-title">Una experiencia de aprendizaje <br /> Tenebrosa </h2>
                            <p className="about__description">
                                Atrévete a ingresar al siniestro laboratorio del conocimiento en CodeCreeps, donde cada recurso es una delicia tenebrosa que enriquecerá tu viaje de aprendizaje. 
                            </p>
                            <div className="home__buttons">
                                <Link to="/Treats" className="button button--ghost" id="button-font">APRENDE AHORA</Link>
                            </div>
                        </div>
                        <img src="https://assets.codepen.io/7773162/about-img.png" alt="" className="about__img" />
                    </div>
                </section>
                <FAQList />
                <Footer />
            </main>
        </>
    );
};

export default Home;