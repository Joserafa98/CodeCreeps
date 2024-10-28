import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el Link
import '../../styles/challengelist.css';

const desafiosEstaticos = [
    // Desafíos de JavaScript (más fácil a más difícil)
    { 
        id: 1, 
        nombre_reto: "Cosecha de Manzanas", 
        descripcion: "Escribe una función que sume dos números para contar manzanas recolectadas.", 
        dificultad: "Fácil", 
        lenguaje: "JavaScript", 
        codigo: `function cosechaManzanas(a, b) {
            // Tu tarea: Suma los dos números
        }`, 
        tests: [
            { input: [5, 3], output: 8 }, // Ahora suma 5 y 3
            { input: [10, 20], output: 30 }, // Suma 10 y 20
            { input: [-2, 2], output: 0 }, // Suma -2 y 2
            { input: [0, 0], output: 0 }, // Suma de ceros
        ],
        isblocked: false 
    },
    
    { 
        id: 2, 
        nombre_reto: "Detectar Espectros", 
        descripcion: "Verifica si una palabra es un palíndromo, ¡atento a los espectros!", 
        dificultad: "Fácil", 
        lenguaje: "JavaScript", 
        codigo: `function esEspectro(palabra) {
            // Tu tarea: Comprueba si la palabra es un palíndromo
        }`, 
        tests: [
            { input: ["oso"], output: true },
            { input: ["murcielago"], output: false },
            { input: ["Anita lava la tina"], output: true },
        ],
        isblocked: false 
    },
    { 
        id: 3, 
        nombre_reto: "Ordenar Cuentos de Hadas", 
        descripcion: "Ordena un arreglo de historias de menor a mayor en longitud.", 
        dificultad: "Intermedio", 
        lenguaje: "JavaScript", 
        codigo: `function ordenarCuentos(cuentos) {
            // Tu tarea: Ordena el arreglo de cuentos
        }`, 
        tests: [
            { input: [["Caperucita", "La Bella Durmiente", "Hansel y Gretel"]], output: ["Caperucita", "Hansel y Gretel", "La Bella Durmiente"] },
            { input: [["A", "B", "C"]], output: ["A", "B", "C"] },
            { input: [[]], output: [] },
        ],
        isblocked: false 
    },
    { 
        id: 4, 
        nombre_reto: "Caminos de Fantasmas", 
        descripcion: "Genera una secuencia de números fantasmas hasta el n-ésimo número, como si fueran pasos de un fantasma.", 
        dificultad: "Intermedio", 
        lenguaje: "JavaScript", 
        codigo: `function caminosDeFantasmas(n) {
            // Tu tarea: Genera una secuencia de fantasmas
        }`, 
        tests: [
            { input: [4], output: [0, 1, 2, 3] },
            { input: [0], output: [] },
            { input: [2], output: [0, 1] },
        ],
        isblocked: false 
    },
    { 
        id: 5, 
        nombre_reto: "Caza de Sombras", 
        descripcion: "Encuentra el primer número que se repite en una lista de sombras.", 
        dificultad: "Difícil", 
        lenguaje: "JavaScript", 
        codigo: `function cazaSombras(arr) {
            // Tu tarea: Encuentra el primer número repetido
        }`, 
        tests: [
            { input: [[4, 5, 6, 4]], output: 4 },
            { input: [[1, 2, 3, 2]], output: 2 },
            { input: [[7, 8, 9]], output: undefined },
        ],
        isblocked: false 
    },

    // Desafíos de Python (más fácil a más difícil)
    { 
        id: 6, 
        nombre_reto: "Cuento de Vocales", 
        descripcion: "Cuenta el número de vocales en una historia terrorífica.", 
        dificultad: "Fácil", 
        lenguaje: "Python", 
        codigo: `def contar_vocales(texto):
            # Tu tarea: Cuenta las vocales en el texto
        `, 
        tests: [
            { input: ["La noche oscura"], output: 6 },
            { input: ["Fantasmas"], output: 3 },
            { input: ["xyz"], output: 0 },
        ],
        isblocked: false 
    },
    { 
        id: 7, 
        nombre_reto: "Suma de Sombras", 
        descripcion: "Suma los elementos de dos listas de sombras y devuelve una nueva lista con los resultados.", 
        dificultad: "Intermedio", 
        lenguaje: "Python", 
        codigo: `def suma_sombras(lista1, lista2):
            # Tu tarea: Suma elementos de dos listas
        `, 
        tests: [
            { input: [[1, 2, 3], [4, 5, 6]], output: [5, 7, 9] },
            { input: [[0], [0]], output: [0] },
            { input: [[], []], output: [] },
        ],
        isblocked: false 
    },
    { 
        id: 8, 
        nombre_reto: "Invocar Encantamientos", 
        descripcion: "Invierte una cadena de texto mágica, como si estuvieras encantando palabras.", 
        dificultad: "Intermedio", 
        lenguaje: "Python", 
        codigo: `def invocar_encantamientos(cadena):
            # Tu tarea: Invierte la cadena de texto
        `, 
        tests: [
            { input: ["abracadabra"], output: "arbadacarba" },
            { input: ["mago"], output: "ogam" },
            { input: [""], output: "" },
        ],
        isblocked: false 
    },
    { 
        id: 9, 
        nombre_reto: "Cazador de Primos", 
        descripcion: "Verifica si un número es primo, ¡cuidado con las criaturas de la oscuridad!", 
        dificultad: "Difícil", 
        lenguaje: "Python", 
        codigo: `def es_primo(n):
            # Tu tarea: Verifica si el número es primo
        `, 
        tests: [
            { input: [13], output: true },
            { input: [4], output: false },
            { input: [17], output: true },
        ],
        isblocked: false 
    },
    { 
        id: 10, 
        nombre_reto: "Baile de Calaveras", 
        descripcion: "Calcula el factorial de un número dado (¡cuántas calaveras puedes contar!).", 
        dificultad: "Difícil", 
        lenguaje: "Python", 
        codigo: `def factorial_calaveras(n):
            # Tu tarea: Calcula el factorial
        `, 
        tests: [
            { input: [5], output: 120 },
            { input: [0], output: 1 },
            { input: [1], output: 1 },
        ],
        isblocked: false 
    },
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const ChallengesList = () => {
    const [desafiosList, setDesafiosList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const setupDesafios = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/retos`);
            const data = await response.json();

            await fetch(`${process.env.BACKEND_URL}/api/retos/clear`, { method: 'DELETE' });

            await Promise.all(desafiosEstaticos.map(desafio => 
                fetch(`${process.env.BACKEND_URL}/api/retos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(desafio),
                })
            ));

            const updatedResponse = await fetch(`${process.env.BACKEND_URL}/api/retos`);
            const updatedData = await updatedResponse.json();

            const shuffledDesafios = shuffleArray(updatedData);
            setDesafiosList(shuffledDesafios);
        } catch (error) {
            setError('Error al cargar los desafíos.');
            console.error('Error fetching desafios:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setupDesafios();
    }, []);

    const reiniciarDesafios = async () => {
        try {
            await setupDesafios();
        } catch (error) {
            setError('Error al reiniciar los desafíos.');
            console.error('Error reiniciando desafios:', error);
        }
    };

    if (loading) return <div className="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🎃 Lista de Desafíos de Halloween 🎃</h2>
            <button onClick={reiniciarDesafios} style={styles.button}>Reiniciar Desafíos</button>
            <div style={styles.cardContainer}>
                {desafiosList.map((desafio) => (
                    <Link key={desafio.id} to={`/challenges/${desafio.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>{desafio.nombre_reto}</h3>
                            <p style={styles.cardDescription}>{desafio.descripcion}</p>
                            <div style={styles.tags}>
                                <span style={styles.tag}>{desafio.dificultad}</span>
                                <span style={styles.tag}>{desafio.lenguaje}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Estilos CSS en línea
const styles = {
    container: {
        fontFamily: "'Creepster', cursive",
        color: '#FF6600',
        backgroundColor: '#222',
        padding: '20px',
        textAlign: 'center',
        minHeight: '100vh',
    },
    title: {
        fontSize: '2.5rem',
        color: '#FF6600',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#FF6600',
        color: '#222',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginBottom: '20px',
        transition: 'background-color 0.3s ease',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '0 20px',
    },
    card: {
        backgroundColor: '#333',
        color: '#FF6600',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        position: 'relative',
        zIndex: 2,
    },
    cardDescription: {
        fontSize: '1rem',
        color: '#FFCC00',
        position: 'relative',
        zIndex: 2,
    },
    tags: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    tag: {
        backgroundColor: '#444',
        color: '#FF6600',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '0.8rem',
    },
};

export default ChallengesList;