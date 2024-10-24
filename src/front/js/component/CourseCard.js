import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Editor from "@monaco-editor/react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Simulación de una función de IA para evaluar código
const evaluarCodigo = (codigo, tests, lenguaje) => {
    return tests.map(test => {
        try {
            let result;
            if (lenguaje === 'javascript') {
                const userFunction = new Function('return ' + codigo)();
                result = userFunction(...test.input);
            } else if (lenguaje === 'python') {
                result = "Python execution not implemented in this demo";
            }
            return {
                nombre: test.nombre,
                pasado: JSON.stringify(result) === JSON.stringify(test.expectedOutput),
                input: test.input,
                expectedOutput: test.expectedOutput,
                actualOutput: result,
                pista: test.pista
            };
        } catch (error) {
            return {
                nombre: test.nombre,
                pasado: false,
                input: test.input,
                expectedOutput: test.expectedOutput,
                error: error.message,
                pista: test.pista
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
            {
                nombre: "Test 1",
                input: [1, 2],
                expectedOutput: 3,
                pista: "Recuerda usar el operador de suma (+) para sumar los dos números."
            },
            {
                nombre: "Test 2",
                input: [0, 0],
                expectedOutput: 0,
                pista: "La suma de dos ceros siempre es cero."
            },
            {
                nombre: "Test 3",
                input: [-1, 1],
                expectedOutput: 0,
                pista: "Ten en cuenta que puedes sumar números negativos y positivos."
            },
            {
                nombre: "Test 4",
                input: [100, 200],
                expectedOutput: 300,
                pista: "Asegúrate de que tu función pueda manejar números grandes."
            }
        ]
    },
    {
        id: 2,
        titulo: "Multiplicación de dos números",
        descripcion: "Crea una función que multiplique dos números y devuelva el resultado.",
        lenguaje: "javascript",
        codigoInicial: "function multiplicar(a, b) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: [2, 3],
                expectedOutput: 6,
                pista: "Recuerda usar el operador de multiplicación (*) para multiplicar los dos números."
            },
            {
                nombre: "Test 2",
                input: [0, 5],
                expectedOutput: 0,
                pista: "Cualquier número multiplicado por cero es cero."
            },
            {
                nombre: "Test 3",
                input: [-2, 3],
                expectedOutput: -6,
                pista: "Ten cuidado con los números negativos."
            },
            {
                nombre: "Test 4",
                input: [10, 10],
                expectedOutput: 100,
                pista: "Asegúrate de que tu función pueda manejar números grandes."
            }
        ]
    },
    {
        id: 3,
        titulo: "Concatenación de cadenas",
        descripcion: "Crea una función que concatene dos cadenas y devuelva el resultado.",
        lenguaje: "javascript",
        codigoInicial: "function concatenar(cadena1, cadena2) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: ["Hola, ", "mundo!"],
                expectedOutput: "Hola, mundo!",
                pista: "Utiliza el operador de suma para concatenar cadenas."
            },
            {
                nombre: "Test 2",
                input: ["", "vacío"],
                expectedOutput: "vacío",
                pista: "Concatenar una cadena vacía no cambia el resultado."
            },
            {
                nombre: "Test 3",
                input: ["JavaScript", " es genial!"],
                expectedOutput: "JavaScript es genial!",
                pista: "Prueba a concatenar múltiples cadenas."
            },
            {
                nombre: "Test 4",
                input: ["123", "456"],
                expectedOutput: "123456",
                pista: "Recuerda que también puedes concatenar números como cadenas."
            }
        ]
    },
    {
        id: 4,
        titulo: "Verificación de Palíndromos",
        descripcion: "Crea una función que verifique si una palabra es un palíndromo.",
        lenguaje: "javascript",
        codigoInicial: "function esPalindromo(palabra) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: ["anilina"],
                expectedOutput: true,
                pista: "Recuerda que un palíndromo se lee igual de izquierda a derecha y de derecha a izquierda."
            },
            {
                nombre: "Test 2",
                input: ["hola"],
                expectedOutput: false,
                pista: "Esta palabra no es un palíndromo."
            },
            {
                nombre: "Test 3",
                input: ["AmanaplanacanalPanama"],
                expectedOutput: true,
                pista: "Ignora mayúsculas y minúsculas al verificar palíndromos."
            },
            {
                nombre: "Test 4",
                input: ["12321"],
                expectedOutput: true,
                pista: "Los números también pueden ser palíndromos."
            }
        ]
    },
    {
        id: 5,
        titulo: "Ordenamiento de un Array",
        descripcion: "Crea una función que ordene un array de números.",
        lenguaje: "javascript",
        codigoInicial: "function ordenarArray(arr) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: [[3, 1, 2]],
                expectedOutput: [1, 2, 3],
                pista: "Puedes usar el método .sort() para ordenar arrays."
            },
            {
                nombre: "Test 2",
                input: [[-1, 0, 1]],
                expectedOutput: [-1, 0, 1],
                pista: "Asegúrate de que tu función maneje números negativos."
            },
            {
                nombre: "Test 3",
                input: [[10, 5, 8, 3]],
                expectedOutput: [3, 5, 8, 10],
                pista: "Recuerda que el array puede tener más de tres elementos."
            },
            {
                nombre: "Test 4",
                input: [[100, 50, 75, 25]],
                expectedOutput: [25, 50, 75, 100],
                pista: "Asegúrate de que tu función pueda manejar números grandes."
            }
        ]
    },
    {
        id: 6,
        titulo: "Encontrar el Elemento Más Grande",
        descripcion: "Crea una función que encuentre el elemento más grande en un array.",
        lenguaje: "javascript",
        codigoInicial: "function encontrarMaximo(arr) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: [[1, 2, 3]],
                expectedOutput: 3,
                pista: "Recuerda que el elemento más grande es el que tiene el mayor valor."
            },
            {
                nombre: "Test 2",
                input: [[-1, -2, -3]],
                expectedOutput: -1,
                pista: "El número más grande puede ser negativo."
            },
            {
                nombre: "Test 3",
                input: [[5, 5, 5]],
                expectedOutput: 5,
                pista: "Si todos los números son iguales, devuelve ese número."
            },
            {
                nombre: "Test 4",
                input: [[10, 20, 30, 5]],
                expectedOutput: 30,
                pista: "Recuerda que el array puede tener cualquier cantidad de elementos."
            }
        ]
    },
    {
        id: 7,
        titulo: "Cálculo de la Media",
        descripcion: "Crea una función que calcule la media de un array de números.",
        lenguaje: "javascript",
        codigoInicial: "function calcularMedia(arr) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: [[1, 2, 3]],
                expectedOutput: 2,
                pista: "Suma todos los números y divídelos por la cantidad de números."
            },
            {
                nombre: "Test 2",
                input: [[-1, -2, -3]],
                expectedOutput: -2,
                pista: "Recuerda que la media puede ser un número negativo."
            },
            {
                nombre: "Test 3",
                input: [[5, 5, 5]],
                expectedOutput: 5,
                pista: "Si todos los números son iguales, la media será ese número."
            },
            {
                nombre: "Test 4",
                input: [[10, 20, 30, 40]],
                expectedOutput: 25,
                pista: "Asegúrate de manejar arrays de diferentes longitudes."
            }
        ]
    },
    {
        id: 8,
        titulo: "Contar Vocales",
        descripcion: "Crea una función que cuente las vocales en una cadena.",
        lenguaje: "javascript",
        codigoInicial: "function contarVocales(cadena) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: ["Hola"],
                expectedOutput: 2,
                pista: "Recuerda contar todas las vocales, tanto mayúsculas como minúsculas."
            },
            {
                nombre: "Test 2",
                input: ["xyz"],
                expectedOutput: 0,
                pista: "Si no hay vocales, el resultado será cero."
            },
            {
                nombre: "Test 3",
                input: ["AEIOU"],
                expectedOutput: 5,
                pista: "Asegúrate de contar las vocales mayúsculas."
            },
            {
                nombre: "Test 4",
                input: ["Una cadena con varias vocales"],
                expectedOutput: 9,
                pista: "No olvides contar todas las vocales en la cadena."
            }
        ]
    },
    {
        id: 9,
        titulo: "Filtrar Números Pares",
        descripcion: "Crea una función que filtre y devuelva solo los números pares de un array.",
        lenguaje: "javascript",
        codigoInicial: "function filtrarPares(arr) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: [[1, 2, 3, 4]],
                expectedOutput: [2, 4],
                pista: "Recuerda que un número es par si es divisible entre 2."
            },
            {
                nombre: "Test 2",
                input: [[1, 3, 5]],
                expectedOutput: [],
                pista: "Si no hay números pares, el resultado será un array vacío."
            },
            {
                nombre: "Test 3",
                input: [[2, 4, 6, 8]],
                expectedOutput: [2, 4, 6, 8],
                pista: "Todos los números de este array son pares."
            },
            {
                nombre: "Test 4",
                input: [[10, 21, 32, 43]],
                expectedOutput: [10, 32],
                pista: "Filtra solo los números que son pares."
            }
        ]
    },
    {
        id: 10,
        titulo: "Invertir una Cadena",
        descripcion: "Crea una función que invierta una cadena.",
        lenguaje: "javascript",
        codigoInicial: "function invertirCadena(cadena) {\n  // Tu código aquí\n}",
        tests: [
            {
                nombre: "Test 1",
                input: ["Hola"],
                expectedOutput: "aloH",
                pista: "Puedes usar el método .split(), .reverse() y .join() para invertir la cadena."
            },
            {
                nombre: "Test 2",
                input: ["1234"],
                expectedOutput: "4321",
                pista: "Los números también se pueden invertir como cadenas."
            },
            {
                nombre: "Test 3",
                input: ["madre"],
                expectedOutput: "erdam",
                pista: "Asegúrate de manejar cadenas con más de cinco caracteres."
            },
            {
                nombre: "Test 4",
                input: ["!@#"],
                expectedOutput: "#@!",
                pista: "Recuerda que los caracteres especiales también cuentan."
            }
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
            }
        } else {
            alert("Completa el ejercicio actual antes de avanzar al siguiente.");
        }
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column" style={{ backgroundColor: '#222', color: '#fff' }}>
            <Row className="flex-grow-1">
                <Col md={8} className="d-flex flex-column p-0" style={{ height: '100vh' }}>
                    <div className="bg-dark text-warning p-2">
                        <h3>{desafioActual.titulo}</h3>
                    </div>
                    <Editor
                        height="70%"
                        defaultLanguage={desafioActual.lenguaje}
                        value={codigo}
                        onChange={setCodigo}
                        theme="vs-dark"
                    />
                    <div className="bg-dark text-warning p-2 d-flex justify-content-between align-items-center">
                        <span>Terminal</span>
                        <Button variant="warning" onClick={handleEvaluarCodigo}>Ejecutar</Button>
                    </div>
                    <div className="flex-grow-1 bg-black text-light p-2 overflow-auto" style={{ fontFamily: 'monospace' }}>
                        {output}
                    </div>
                </Col>
                <Col md={4} className="d-flex flex-column p-2" style={{ height: '100vh' }}>
                    <div className="bg-dark text-warning p-2">
                        <h5>Resultados de los Tests</h5>
                    </div>
                    <div className="flex-grow-1 bg-black text-light p-2 overflow-auto" style={{ fontFamily: 'monospace' }}>
                        {resultados.length > 0 ? (
                            resultados.map((resultado, index) => (
                                <Card key={index} className={`mb-2 ${resultado.pasado ? 'border-success' : 'border-danger'}`}>
                                    <Card.Body>
                                        <Card.Title>{resultado.nombre}: {resultado.pasado ? 'PASADO' : 'FALLADO'}</Card.Title>
                                        <Card.Text>
                                            <strong>Input:</strong> {JSON.stringify(resultado.input)}<br />
                                            <strong>Expected:</strong> {JSON.stringify(resultado.expectedOutput)}<br />
                                            <strong>Actual:</strong> {resultado.error ? 'ERROR: ' + resultado.error : JSON.stringify(resultado.actualOutput)}<br />
                                            {resultado.pista && <small className="text-muted">{resultado.pista}</small>}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <Alert variant="info">Ejecuta el código para ver los resultados de los tests.</Alert>
                        )}
                    </div>
                    {mostrarPistas && (
                        <div className="bg-dark text-danger p-2">
                            <h5>Pistas:</h5>
                            {resultados.map((resultado, index) => (
                                !resultado.pasado && <div key={index}>{resultado.pista}</div>
                            ))}
                        </div>
                    )}
                    <Button 
                        variant="success" 
                        onClick={handleSiguienteEjercicio} 
                        disabled={progresoActual < desafioActual.id}
                        className="m-2"
                    >
                        Siguiente Ejercicio
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
