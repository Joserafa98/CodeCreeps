import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/memorySpooky.css'; // Asegúrate de tener este archivo CSS disponible

class AudioController {
    constructor() {
        this.bgMusic = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3');
        this.flipSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav');
        this.matchSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/match.wav');
        this.victorySound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/victory.wav');
        this.gameOverSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/gameOver.wav');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }

    startMusic() {
        this.bgMusic.play();
    }

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    flip() {
        this.flipSound.play();
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.stopMusic();
        this.victorySound.play();
    }

    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMismatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if (this.matchedCards.length === this.cardsArray.length) this.victory();
    }

    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray.forEach((card, index) => {
            card.style.order = index;
        });
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

const MemorySpooky = () => {
    const navigate = useNavigate();  // Hook para redirigir
    const overlayRef = useRef();

    useEffect(() => {
        const overlays = Array.from(document.getElementsByClassName('overlay-text'));
        const cards = Array.from(document.getElementsByClassName('card'));
        const game = new MixOrMatch(100, cards);

        const handleOverlayClick = (overlay) => {
            overlay.classList.remove('visible');
            game.startGame();
        };

        const handleCardClick = (card) => {
            game.flipCard(card);
        };

        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => handleOverlayClick(overlay));
        });

        cards.forEach(card => {
            card.addEventListener('click', () => handleCardClick(card));
        });

        return () => {
            overlays.forEach(overlay => {
                overlay.removeEventListener('click', () => handleOverlayClick(overlay));
            });
            cards.forEach(card => {
                card.removeEventListener('click', () => handleCardClick(card));
            });
        };

    }, []);

    return (
        <div>
            <h1 className="page-title">Mix-Or-Match</h1>
            <div className="overlay-text visible" ref={overlayRef}>
                Click to Start
            </div>
            <div id="game-over-text" className="overlay-text">
                GAME OVER
                <span className="overlay-text-small">Click to Restart</span>
            </div>
            <div id="victory-text" className="overlay-text">
                VICTORY
                <span className="overlay-text-small">Click to Restart</span>
            </div>
            <div className="game-container">
                <div className="game-info-container">
                    <div className="game-info">
                        Time <span id="time-remaining">100</span>
                    </div>
                    <div className="game-info">
                        Flips <span id="flips">0</span>
                    </div>
                </div>
                <div className="card-container">
                    {Array.from({ length: 16 }, (_, index) => {
                        const cardTypes = [
                            'Bat',          // 0
                            'Spider',       // 1
                            'Pumpkin',      // 2
                            'Ghost',        // 3
                            'Cauldron',     // 4
                            'Eye'           // 5
                        ];
                        const cardValue = cardTypes[Math.floor(index / 2) % cardTypes.length];

                        return (
                            <div className="card" key={index}>
                                <div className="card-back card-face">
                                    <img className="cob-web cob-web-top-left" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png" alt="cobweb" />
                                    <img className="spider" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Spider.png" alt="spider" />
                                </div>
                                <div className="card-front card-face">
                                    <img className="cob-web cob-web-top-left" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png" alt="cobwebGrey" />
                                    <img 
                                        className="card-value" 
                                        src={`https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/${cardValue}.png`} 
                                        alt={cardValue} 
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center">
                    <button onClick={() => navigate('/miniJuegos')} className="btn btn-halloween fade-in">Volver</button>
                </div>
            </div>
        </div>
    );
};

export default MemorySpooky;  