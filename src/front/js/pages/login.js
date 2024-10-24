import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import '../../styles/login&signup.css';

const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate(); // Hook para la navegación

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        const response = await actions.loginUser(userData);

        if (response && response.success) {
            setAlert({ show: true, message: '¡Bienvenido a CodeCreeps! Has logrado abrir el portal.', type: 'success' });
            setTimeout(() => {
                navigate("/"); // Redirige a la página principal después de 2 segundos
            }, 2000);
        } else {
            setAlert({ show: true, message: '¡Ups! Algo salió mal. Verifica tus credenciales antes de que los fantasmas te atrapen.', type: 'danger' });
            console.log("Error en el inicio de sesión");
        }
    };

    // Cerrar la alerta
    const closeAlert = () => {
        setAlert((prev) => ({ ...prev, show: false })); // Cerrar la alerta sin eliminar el mensaje
    };

    // Efecto para eliminar la alerta después de un tiempo
    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                closeAlert();
            }, 3000); // Cerrar automáticamente después de 3 segundos

            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    return (
        <div className="row mx-0 auth-wrapper">
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className="d-none d-sm-flex col-sm-6 col-lg-8 align-items-center p-5">
                <div className="align-items-start d-lg-flex flex-column offset-lg-2 text-white">
                    <h1 className="welcome-title">🎃 ¡Bienvenido de nuevo! 👻</h1>
                    <p className="welcome-text">¡Inicia sesión para continuar con la aventura de programación más espeluznante!</p>
                </div>
            </div>

            <div className="d-flex justify-content-center col-sm-6 col-lg-4 align-items-center px-5 bg-black mx-auto">
                <div className="form-wrapper">
                    <div className="d-flex flex-column">
                        <div className="mb-4">
                            <h3 className="font-medium mb-1 text-orange">🕷️ Iniciar Sesión 🕷️</h3>
                            <p className="mb-2 text-orange">¡No te asustes! Ingresa tus credenciales para seguir jugando.</p>
                        </div>

                        {/* Muestra las alertas aquí */}
                        {alert.show && (
                            <div className={`alert alert-${alert.type} fade ${alert.show ? 'show' : 'fade-out'}`} role="alert">
                                <strong>{alert.type === 'success' ? '¡Bienvenido!' : '¡Ups!'}</strong> {alert.message}
                                <RiCloseLine className="close-icon" onClick={closeAlert} />
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-10">
                                <div className="form-group">
                                    <label htmlFor="email" className="text-orange">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-orange">Contraseña</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    🎃 Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
