import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Asegúrate de importar el contexto
import "../../styles/challengelist.css"; // Asegúrate de agregar estilos personalizados

// Ejercicios estáticos
const desafios = [
  {
    id: 1,
    nombre_reto: "La Maldición de los Números Repetidos (JS)",
    descripcion: "Encuentra el primer número que se repite en una lista de identificaciones.",
  },
  {
    id: 2,
    nombre_reto: "La Suma de Números (JS)",
    descripcion: "Escribe una función que sume todos los números de un arreglo.",
  },
  {
    id: 3,
    nombre_reto: "Palíndromos (JS)",
    descripcion: "Verifica si una palabra es un palíndromo.",
  },
  {
    id: 4,
    nombre_reto: "Fibonacci (JS)",
    descripcion: "Genera una secuencia de Fibonacci hasta el n-ésimo número.",
  },
  {
    id: 5,
    nombre_reto: "Ordenar Números (JS)",
    descripcion: "Ordena un arreglo de números de menor a mayor.",
  },
  {
    id: 6,
    nombre_reto: "Contar Vocales (Python)",
    descripcion: "Cuenta el número de vocales en una cadena de texto.",
  },
  {
    id: 7,
    nombre_reto: "Suma de Listas (Python)",
    descripcion: "Suma los elementos de dos listas y devuelve una nueva lista con los resultados.",
  },
  {
    id: 8,
    nombre_reto: "Factorial (Python)",
    descripcion: "Calcula el factorial de un número dado.",
  },
  {
    id: 9,
    nombre_reto: "Números Primos (Python)",
    descripcion: "Verifica si un número es primo.",
  },
  {
    id: 10,
    nombre_reto: "Invertir Cadena (Python)",
    descripcion: "Invierte una cadena de texto.",
  },
];

export default function ChallengeList() {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const { currentUser } = store;

  const handleComplete = (retoId) => {
    if (!currentUser || !currentUser.id) {
      alert('Por favor, inicia sesión para completar un reto.');
      return;
    }

    // Simulación de éxito sin fetch
    const result = { success: true }; // Simulamos que siempre se crea la clasificación

    if (result.success) {
      // Navega a la ruta del reto completado
      navigate(`/challenges/${retoId}`); // Asegúrate de que esta ruta coincida con la definida en tu React Router
    } else {
      alert('Error al completar el reto.'); // Mensaje de error simulado
    }
  };

  return (
    <div className="challenge-list-container">
      <h2 className="challenge-list-title">Desafíos de Halloween</h2>
      <div className="challenge-list-grid">
        {desafios.map((desafio) => (
          <div key={desafio.id} className="challenge-card">
            <h3 className="challenge-card-title">{desafio.nombre_reto}</h3>
            <p className="challenge-card-description">{desafio.descripcion}</p>
            <button 
              className="challenge-complete-button" 
              onClick={() => handleComplete(desafio.id)}
            >
              Completar Reto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
