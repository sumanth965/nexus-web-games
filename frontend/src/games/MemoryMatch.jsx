import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Timer, Zap, Target } from 'lucide-react';

const EMOJIS = ['👾', '👽', '🤖', '🚀', '⭐', '💫', '🔮', '⚡'];

export default function MemoryMatch({ updateGameStats, settings }) {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('memoryHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    useEffect(() => {
        if (!gameStarted || gameWon) return;

        const timer = setInterval(() => {
            setTime(t => t + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameWon]);

    useEffect(() => {
        if (matched.length === cards.length && cards.length > 0 && !gameWon) {
            handleGameWon();
        }
    }, [matched, cards, gameWon]);

    const initializeCards = () => {
        const pairs = [...EMOJIS, ...EMOJIS];
        const shuffled = pairs.sort(() => Math.random() - 0.5).map((emoji, index) => ({
            id: index,
            emoji,
            isFlipped: false,
            isMatched: false,
        }));
        setCards(shuffled);
    };

    const handleCardClick = (id) => {
        if (isChecking || flipped.includes(id) || matched.includes(id) || flipped.length >= 2) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setIsChecking(true);
            setMoves(moves + 1);

            const [first, second] = newFlipped;
            const firstCard = cards.find(c => c.id === first);
            const secondCard = cards.find(c => c.id === second);

            if (firstCard.emoji === secondCard.emoji) {
                setTimeout(() => {
                    setMatched([...matched, first, second]);
                    setFlipped([]);
                    setIsChecking(false);
                }, 500);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };

    const calculateScore = () => {
        const baseScore = 1000;
        const timePenalty = time * 2;
        const movesPenalty = moves * 5;
        return Math.max(0, baseScore - timePenalty - movesPenalty);
    };

    const handleGameWon = () => {
        setGameWon(true);
        const score = calculateScore();

        if (highScore === 0 || score > highScore) {
            setHighScore(score);
            localStorage.setItem('memoryHighScore', score.toString());
        }

        updateGameStats('memory', score);
    };

    const startGame = () => {
        initializeCards();
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTime(0);
        setGameStarted(true);
        setGameWon(false);
        setIsChecking(false);
    };

    const resetGame = () => {
        setCards([]);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
        setGameWon(false);
        setIsChecking(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const gridColsClass = gameStarted ? 'grid-cols-4 md:grid-cols-4' : 'grid-cols-4 md:grid-cols-4';
    const cardSize = 'w-16 h-16 md:w-24 md:h-24';

    return (
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Game Area */}
            <div className="md:col-span-2">
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <div className="flex justify-center">
                        <div className="relative w-full">
                            {gameStarted ? (
                                <div className={`grid ${gridColsClass} gap-2 md:gap-4 max-w-md mx-auto`}>
                                    {cards.map((card) => {
                                        const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
                                        const isMatched = matched.includes(card.id);

                                        return (
                                            <button
                                                key={card.id}
                                                onClick={() => handleCardClick(card.id)}
                                                disabled={isMatched || isChecking}
                                                className={`${cardSize} rounded-lg font-bold text-2xl md:text-4xl transition-all duration-300 transform ${isMatched
                                                        ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-500/50 scale-95 cursor-default'
                                                        : isFlipped
                                                            ? 'bg-gradient-to-br from-purple-500/20 to-purple-500/10 border-2 border-purple-500/50 cursor-default'
                                                            : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-800/70 cursor-pointer'
                                                    } shadow-lg`}
                                                style={{
                                                    boxShadow: isMatched ? '0 0 15px rgba(34, 211, 238, 0.4)' : 'none',
                                                }}
                                            >
                                                {isFlipped ? card.emoji : '?'}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className={`grid ${gridColsClass} gap-2 md:gap-4 max-w-md mx-auto`}>
                                    {Array(16).fill(0).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`${cardSize} rounded-lg bg-gray-800/50 border-2 border-gray-700/50`}
                                        />
                                    ))}
                                </div>
                            )}

                            {!gameStarted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">Memory Matrix</h3>
                                        <p className="text-sm md:text-base text-gray-400">Match all pairs to win</p>
                                        <button
                                            onClick={startGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all mx-auto"
                                        >
                                            <Play className="w-5 h-5" />
                                            Start Game
                                        </button>
                                    </div>
                                </div>
                            )}

                            {gameWon && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">You Won! 🎉</h3>
                                        <div className="space-y-2">
                                            <p className="text-lg md:text-xl text-white">Time: {formatTime(time)}</p>
                                            <p className="text-lg md:text-xl text-white">Moves: {moves}</p>
                                            <p className="text-2xl md:text-3xl font-bold text-yellow-400">Score: {calculateScore()}</p>
                                        </div>
                                        <button
                                            onClick={startGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all mx-auto"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            Play Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 md:space-y-4">
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-white">Stats</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Timer className="w-4 h-4 text-cyan-400" />
                                <p className="text-xs md:text-sm text-gray-400">Time</p>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-cyan-400">{formatTime(time)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-xl md:text-2xl font-bold text-purple-400">{moves}</p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">Moves</p>
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl font-bold text-green-400">{matched.length / 2}/8</p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">Pairs</p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-gray-700/50">
                            <p className="text-lg md:text-xl font-bold text-yellow-400">{highScore}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">High Score</p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                {gameStarted && !gameWon && (
                    <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                        <p className="text-sm font-semibold text-gray-400 mb-3">Progress</p>
                        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${(matched.length / cards.length) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{matched.length}/{cards.length} cards matched</p>
                    </div>
                )}

                {/* Controls Card */}
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Controls</h3>
                    <button
                        onClick={resetGame}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all text-sm md:text-base"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>

                {/* Instructions Card */}
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-white">Instructions</h3>
                    </div>
                    <ul className="text-xs md:text-sm space-y-2 text-gray-400">
                        <li>• Click cards to flip</li>
                        <li>• Match pair emojis</li>
                        <li>• Fewest moves win</li>
                        <li>• Race the clock!</li>
                    </ul>
                </div>

                {/* Difficulty Badge */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                    <p className="text-lg font-bold text-purple-400 capitalize">{settings.difficulty}</p>
                </div>
            </div>
        </div>
    );
}