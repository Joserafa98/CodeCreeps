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
        // Agrega más juegos según sea necesario
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
                backgroundImage: `url(${calabazas})`,
                // no necesitas esto ya que está en el CSS
            }}
        >
            <h1 className="lights-out-title">Lights Out</h1>
            <div className="game-area">
                <div className="grid">
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
