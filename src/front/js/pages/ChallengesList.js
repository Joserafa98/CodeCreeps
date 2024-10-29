import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            { input: [5, 3], output: 8 },
            { input: [10, 20], output: 30 },
            { input: [-2, 2], output: 0 },
            { input: [0, 0], output: 0 },
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

export default function ChallengesList() {
    const [desafiosList, setDesafiosList] = useState([]);
    const [filteredDesafios, setFilteredDesafios] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDificultad, setSelectedDificultad] = useState('Todos');
    const [selectedLenguaje, setSelectedLenguaje] = useState('Todos');

    useEffect(() => {
        const setupDesafios = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/retos`);
                const data = await response.json();

                // Limpiar los retos existentes
                await fetch(`${process.env.BACKEND_URL}/api/retos/clear`, { method: 'DELETE' });

                // Agregar los desafíos estáticos
                await Promise.all(desafiosEstaticos.map(desafio =>
                    fetch(`${process.env.BACKEND_URL}/api/retos`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(desafio),
                    })
                ));

                const updatedResponse = await fetch(`${process.env.BACKEND_URL}/api/retos`);
                const updatedData = await updatedResponse.json();

                const shuffledDesafios = shuffleArray(updatedData);
                setDesafiosList(shuffledDesafios);
                setFilteredDesafios(shuffledDesafios);
            } catch (error) {
                setError('Error al cargar los desafíos.');
                console.error('Error fetching desafios:', error);
            } finally {
                setLoading(false);
            }
        };

        setupDesafios();
    }, []);

    const reiniciarDesafios = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/retos`);
            const data = await response.json();

            // Limpiar los retos existentes
            await fetch(`${process.env.BACKEND_URL}/api/retos/clear`, { method: 'DELETE' });

            // Agregar los desafíos estáticos
            await Promise.all(desafiosEstaticos.map(desafio =>
                fetch(`${process.env.BACKEND_URL}/api/retos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(desafio),
                })
            ));

            const updatedResponse = await fetch(`${process.env.BACKEND_URL}/api/retos`);
            const updatedData = await updatedResponse.json();

            const shuffledDesafios = shuffleArray(updatedData);
            setDesafiosList(shuffledDesafios);
            setFilteredDesafios(shuffledDesafios);
            setError(null);
        } catch (error) {
            setError('Error al reiniciar los desafíos.');
            console.error('Error reiniciando desafios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = () => {
        let filtered = desafiosList;

        if (selectedDificultad !== 'Todos') {
            filtered = filtered.filter(desafio => desafio.dificultad === selectedDificultad);
        }

        if (selectedLenguaje !== 'Todos') {
            filtered = filtered.filter(desafio => desafio.lenguaje === selectedLenguaje);
        }

        setFilteredDesafios(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [selectedDificultad, selectedLenguaje, desafiosList]);

    if (loading) return <div className="spinner"><div></div></div>;
    if (error) return <p style={{ color: '#FF0000', textAlign: 'center', fontSize: '1.2rem', marginTop: '20px' }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🎃 Lista de Desafíos de Halloween 🎃</h2>
            <button onClick={reiniciarDesafios} style={styles.button}>Reiniciar Desafíos</button>

            <div style={styles.filters}>
                <label htmlFor="dificultad" style={styles.label}>Dificultad:</label>
                <select 
                    id="dificultad" 
                    value={selectedDificultad} 
                    onChange={(e) => setSelectedDificultad(e.target.value)} 
                    style={styles.select}
                >
                    <option value="Todos">Todos los niveles</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Difícil">Difícil</option>
                </select>

                <label htmlFor="lenguaje" style={styles.label}>Lenguaje:</label>
                <select 
                    id="lenguaje" 
                    value={selectedLenguaje} 
                    onChange={(e) => setSelectedLenguaje(e.target.value)} 
                    style={styles.select}
                >
                    <option value="Todos">Todos los lenguajes</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                </select>
            </div>

            <div style={styles.cardContainer}>
                {filteredDesafios.map((desafio) => (
                    <Link key={desafio.id} to={`/challenges/${desafio.id}`} style={styles.cardLink}>
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>{desafio.nombre_reto}</h3>
                            <p style={styles.cardDescription}>{desafio.descripcion}</p>
                            <div style={styles.tags}>
                                <span style={{...styles.tag, ...styles.tagDificultad(desafio.dificultad)}}>{desafio.dificultad}</span>
                                <span style={{...styles.tag, ...styles.tagLenguaje(desafio.lenguaje)}}>{desafio.lenguaje}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "'Creepster', cursive",
        color: '#FF6600',
        backgroundColor: '#1A1A1A',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Cg fill=\'%23222222\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M0  0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z\'/%3E%3C/g%3E%3C/svg%3E")',
        padding: '20px',
        textAlign: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '30px',
        textShadow: '3px 3px #000, 0 0 10px #FF6600, 0 0 20px #FF6600',
        letterSpacing: '2px',
    },
    button: {
        backgroundColor: '#FF6600',
        color: '#1A1A1A',
        border: 'none',
        borderRadius: '5px',
        padding: '12px 25px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginBottom: '30px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(255, 102, 0, 0.3)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    filters: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    },
    label: {
        fontSize: '1.1rem',
        marginRight: '10px',
        textShadow: '1px 1px #000',
    },
    select: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '2px solid #FF6600',
        backgroundColor: '#333',
        color: '#FF6600',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        padding: '0 20px',
    },
    cardLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    card: {
        backgroundColor: 'rgba(68, 68, 68, 0.8)',
        color: '#FF6600',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 102, 0, 0.1) inset',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid transparent',
    },
    cardTitle: {
        fontSize: '1.8rem',
        marginBottom: '15px',
        textShadow: '2px 2px #000',
        position: 'relative',
    },
    cardDescription: {
        fontSize: '1.1rem',
        color: '#FFCC00',
        marginBottom: '20px',
        lineHeight: '1.4',
    },
    tags: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    tag: {
        borderRadius: '20px',
        padding: '6px 12px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
    },
    tagDificultad: (dificultad) => ({
        backgroundColor: dificultad === 'Fácil' ? '#4CAF50' : dificultad === 'Intermedio' ? '#FFC107' : '#F44336',
        color: dificultad === 'Intermedio' ? '#000' : '#FFF',
    }),
    tagLenguaje: (lenguaje) => ({
        backgroundColor: lenguaje === 'JavaScript' ? '#F0DB4F' : '#3572A5',
        color: lenguaje === 'JavaScript' ? '#000' : '#FFF',
    }),
};