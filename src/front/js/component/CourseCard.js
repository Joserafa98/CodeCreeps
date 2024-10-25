import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Link } from 'react-router-dom';
import '../../styles/coursecard.css'; // Importa tu CSS aquí

const evaluarCodigo = (codigo, tests, lenguaje) => {
    return tests.map(test => {
        try {
            let result;
            if (lenguaje === 'javascript') {
                const userFunction = new Function('return ' + codigo)();
                result = userFunction(...test.input);
            } else if (lenguaje === 'python') {
                result = "Ejecutar Python no está implementado en esta demostración";
            }
            return {
                nombre: test.nombre,
                pasado: JSON.stringify(result) === JSON.stringify(test.expectedOutput),
                input: test.input,
                expectedOutput: test.expectedOutput,
                actualOutput: result,
                pista: test.pista,
            };
        } catch (error) {
            return {
                nombre: test.nombre,
                pasado: false,
                input: test.input,
                expectedOutput: test.expectedOutput,
                error: error.message,
                pista: test.pista,
            };
        }
    });
};

// Definición de los desafíos
const desafios = [
    {
        id: 1,
        titulo: "Suma de dos números",
        descripcion: "Crea una función que sume dos números y devuelva el resultado.",
        lenguaje: "javascript",
        codigoInicial: "function suma(a, b) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: [1, 2], expectedOutput: 3, pista: "Recuerda usar el operador de suma (+)." },
            { nombre: "Test 2", input: [0, 0], expectedOutput: 0, pista: "La suma de dos ceros siempre es cero." },
            { nombre: "Test 3", input: [-1, 1], expectedOutput: 0, pista: "Ten en cuenta los números negativos." },
            { nombre: "Test 4", input: [100, 200], expectedOutput: 300, pista: "Asegúrate de manejar números grandes." }
        ]
    },
    {
        id: 2,
        titulo: "Multiplicación de dos números",
        descripcion: "Crea una función que multiplique dos números y devuelva el resultado.",
        lenguaje: "javascript",
        codigoInicial: "function multiplicar(a, b) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: [2, 3], expectedOutput: 6, pista: "Recuerda usar el operador de multiplicación (*) para multiplicar." },
            { nombre: "Test 2", input: [0, 5], expectedOutput: 0, pista: "Cualquier número multiplicado por cero es cero." },
            { nombre: "Test 3", input: [-2, 3], expectedOutput: -6, pista: "Ten cuidado con los números negativos." },
            { nombre: "Test 4", input: [10, 10], expectedOutput: 100, pista: "Asegúrate de manejar números grandes." }
        ]
    },
    {
        id: 3,
        titulo: "Concatenación de cadenas",
        descripcion: "Crea una función que concatene dos cadenas y devuelva el resultado.",
        lenguaje: "javascript",
        codigoInicial: "function concatenar(cadena1, cadena2) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: ["Hola, ", "mundo!"], expectedOutput: "Hola, mundo!", pista: "Utiliza el operador de suma para concatenar." },
            { nombre: "Test 2", input: ["", "vacío"], expectedOutput: "vacío", pista: "Concatenar una cadena vacía no cambia el resultado." },
            { nombre: "Test 3", input: ["JavaScript", " es genial!"], expectedOutput: "JavaScript es genial!", pista: "Prueba a concatenar múltiples cadenas." },
            { nombre: "Test 4", input: ["123", "456"], expectedOutput: "123456", pista: "Recuerda que puedes concatenar números." }
        ]
    },
    {
        id: 4,
        titulo: "Verificación de Palíndromos",
        descripcion: "Crea una función que verifique si una palabra es un palíndromo.",
        lenguaje: "javascript",
        codigoInicial: "function esPalindromo(palabra) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: ["anilina"], expectedOutput: true, pista: "Un palíndromo se lee igual en ambas direcciones." },
            { nombre: "Test 2", input: ["hola"], expectedOutput: false, pista: "Esta palabra no es un palíndromo." },
            { nombre: "Test 3", input: ["AmanaplanacanalPanama"], expectedOutput: true, pista: "Ignora mayúsculas y minúsculas." },
            { nombre: "Test 4", input: ["12321"], expectedOutput: true, pista: "Los números también pueden ser palíndromos." }
        ]
    },
    {
        id: 5,
        titulo: "Ordenamiento de un Array",
        descripcion: "Crea una función que ordene un array de números.",
        lenguaje: "javascript",
        codigoInicial: "function ordenarArray(arr) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: [[3, 1, 2]], expectedOutput: [1, 2, 3], pista: "Usa el método .sort() para ordenar." },
            { nombre: "Test 2", input: [[-1, 0, 1]], expectedOutput: [-1, 0, 1], pista: "Maneja números negativos." },
            { nombre: "Test 3", input: [[10, 5, 8, 3]], expectedOutput: [3, 5, 8, 10], pista: "El array puede tener más de tres elementos." },
            { nombre: "Test 4", input: [[100, 50, 75, 25]], expectedOutput: [25, 50, 75, 100], pista: "Maneja números grandes." }
        ]
    },
    {
        id: 6,
        titulo: "Encontrar el Elemento Más Grande",
        descripcion: "Crea una función que encuentre el elemento más grande en un array.",
        lenguaje: "javascript",
        codigoInicial: "function encontrarMaximo(arr) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: [[1, 2, 3]], expectedOutput: 3, pista: "El elemento más grande tiene el mayor valor." },
            { nombre: "Test 2", input: [[-1, -2, -3]], expectedOutput: -1, pista: "El número más grande puede ser negativo." },
            { nombre: "Test 3", input: [[5, 5, 5]], expectedOutput: 5, pista: "Si todos son iguales, devuelve ese número." },
            { nombre: "Test 4", input: [[10, 20, 30, 5]], expectedOutput: 30, pista: "El array puede tener cualquier cantidad de elementos." }
        ]
    },
    {
        id: 7,
        titulo: "Cálculo de la Media",
        descripcion: "Crea una función que calcule la media de un array de números.",
        lenguaje: "javascript",
        codigoInicial: "function calcularMedia(arr) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: [[1, 2, 3]], expectedOutput: 2, pista: "Suma y divide por la cantidad de números." },
            { nombre: "Test 2", input: [[-1, -2, -3]], expectedOutput: -2, pista: "Maneja números negativos." },
            { nombre: "Test 3", input: [[10, 10, 10]], expectedOutput: 10, pista: "Si todos son iguales, la media será ese número." },
            { nombre: "Test 4", input: [[10, 20, 30, 40]], expectedOutput: 25, pista: "Suma los números y divide por 4." }
        ]
    },
    {
        id: 8,
        titulo: "Contar Vocales",
        descripcion: "Crea una función que cuente el número de vocales en una cadena.",
        lenguaje: "javascript",
        codigoInicial: "function contarVocales(cadena) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: ["Hola"], expectedOutput: 2, pista: "Cuenta mayúsculas y minúsculas." },
            { nombre: "Test 2", input: ["xyz"], expectedOutput: 0, pista: "Esta cadena no tiene vocales." },
            { nombre: "Test 3", input: ["aAeEiIoOuU"], expectedOutput: 10, pista: "Asegúrate de contar todas las vocales." },
            { nombre: "Test 4", input: ["12345"], expectedOutput: 0, pista: "Los números no cuentan como vocales." }
        ]
    },
    {
        id: 9,
        titulo: "Inversión de una Cadena",
        descripcion: "Crea una función que invierta una cadena.",
        lenguaje: "javascript",
        codigoInicial: "function invertirCadena(cadena) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: ["Hola"], expectedOutput: "aloH", pista: "Usa el método .split(), .reverse() y .join() para invertir." },
            { nombre: "Test 2", input: ["abcde"], expectedOutput: "edcba", pista: "Recuerda manejar cadenas de longitud variable." },
            { nombre: "Test 3", input: ["12345"], expectedOutput: "54321", pista: "Los números también pueden ser invertidos." },
            { nombre: "Test 4", input: [""], expectedOutput: "", pista: "Una cadena vacía sigue siendo una cadena vacía." }
        ]
    },
    {
        id: 10,
        titulo: "Generar un Array de Números Aleatorios",
        descripcion: "Crea una función que genere un array de números aleatorios.",
        lenguaje: "javascript",
        codigoInicial: "function generarAleatorios(cantidad) {\n  // Tu código aquí\n}",
        tests: [
            { nombre: "Test 1", input: [5], expectedOutput: 5, pista: "Deberías devolver un array de longitud 5." },
            { nombre: "Test 2", input: [0], expectedOutput: [], pista: "Si la cantidad es 0, el array debe estar vacío." },
            { nombre: "Test 3", input: [10], expectedOutput: 10, pista: "Deberías devolver un array de longitud 10." },
            { nombre: "Test 4", input: [1], expectedOutput: 1, pista: "Deberías devolver un array de longitud 1." }
        ]
    },
];

