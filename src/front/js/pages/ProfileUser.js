import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../store/appContext';
import '../../styles/Profile.css';
import Navbar from '../component/navbar';
import ProfilePic from "../../img/fotoperfil.png"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesome para iconos
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Icono de cruz

const Profile = () => {
  const { store, actions } = useContext(Context);
  const { currentUser } = store;
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.id) {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/usuarios/${currentUser.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}` // Incluye el token si es necesario
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al obtener los datos del usuario:", errorData);
            return;
          }

          const user = await response.json();
          setUserData(user || {});
          setEmail(user?.email || ""); // Inicializa el campo de email
        } catch (error) {
          console.error("Error en la solicitud para obtener los datos del usuario:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Cancela la edición y vuelve al estado anterior
    setEmail(userData.email || ""); // Restablece el email al original
  };

  const handleSaveClick = async () => {
    if (currentUser && currentUser.id) {
      const updatedData = { email };
      const result = await actions.updateUser(currentUser.id, updatedData); // Suponiendo que tienes esta acción definida

      if (result) {
        setUserData((prevData) => ({ ...prevData, email }));
        setIsEditing(false);
        console.log("Email actualizado:", email);
      } else {
        console.error("Error al actualizar el usuario");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <div className="profile">
          <div className="profile__picture">
            <img src={userData.profilePicture || ProfilePic} alt={userData.username || "User"} />
          </div>

          <div className="profile__header">
            <div className="profile__account">
              {!isEditing ? (
                <h4 className="profile__username">{userData.email || "Usuario"}</h4>
              ) : (
                <div className="email-input-container">
                  <input
                    type="email"
                    className="input email-input" // Añadido para estilizar
                    placeholder="Introduce tu nuevo correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <FontAwesomeIcon 
                    icon={faTimes} 
                    className="cancel-icon" 
                    onClick={handleCancelClick} // Maneja la cancelación
                  />
                </div>
              )}
            </div>

            <div className="profile__edit">
              {!isEditing ? (
                <a className="profile__button" id='EditButton' onClick={handleEditClick}>
                  Editar Perfil
                </a>
              ) : (
                <a className="profile__button" onClick={handleSaveClick}>
                  Guardar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
