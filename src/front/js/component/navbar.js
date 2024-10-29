import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/Navbar.css"; // Asegúrate de que el archivo CSS esté vinculado
import ProfilePic from "../../img/fotoperfil.png";

const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = store;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    const handleLogout = async () => {
        await actions.logoutUser();
        navigate('/');
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            setAnimationClass('fade-slide-out');
            setTimeout(() => {
                setIsMenuOpen(false);
                setAnimationClass('');
            }, 500);
        } else {
            setIsMenuOpen(true);
            setAnimationClass('fade-slide-in');
        }
    };

    const closeMenu = () => {
        if (isMenuOpen) {
            setAnimationClass('fade-slide-out');
            setTimeout(() => {
                setIsMenuOpen(false);
                setAnimationClass('');
            }, 500);
        }
    };

    return (
        <nav className="nav container">
            <Link to="/" className="nav__logo" id="Title_logo">CodeCreeps</Link>

            <button className="nav__toggle" onClick={toggleMenu}>
                {isMenuOpen ? '✕' : '☰'}
            </button>

            <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''} ${animationClass}`} id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link 
                            to="/" 
                            className={`nav__link ${location.pathname === '/' ? 'active-link' : ''}`}
                            onClick={closeMenu}
                        >
                            Inicio
                        </Link>
                    </li>
                    {currentUser && (
                        <>
                            <li className="nav__item">
                                <Link 
                                    to="/challenges" 
                                    className={`nav__link ${location.pathname === '/challenges' ? 'active-link' : ''}`}
                                    onClick={closeMenu}
                                >
                                    Trucos
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link 
                                    to="/treats" 
                                    className={`nav__link ${location.pathname === '/treats' ? 'active-link' : ''}`}
                                    onClick={closeMenu}
                                >
                                    Tratos
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link 
                                    to="/minijuegos" 
                                    className={`nav__link ${location.pathname === '/minijuegos' ? 'active-link' : ''}`}
                                    onClick={closeMenu}
                                >
                                    Mini Juegos
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link 
                                    to="/chatgeneral" 
                                    className={`nav__link ${location.pathname === '/chatgeneral' ? 'active-link' : ''}`}
                                    onClick={closeMenu}
                                >
                                    Chat oscuro
                                </Link>
                            </li>
                        </>
                    )}
                    {currentUser ? (
                        <>
                            <li className="nav__item">
                                <Link to="/profile" className="nav__link" onClick={closeMenu}>
                                    <img 
                                        src={currentUser.profilePicture || ProfilePic} 
                                        alt="Profile" 
                                        className="profile-img" 
                                    />
                                </Link>
                            </li>
                            <li className="nav__item">
                                <button onClick={handleLogout} className="button button--ghost" id="logout-button">Cerrar sesión</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav__item">
                                <Link to="/aboutUs" className="button button--ghost" onClick={closeMenu}>Sobre nosotros</Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/signup" className="button button--ghost" onClick={closeMenu}>ÚNETE AHORA</Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/login" className="button button--ghost" onClick={closeMenu}>INICIA SESIÓN</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="nav__close" onClick={toggleMenu}>
                    <i className="bx bx-x"></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
