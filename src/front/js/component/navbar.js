import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css"; // Asegúrate de crear y personalizar tu archivo CSS para los estilos

const Navbar = () => {
    return (
       
        <nav className="nav container">
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
            </div>
            <img src="https://assets.codepen.io/7773162/nav-img.png" alt="" className="nav__img" />
        </div>
        <div className="nav__toggle" id="nav-toggle">
            <i className='bx bx-grid-alt'></i>
        </div>
    </nav>
    );
};

export default Navbar;
