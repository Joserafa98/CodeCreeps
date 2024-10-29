import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/snakeGame.css';
import skeleton from '../../img/skeleton.jpg';

const SnakeGame = () => {
    const navigate = useNavigate();
    const [gridSize, setGridSize] = useState(10);
    const [snake, setSnake] = useState([[2, 2]]);
    const [food, setFood] = useState([5, 5]);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(200);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [direction]);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            if (!gameOver) {
                moveSnake();
            }
        }, speed);

        return () => {
            clearInterval(gameLoop);
        };
    }, [snake, direction, gameOver]);

    const moveSnake = () => {
        const head = [...snake[0]];
        switch (direction) {
            case 'UP':
                head[0] -= 1;
                break;
            case 'DOWN':
                head[0] += 1;
                break;
            case 'LEFT':
                head[1] -= 1;
                break;
            case 'RIGHT':
                head[1] += 1;
                break;
            default:
                break;
        }

        if (
            head[0] < 0 || head[0] >= gridSize ||
            head[1] < 0 || head[1] >= gridSize ||
            snake.some(segment => segment[0] === head[0] && segment[1] === head[1])
        ) {
            setGameOver(true);
            return;
        }

        const newSnake = [head, ...snake];
        if (head[0] === food[0] && head[1] === food[1]) {
            spawnFood();
            increaseDifficulty();
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const spawnFood = () => {
        let newFood;
        do {
            newFood = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)];
        } while (snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
        setFood(newFood);
    };

    const resetGame = () => {
        setSnake([[2, 2]]);
        setFood([5, 5]);
        setDirection('RIGHT');
        setGameOver(false);
        setSpeed(200);
    };

    const increaseDifficulty = () => {
        if (speed > 50) {
            setSpeed(speed - 20);
        }
    };

    const handleLevelChange = () => {
        setGridSize((prevSize) => (prevSize === 10 ? 12 : 10));
        resetGame();
    };

    return (
        <div 
            className="snake-game-container" 
            style={{
                backgroundImage: `url(${skeleton})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
        >
            <h1 className="game-title">Juego de Snake</h1>
            <div className="game-area">
                <div className="game-grid">
                    {Array.from({ length: gridSize }, (_, rowIndex) => (
                        <div key={rowIndex} className="game-row">
                            {Array.from({ length: gridSize }, (_, colIndex) => {
                                const isSnakePart = snake.some(segment => segment[0] === rowIndex && segment[1] === colIndex);
                                const isFood = food[0] === rowIndex && food[1] === colIndex;
                                return (
                                    <div
                                        key={colIndex}
                                        className={`cell unique-cell ${isSnakePart ? 'unique-snake' : ''} ${isFood ? 'unique-food' : ''}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                {gameOver && (
                    <div className="game-over">
                        <h2>¡Juego Terminado!</h2>
                        <button onClick={resetGame} className="btn-restart">Reiniciar</button>
                    </div>
                )}
                <div className="buttons">
                    <button onClick={handleLevelChange} className="btn-halloween">Cambiar Nivel</button>
                    <button onClick={() => navigate('/miniJuegos')} className="btn-halloween">Volver</button>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
