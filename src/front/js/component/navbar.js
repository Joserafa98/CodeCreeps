import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/Navbar.css"; 

const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { currentUser } = store; // Obtén el usuario actual del store

    const handleLogout = async () => {
        await actions.logoutUser(); // Llama a la acción de logout
        navigate('/'); // Redirige a la página principal después del logout
    };

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
                    {currentUser ? ( // Verifica si hay un usuario autenticado
                        <>
                            <Link to="/profile" className="nav__link">
                                <img src={currentUser.profilePicture || "http://i.pravatar.cc/250?img=58"} alt="Profile" className="profile-img" />
                            </Link>
                            <button onClick={handleLogout} className="button button--ghost">Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/aboutUs" className="button button--ghost">Sobre nosotros</Link>
                            <a href="/signup" className="button button--ghost">ÚNETE AHORA</a>
                            <a href="/login" className="button button--ghost">INICIA SESIÓN</a>
                        </>
                    )}
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
