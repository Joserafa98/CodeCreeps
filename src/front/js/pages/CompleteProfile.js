import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../store/appContext';
import '../../styles/CompleteProfile.css';
import Navbar from '../component/navbar';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const CompleteProfile = () => {
  const { store, actions } = useContext(Context);
  const { currentUser } = store;
  const [userData, setUserData] = useState({});
  const [difficulty, setDifficulty] = useState([]); // Estado para niveles de dificultad
  const [preferredLanguage, setPreferredLanguage] = useState([]); // Estado para lenguajes preferidos
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.id) {
        const user = await actions.getUserData(currentUser.id);
        setUserData(user || {});
        setDifficulty(user?.difficulties || []); // Inicializa el campo de dificultad
        setPreferredLanguage(user?.preferred_languages || []); // Inicializa el campo de lenguaje preferido
      }
    };

    fetchUserData();
  }, [currentUser, actions]);

  const handleSaveClick = async () => {
    if (currentUser && currentUser.id) {
      const updatedData = {
        difficulties: difficulty.join(','),  // Convierte a string
        preferred_languages: preferredLanguage.join(','),  // Convierte a string
      };

      const result = await actions.updateUser(currentUser.id, updatedData);

      if (result) {
        setUserData((prevData) => ({
          ...prevData,
          difficulties: updatedData.difficulties.split(','),  // Actualiza el estado local
          preferred_languages: updatedData.preferred_languages.split(',')  // Actualiza el estado local
        }));
        console.log("Datos actualizados:", updatedData);

        // Redirige al usuario a la página de inicio de sesión
        navigate("/login");
      } else {
        console.error("Error al actualizar el usuario");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <div className="complete-profile">
          <h2 className="complete-profile__title" id='title-spooky'>Completa tu Perfil</h2>

          <div className="complete-profile__section">
            <label className="complete-profile__label">Nivel de Dificultad:</label>
            <div className="complete-profile__options mb-3">
              {["Fácil", "Intermedio", "Difícil"].map((level) => (
                <button
                  key={level}
                  className={`option-button ${difficulty.includes(level) ? "selected" : ""}`}
                  onClick={() => {
                    setDifficulty(prev => 
                      prev.includes(level) ? prev.filter(item => item !== level) : [...prev, level]
                    );
                  }}
                  id='button-answer'
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="complete-profile__section">
            <label className="complete-profile__label">Lenguaje Preferido:</label>
            <div className="complete-profile__options mb-2">
              {["JavaScript", "Python"].map((language) => (
                <button
                  key={language}
                  className={`option-button ${preferredLanguage.includes(language) ? "selected" : ""}`}
                  onClick={() => {
                    setPreferredLanguage(prev => 
                      prev.includes(language) ? prev.filter(item => item !== language) : [...prev, language]
                    );
                  }}
                  id='button-languaje'
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          <div className="complete-profile__actions">
            <button className="complete-profile__button" onClick={handleSaveClick} id="button-font">
                Guardar Preferencias
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
