import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/miniJuegos.css';
import calabaza2 from "../../img/calabaza2.jpg"; 
import teladearaña from "../../img/teladearaña.jpg"; 
import luna from "../../img/luna.jpg"; 

export const MiniJuegos = () => {
    const navigate = useNavigate(); 

    const sectionStyle1 = {
        backgroundImage: `url(${calabaza2})`,
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
        backgroundImage: `url(${teladearaña})`,
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
        backgroundImage: `url(${luna})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        flexDirection: 'column',
    };

    return (
        <>
            <div className="mini-juegos" style={sectionStyle1}>
                <div className="container text-overlay" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-8 col-md-12 mt-5 text-center">
                            <h1 className="ls-tight fw-bolder display-4 text-halloween-orange mb-4 mt-4 text-wrap spooky-font spooky-title fade-in" style={{ marginTop: '10px', fontSize: '6rem' }}>
                                Memory Spooky
                            </h1>
                            <p className="w-xl-75 lead text-halloween-white text-wrap mb-5 spooky-font fade-in">
                                ¿Puedes recordar la posición de las cartas? Juega al clásico juego de memoria con un toque de Halloween. ¡Saca a relucir tu mejor memoria y compite por la mejor puntuación!
                            </p>
                            <button onClick={() => navigate('/memory-spooky')} className="btn btn-halloween fade-in">Jugar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={sectionStyle2}>
                <div className="container text-overlay" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6 text-center">
                            <h2 className="display-1 font-display text-halloween-orange fw-bold spooky-font fade-in">
                                Lights Out
                            </h2>
                            <h1 className="font-display lh-tight text-halloween-white fw-bolder display-5 mb-3 spooky-font fade-in">
                                Un juego de lógica que te mantendrá pensando.
                                <span className="text-halloween-orange spooky-font fade-in"> Desactiva todas las luces para ganar.</span>
                            </h1>
                            <button onClick={() => navigate('/lights-out')} className="btn btn-halloween fade-in">Jugar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={sectionStyle3}>
                <div className="container py-5" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                    <h1 className="text-halloween-orange text-center display-4 spooky-font">Snake de Halloween</h1>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6 text-center">
                            <p className="lead mb-5 spooky-font fade-in">
                                ¡Controla tu serpiente y recoge todos los dulces mientras evitas los obstáculos! Cuanto más dulce recojas, más larga se volverá tu serpiente. ¿Hasta dónde podrás llegar?
                            </p>
                            <button onClick={() => navigate('/snake-de-halloween')} className="btn btn-halloween fade-in">Jugar</button>
                        </div>
                    </div>
                </div>
                <div className="text-center" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <button onClick={() => navigate('/')} className="btn btn-halloween fade-in">Volver a Home</button>
                </div>
            </div>
        </>
    );
};