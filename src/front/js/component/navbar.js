import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/Navbar.css"; 
import ProfilePic from "../../img/fotoperfil.png"; 

const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = store; // Obtén el usuario actual del store

    const handleLogout = async () => {
        await actions.logoutUser(); // Llama a la acción de logout
        navigate('/'); // Redirige a la página principal después del logout
    };

    return (
        <nav className="nav container">
<<<<<<< HEAD
        <Link to="/" className="nav__logo">CodeCreeps</Link>
        <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
                <li className="nav__item">
                    <a href="/" className="nav__link">Inicio</a>
                </li>
                <li className="nav__item">
                    <a href="/challenges" className="nav__link">Trucos</a>
                </li>
                <li className="nav__item">
                    <Link to="/Treats" className="nav__link active-link">Tratos</Link>
                </li>
                <li className='nav_item'>
                <Link to="/miniJuegos" className="button button--ghost">Mini Juego</Link>
                </li>
                <li className='nav_item'>
                <Link to="/aboutUs" className="button button--ghost">Sobre nosotros</Link>
                </li>
                <a href="/signup" className="button button--ghost">ÚNETE AHORA</a>
                <a href="/login" className="button button--ghost">INICIA SESIÓN</a>
            </ul>
            <div className="nav__close" id="nav-close">
                <i className='bx bx-x'></i>
=======
            <Link to="/" className="nav__logo" id='Title_logo'>CodeCreeps</Link>
            <div className="nav__menu" id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link 
                            to="/" 
                            className={`nav__link ${location.pathname === '/' ? 'active-link' : ''}`}
                        >
                            Inicio
                        </Link>
                    </li>
                    {currentUser && ( // Muestra los enlaces solo si hay un usuario autenticado
                        <>
                            <li className="nav__item">
                                <Link 
                                    to="/challenges" 
                                    className={`nav__link ${location.pathname === '/challenges' ? 'active-link' : ''}`}
                                >
                                    Trucos
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link 
                                    to="/Treats" 
                                    className={`nav__link ${location.pathname === '/Treats' ? 'active-link' : ''}`}
                                >
                                    Tratos
                                </Link>
                            </li>
                        </>
                    )}
                    {currentUser ? (
                        <>
                            <Link to="/profile" className="nav__link">
                                <img src={currentUser.profilePicture || ProfilePic} alt="Profile" className="profile-img" />
                            </Link>
                            <button onClick={handleLogout} className="button button--ghost" id='logout-button'>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/aboutUs" className="button button--ghost" id='user-button'>Sobre nosotros</Link>
                            <Link to="/signup" className="button button--ghost" id='user-button'>ÚNETE AHORA</Link>
                            <Link to="/login" className="button button--ghost" id='user-button'>INICIA SESIÓN</Link>
                        </>
                    )}
                </ul>
                <div className="nav__close" id="nav-close">
                    <i className='bx bx-x'></i>
                </div>
                <img src="https://assets.codepen.io/7773162/nav-img.png" alt="" className="nav__img" />
>>>>>>> main
            </div>
            <div className="nav__toggle" id="nav-toggle">
                <i className='bx bx-grid-alt'></i>
            </div>
        </nav>
    );
};

export default Navbar;
