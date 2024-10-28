import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import Confetti from 'react-confetti';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../styles/coursecard.css";

// Función para evaluar el código y retornar los resultados de los tests
const evaluarCodigo = (codigo, tests, lenguaje) => {
    if (!Array.isArray(tests)) {
        console.error("No se encontraron tests para evaluar.");
        return [];
    }

    return tests.map((test, index) => {
        try {
            let result;
            if (lenguaje.toLowerCase() === 'javascript') {
                const userFunction = new Function('return ' + codigo)();
                result = userFunction(...test.input);
            } else if (lenguaje.toLowerCase() === 'python') {
                throw new Error("La evaluación de código Python no está implementada.");
            }
            return {
                nombre: `Test ${index + 1}`,
                pasado: JSON.stringify(result) === JSON.stringify(test.output),
                input: test.input,
                expectedOutput: test.output,
                actualOutput: result,
                error: null,
                pista: test.pista,
            };
        } catch (error) {
            return {
                nombre: `Test ${index + 1}`,
                pasado: false,
                input: test.input,
                expectedOutput: test.output,
                actualOutput: null,
                error: error.message,
                pista: test.pista,
            };
        }
    });
};

export default function Challenge() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [desafioActual, setDesafioActual] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mostrarPistas, setMostrarPistas] = useState(false);
    const [mostrarConfeti, setMostrarConfeti] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const fetchDesafio = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/retos/${id}`);
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                const desafio = await response.json();

                if (desafio) {
                    setDesafioActual(desafio);
                    setCodigo(desafio.codigo || `// Aquí tienes un ejemplo de código para comenzar\n// Escribe tu lógica aquí\n\nfunction miFuncion() {\n  // Código a evaluar\n}\n`);
                } else {
                    navigate("/challenges");
                }
            } catch (error) {
                console.error('Error al obtener el desafío:', error);
                navigate("/challenges");
            }
        };

        fetchDesafio();
    }, [id, navigate]);

    const handleEvaluarCodigo = () => {
        if (!desafioActual) return;

        const resultadosTests = evaluarCodigo(codigo, desafioActual.tests, desafioActual.lenguaje);
        setResultados(resultadosTests);

        // Verifica si todos los tests pasaron
        if (resultadosTests.every(r => r.pasado)) {
            setMostrarConfeti(true);  // Muestra el confeti

            // Oculta el confeti después de 3 segundos
            setTimeout(() => {
                setMostrarConfeti(false);
                navigate("/challenges");
            }, 3000);
        } else {
            alert("Algunos tests no han pasado. Intenta nuevamente.");
        }
    };

    return (
        <div className="halloween-challenge" style={{ backgroundColor: '#222', color: '#FF6600' }}>
            {mostrarConfeti && <Confetti width={windowSize.width} height={windowSize.height} />}
            {desafioActual ? (
                <div>
                    <header className="challenge-header">
                        <Link to="/challenges" className="logo">CodeCreeps</Link>
                        <h1>{desafioActual.nombre_reto}</h1>
                        <button className="back-button" onClick={() => navigate("/challenges")}>
                            Volver Atrás 👻
                        </button>
                    </header>

                    <div className="challenge-content">
                        <main className="challenge-main">
                            <section className="code-section">
                                <Editor
                                    height="400px"
                                    defaultLanguage={desafioActual.lenguaje.toLowerCase()}
                                    value={codigo}
                                    onChange={setCodigo}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                    }}
                                />
                                <button className="run-button" onClick={handleEvaluarCodigo}>
                                    Ejecutar Código 🧪
                                </button>
                            </section>

                            <section className="results-section">
                                <div className="results-header">
                                    <h2>Resultados</h2>
                                    <div className="toggle-buttons">
                                        <button onClick={() => setMostrarPistas(!mostrarPistas)}>
                                            {mostrarPistas ? "Ocultar Pistas" : "Mostrar Pistas"}
                                        </button>
                                    </div>
                                </div>

                                <div className="results">
                                    {resultados.length > 0 ? (
                                        resultados.map((resultado, index) => (
                                            <div key={index} className={`result-card ${resultado.pasado ? 'pass' : 'fail'}`}>
                                                <h4>{resultado.nombre}: {resultado.pasado ? '✅ PASADO' : '❌ FALLADO'}</h4>
                                                <p><strong>Input:</strong> {JSON.stringify(resultado.input)}</p>
                                                <p><strong>Esperado:</strong> {JSON.stringify(resultado.expectedOutput)}</p>
                                                <p><strong>Obtenido:</strong> {resultado.error ? 'ERROR: ' + resultado.error : JSON.stringify(resultado.actualOutput)}</p>
                                                {mostrarPistas && resultado.pista && <p><strong>Pista:</strong> {resultado.pista}</p>}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay resultados aún. Ejecuta tu código para ver los resultados.</p>
                                    )}
                                </div>
                            </section>
                        </main>

                        <aside className="challenge-aside">
                            <h2>Descripción</h2>
                            <p>{desafioActual.descripcion}</p>
                        </aside>
                    </div>
                </div>
            ) : (
                <p>Cargando desafío...</p>
            )}
        </div>
    );
}
