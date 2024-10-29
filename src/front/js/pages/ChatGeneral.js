import React, { useEffect, useState, useRef } from 'react';
import '../../styles/chatgeneral.css';
import Navbar from '../component/navbar';

const ChatGeneral = () => {
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null); // Estado para el archivo de imagen
    const [loadingImage, setLoadingImage] = useState(false); // Estado para cargar imagen
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null); // Referencia al input de archivo
    const [imagePreview, setImagePreview] = useState(null); // Estado para previsualizar la imagen

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/foro/mensajes`);
                if (!response.ok) throw new Error("Error al cargar los mensajes.");

                const data = await response.json();
                setMensajes(data);
                chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchMensajes();
        const intervalId = setInterval(fetchMensajes, 2000); // Actualiza cada 5 segundos

        return () => clearInterval(intervalId);
    }, []);

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Presents_react'); // Cambia esto a tu upload preset
        formData.append('cloud_name', 'dhieuyort'); // Cambia esto a tu cloud name
        formData.append('folder', 'Carpeta_imagenes_chat'); // Subir a la carpeta específica

        console.log("Uploading image to Cloudinary...");

        try {
            setLoadingImage(true);
            const response = await fetch("https://api.cloudinary.com/v1_1/dhieuyort/image/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Cloudinary Response:", result);

            if (response.ok) {
                return result.secure_url; // Devuelve la URL segura de la imagen
            } else {
                throw new Error("Error al cargar la imagen: " + result.message);
            }
        } catch (error) {
            console.error("Error en la carga de la imagen:", error.message);
            setError(error.message);
            return null; // Devuelve null si hubo un error
        } finally {
            setLoadingImage(false);
        }
    };

    const handleEnviarMensaje = async () => {
        // No enviar si no hay mensaje ni archivo
        if (!nuevoMensaje.trim() && !file) {
            //setError("El contenido del mensaje o la imagen es requerido.");
            return;
        }

        let imageUrl = null;

        // Cargar la imagen si hay archivo
        if (file) {
            imageUrl = await uploadImageToCloudinary(file); // Carga la imagen
            console.log("URL de imagen cargada:", imageUrl);
            if (!imageUrl) return; // Si la carga de la imagen falló, no enviar el mensaje
        }

        const mensajeData = {
            contenido: nuevoMensaje.trim(), // Asegúrate de que no sea null
            imagen: imageUrl // Cambiado a 'imagen' para coincidir con el backend
        };

        // Verifica el contenido del mensaje antes de enviar
        console.log("Mensaje a enviar:", mensajeData); // Añadido para depuración

        const token = localStorage.getItem('token');
        console.log("Token de autenticación:", token); // Verifica el token

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/foro/mensajes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Asegúrate de que el tipo de contenido es JSON
                },
                body: JSON.stringify(mensajeData) // Enviar como JSON
            });

            if (!response.ok) {
                const errorMessage = await response.json(); // Captura el mensaje de error
                console.error("Error en respuesta del servidor:", errorMessage);
                throw new Error(`Error al enviar el mensaje: ${errorMessage.msg || "Error desconocido"}`);
            }

            const mensajeEnviado = await response.json();
            console.log("Mensaje enviado:", mensajeEnviado);

            setMensajes([...mensajes, mensajeEnviado]); // Agregar el mensaje a la lista
            setNuevoMensaje(''); // Limpiar el campo de texto
            setFile(null); // Limpiar el archivo
            setImagePreview(null); // Limpiar la vista previa
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            setError(error.message); // Mostrar error en el estado
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEnviarMensaje();
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Guardar el archivo seleccionado
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Establecer la vista previa de la imagen
            };
            reader.readAsDataURL(selectedFile); // Leer la imagen como URL
        }
    };

    // Función para activar el input de archivo
    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Disparar el clic en el input de archivo
        }
    };

    // Manejar el clic en la imagen para hacer zoom
    const handleImageClick = (url) => {
        setImagePreview(url); // Establecer la URL de la imagen para mostrar en el modal
    };

    // Cerrar el modal de vista previa
    const closePreview = () => {
        setImagePreview(null); // Cerrar el modal
    };

    return (
        <div className="chat-container">
            <Navbar />
            <h2>🎃 Chat de Halloween 🎃</h2>

            {error && <p className="error">{error}</p>}

            {/* Contenedor de mensajes */}
            <div className="messages-container">
                {mensajes.map((msg) => (
                    <div key={msg.id} className="message">
                        <p><strong>{msg.usuario_email}:</strong> {msg.contenido}</p>
                        {msg.imagen_url && (
                            <img 
                                src={msg.imagen_url} 
                                alt="Imagen enviada" 
                                className="message-image" 
                                style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
                                onClick={() => handleImageClick(msg.imagen_url)} // Al hacer clic, abrir el zoom
                            />
                        )}
                        <span className="timestamp">{new Date(msg.fecha_creacion).toLocaleString()}</span>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="message-input-container">
                <input
                    type="text"
                    placeholder="Escribe un mensaje tenebroso..."
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={{ flex: 1 }} // Hacer que el input ocupe el espacio disponible
                />
                <button onClick={handleFileInputClick} style={{ marginLeft: '10px', background: 'fa8800', border: 'none', cursor: 'pointer' }}>
                    <span role="img" aria-label="camera">📷</span> {/* Icono de cámara dentro del input */}
                </button>
                <input
                    type="file"
                    accept="image/*" // Acepta solo imágenes
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Ocultar el input
                    ref={fileInputRef} // Referencia al input
                />
                <button onClick={handleEnviarMensaje} disabled={loadingImage}>Enviar 👻</button>
                {loadingImage && <span>Cargando imagen...</span>}
            </div>

            {/* Modal para vista previa de la imagen */}
            {imagePreview && (
                <div className="image-preview-modal" onClick={closePreview}>
                    <img src={imagePreview} alt="Vista previa" className="image-preview" />
                </div>
            )}
        </div>
    );
};

export default ChatGeneral;
