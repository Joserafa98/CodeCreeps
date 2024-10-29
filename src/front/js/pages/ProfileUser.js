import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../store/appContext';
import '../../styles/Profile.css';
import Navbar from '../component/navbar';
import ProfilePic from "../../img/fotoperfil.png"; 

const Profile = () => {
  const { store, actions } = useContext(Context);
  const { currentUser, clasificaciones } = store;
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.id) {
          const user = await actions.getUserData(currentUser.id);
          setUserData(user || {});
          setEmail(user?.email || ""); // Inicializa el campo de email
      }
  };
  

    const fetchClasificaciones = async () => {
      if (currentUser && currentUser.id) {
        await actions.getUserClasificaciones(currentUser.id);
      }
    };

    fetchUserData();
    fetchClasificaciones();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (currentUser && currentUser.id) {
      const updatedData = { email };
      const result = await actions.updateUser(currentUser.id, updatedData);

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
    <Navbar></Navbar>
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
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            )}
          </div>

          <div className="profile__edit">
            {!isEditing ? (
              <a className="profile__button" id='EditButton' onClick={handleEditClick}>
                Editar Perfil
              </a>
            ) : (
              <a className="profile__button w-50" onClick={handleSaveClick}>
                Guardar
              </a>
            )}
          </div>
        </div>

        <div className="profile__stats">
          <div className="profile__stat">
            <div className="profile__icon">
              <i className="fa-solid fa-medal"></i>
            </div>
            <div className="profile__value">{clasificaciones.length || 0}</div>
            <div className="profile__key">Challenges</div>
          </div>

          <div className="profile__stat">
            <div className="profile__icon profile__icon--blue">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <div className="profile__value">{userData.ranking || 0}</div>
            <div className="profile__key">Ranking</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;