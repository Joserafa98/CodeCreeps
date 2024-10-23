import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import '../../styles/login&signup.css';

const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [passwordValidity, setPasswordValidity] = useState({ isValid: false, messages: [] });
    const navigate = useNavigate(); // Hook para la navegación

    const handleSignup = async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Validaciones de la contraseña
        if (!passwordValidity.isValid) {
            setAlert({ show: true, message: 'La contraseña debe cumplir con los requisitos. ¡No dejes que los fantasmas te atrapen!', type: 'danger' });
            return;
        }

        const userData = { email, password }; // Datos del usuario que deseas registrar
        const response = await actions.signupUser(userData); // Llama a la función de registro

        if (response.success) {
            setAlert({ show: true, message: '¡Registro exitoso! 🎉 Prepárate para desafiar tus habilidades de programación en esta noche de Halloween.', type: 'success' });
            setTimeout(() => navigate("/login"), 2000); // Redirige después de un breve retraso
        } else {
            setAlert({ show: true, message: response.msg || '¡Boo! Error en el registro. Por favor, inténtalo de nuevo. 👻', type: 'danger' });
            console.log("Error en el registro", response.msg);
        }
    };

    // Función de validación de contraseña
    const validatePassword = (password) => {
        const minLength = 8;
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()]/.test(password);
        
        const messages = [
            password.length >= minLength ? '✔️ ¡Buena elección! La contraseña tiene al menos 8 caracteres.' : '❌ La contraseña debe tener al menos 8 caracteres. ¡No dejes que los fantasmas te asusten!',
            hasLetter ? '✔️ Incluye al menos una letra. ¡Eso está de miedo!' : '❌ Debe incluir al menos una letra. ¡No te olvides de las letras!',
            hasNumber ? '✔️ Incluye al menos un número. ¡Eres un verdadero cazador de retos!' : '❌ Debe incluir al menos un número. ¡Los números son clave!',
            hasSpecialChar ? '✔️ Incluye al menos un carácter especial. ¡Perfecto, así te protegemos de los monstruos!' : '❌ Debe incluir al menos un carácter especial. ¡Hazlo más misterioso!',
        ];

        return {
            isValid: password.length >= minLength && hasLetter && hasNumber && hasSpecialChar,
            messages
        };
    };

    // Manejo del cambio en el campo de contraseña
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValidity(validatePassword(newPassword));
    };

    // Cerrar la alerta
    const closeAlert = () => {
        setAlert({ show: false, message: '', type: '' });
    };

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
                <li></li>
            </ul>
            <div className="d-none d-sm-flex col-sm-6 col-lg-8 align-items-center p-5">
                <div className="align-items-start d-lg-flex flex-column offset-lg-2 text-white">
                    <h1 className="welcome-title">🎃 ¡Bienvenido a la Fiesta de Halloween! 👻</h1>
                    <p className="welcome-text">¡Crea tu cuenta para unirte a la aventura de programación más espeluznante! <br /> ¡No te pierdas los trucos, golosinas y desafíos aterradores!</p>
                </div>
            </div>
            <div className="d-flex justify-content-center col-sm-6 col-lg-4 align-items-center px-5 bg-black mx-auto">
                <div className="form-wrapper">
                    <div className="d-flex flex-column">
                        <div className="mb-4">
                            <h3 className="font-medium mb-1 text-orange">🕷️ Registro de Usuario 🕷️</h3>
                            <p className="mb-2 text-orange">¡No te asustes! Regístrate para empezar a desafiar tus habilidades de programación.</p>
                        </div>

                        {/* Muestra las alertas de Bootstrap aquí */}
                        {alert.show && (
                            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                {alert.message}
                                <button type="button" className="close" onClick={closeAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSignup}>
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
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <small className="form-text text-muted">
                                        🕸️ La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un carácter especial. ¡No dejes que los fantasmas te atrapen!
                                    </small>

                                    {/* Indicador de requisitos de la contraseña */}
                                    <div className="mt-2">
                                        {passwordValidity.messages.map((msg, index) => (
                                            <div key={index} className={`text-${passwordValidity.isValid ? 'success' : 'danger'}`}>
                                                {msg}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3 border-0" disabled={!passwordValidity.isValid}>
                                    🎃 Registrarse y Empezar la Aventura
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