export default function RoadmapInteractivoProMejorado() {
    const [progresoActual, setProgresoActual] = useState(0);
    const [desafioActual, setDesafioActual] = useState(desafios[0]);
    const [codigo, setCodigo] = useState('');
    const [resultados, setResultados] = useState([]);
    const [output, setOutput] = useState('');
    const [mostrarPistas, setMostrarPistas] = useState(false);
    const [mostrarEnunciado, setMostrarEnunciado] = useState(false);
    const [mostrarTests, setMostrarTests] = useState(false);

    useEffect(() => {
        if (desafioActual) {
            setCodigo(desafioActual.codigoInicial);
        }
    }, [desafioActual]);

    const handleEvaluarCodigo = () => {
        const resultadosTests = evaluarCodigo(codigo, desafioActual.tests, desafioActual.lenguaje);
        setResultados(resultadosTests);
        setOutput(resultadosTests.map(r =>
            `${r.nombre}: ${r.pasado ? 'PASADO' : 'FALLADO'}\n` +
            `  Input: ${JSON.stringify(r.input)}\n` +
            `  Expected: ${JSON.stringify(r.expectedOutput)}\n` +
            `  Actual: ${r.error ? 'ERROR: ' + r.error : JSON.stringify(r.actualOutput)}\n`
        ).join('\n'));

        if (resultadosTests.every(r => r.pasado)) {
            setProgresoActual(prev => Math.max(prev, desafioActual.id));
        } else {
            setMostrarPistas(true);
        }
    };

    const handleSiguienteEjercicio = () => {
        if (progresoActual >= desafioActual.id) {
            const siguienteDesafio = desafios.find(d => d.id === desafioActual.id + 1);
            if (siguienteDesafio) {
                setDesafioActual(siguienteDesafio);
                setResultados([]);
                setOutput('');
                setMostrarPistas(false);
                setMostrarEnunciado(false);
                setMostrarTests(false);
            }
        } else {
            alert("Completa el ejercicio actual antes de avanzar al siguiente.");
        }
    };

    return (
        <div className="app-container">
            <header className="header flex flex-col items-center bg-gray-800 text-white py-4">
            <Link to="/challenges" className="text-lg text-orange-500 hover:underline mb-2">
                        CodeCreeps
                    </Link>
                <h2 className="text-2xl font-bold mb-2">{desafioActual.titulo}</h2>
                <div className="header-content flex flex-col items-center">
                    <button 
                        className="next-button flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-orange-500 hover:bg-orange-600 rounded shadow-md transition duration-300"
                        onClick={handleSiguienteEjercicio} 
                        disabled={progresoActual < desafioActual.id}
                    >
                        <span className="mr-2">🎃</span> {/* Emoji de Halloween */}
                        Siguiente Ejercicio
                    </button>
                </div>
            </header>
            <div className="main-content">
                <div className="editor-container">
                    <Editor
                        height="0%"
                        defaultLanguage={desafioActual.lenguaje}
                        value={codigo}
                        onChange={setCodigo}
                        theme="vs-dark"
                    />
                    <div className="footer">
                        <button className="run-button" onClick={handleEvaluarCodigo}>Enviar Código</button>
                    </div>
                </div>
                <div className="results-container">
                    <header className="results-header">
                        <h5>Resultados de los Tests</h5>
                        <button onClick={() => setMostrarEnunciado(!mostrarEnunciado)}>
                            {mostrarEnunciado ? "Ocultar Enunciado" : "Mostrar Enunciado"}
                        </button>
                        <button onClick={() => setMostrarTests(!mostrarTests)}>
                            {mostrarTests ? "Ocultar Tests" : "Mostrar Tests"}
                        </button>
                    </header>
                    {mostrarEnunciado && (
                        <div className="enunciado">
                            <p>{desafioActual.descripcion}</p>
                        </div>
                    )}
                    {mostrarTests && (
                        <div className="tests">
                            <h6>Tests:</h6>
                            <ul>
                                {desafioActual.tests.map((test, index) => (
                                    <li key={index}>
                                        {test.nombre}: Input {JSON.stringify(test.input)}, Esperado {JSON.stringify(test.expectedOutput)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="results">
                        {resultados.length > 0 ? (
                            resultados.map((resultado, index) => (
                                <div key={index} className={`result-card ${resultado.pasado ? 'pass' : 'fail'}`}>
                                    <h6>{resultado.nombre}: {resultado.pasado ? 'PASADO' : 'FALLADO'}</h6>
                                    <p><strong>Input:</strong> {JSON.stringify(resultado.input)}</p>
                                    <p><strong>Expected:</strong> {JSON.stringify(resultado.expectedOutput)}</p>
                                    <p><strong>Actual:</strong> {resultado.error ? 'ERROR: ' + resultado.error : JSON.stringify(resultado.actualOutput)}</p>
                                    {resultado.pista && <small className="hint">{resultado.pista}</small>}
                                </div>
                            ))
                        ) : (
                            <div className="info">Ejecuta el código para ver los resultados de los tests.</div>
                        )}
                    </div>
                    {mostrarPistas && (
                        <div className="hints">
                            <h5>Pistas:</h5>
                            {resultados.map((resultado, index) => (
                                !resultado.pasado && <div key={index}>{resultado.pista}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}