import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/lightsOut.css';
import calabazas from "../../img/calabazas.jpg"; 

const LightsOut = () => {
    const navigate = useNavigate();
    const size = 8; 
    const totalGames = 12; 
    const [game, setGame] = useState(0);
    const [squares, setSquares] = useState(Array(size * size).fill(false));

    // Ejemplo de configuración de juegos
    const gamesList = {
        0: [7, 11, 12, 13, 17],
        1: [0, 1, 2, 8, 9],
        2: [3, 4, 5, 10, 11],
        3: [12, 13, 14, 20, 21],
        4: [16, 17, 18, 24, 25],
        5: [19, 20, 21, 27, 28],
        6: [22, 23, 30, 31, 32],
        7: [4, 5, 6, 12, 13],
        8: [2, 6, 10, 14, 18],
        9: [24, 25, 26, 30, 31],
        10: [1, 2, 3, 4, 5, 6, 7, 8, 9], // Todo encendido
        11: [0, 3, 5, 9, 14, 21, 27] // Una configuración personalizada
    };

    useEffect(() => {
        setSquares(Array(size * size).fill(false).map((_, i) => gamesList[game]?.includes(i) || false));
    }, [game]);

    const toggleSquare = (index) => {
        const newSquares = [...squares];
        const toggle = (i) => {
            if (i >= 0 && i < size * size) newSquares[i] = !newSquares[i];
        };

        toggle(index);
        if (index % size !== 0) toggle(index - 1); // izquierda
        if (index % size !== size - 1) toggle(index + 1); // derecha
        if (index - size >= 0) toggle(index - size); // arriba
        if (index + size < size * size) toggle(index + size); // abajo
        setSquares(newSquares);
    };

    const handleNextClick = () => {
        setGame((prevGame) => (prevGame + 1) % totalGames);
    };

    return (
        <div 
            className="lights-out-container" 
            style={{
                backgroundImage: `url(${calabazas})`
            }}
        >
            <h1 className="lights-out-title">Lights Out Game</h1>
            <div className="game-area">
                <div className="lights-out-grid">
                    {squares.map((isOn, index) => (
                        <div
                            key={index}
                            className={`square ${isOn ? 'on' : 'off'}`}
                            onClick={() => toggleSquare(index)}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <button onClick={handleNextClick} className="btn-halloween fade-in">Next Level</button>
                <button onClick={() => navigate('/miniJuegos')} className="btn-halloween fade-in">Volver</button>
            </div>
        </div>
    );
};

export default LightsOut;