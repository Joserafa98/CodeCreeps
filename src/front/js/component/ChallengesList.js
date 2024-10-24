import React, { useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Asegúrate de importar el contexto

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
    <Container fluid className="bg-dark text-light p-4">
      <h2 className="text-warning mb-4">Desafíos de Halloween</h2>
      <Row>
        {desafios.map((desafio) => (
          <Col key={desafio.id} md={6} className="mb-4">
            <Card className="bg-secondary text-light">
              <Card.Body>
                <Card.Title>{desafio.nombre_reto}</Card.Title>
                <Card.Text>{desafio.descripcion}</Card.Text>
                <Button variant="warning" onClick={() => handleComplete(desafio.id)}>
                  Completar Reto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
