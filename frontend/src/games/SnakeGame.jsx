import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Trophy, Zap } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame({ updateGameStats, settings }) {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const gameLoopRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('snakeHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(15, 23, 42)';
        ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

        // Draw grid
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }

        // Draw snake
        snake.forEach((segment, index) => {
            const gradient = ctx.createLinearGradient(
                segment.x * CELL_SIZE,
                segment.y * CELL_SIZE,
                (segment.x + 1) * CELL_SIZE,
                (segment.y + 1) * CELL_SIZE
            );
            if (index === 0) {
                gradient.addColorStop(0, 'rgb(34, 211, 238)');
                gradient.addColorStop(1, 'rgb(168, 85, 247)');
            } else {
                gradient.addColorStop(0, 'rgb(6, 182, 212)');
                gradient.addColorStop(1, 'rgb(147, 51, 234)');
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(
                segment.x * CELL_SIZE + 1,
                segment.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );

            if (index === 0) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgb(34, 211, 238)';
                ctx.fillRect(
                    segment.x * CELL_SIZE + 1,
                    segment.y * CELL_SIZE + 1,
                    CELL_SIZE - 2,
                    CELL_SIZE - 2
                );
                ctx.shadowBlur = 0;
            }
        });

        // Draw food
        ctx.fillStyle = 'rgb(236, 72, 153)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgb(236, 72, 153)';
        ctx.beginPath();
        ctx.arc(
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;
    }, [snake, food]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameStarted || gameOver || isPaused) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameStarted, gameOver, isPaused]);

    useEffect(() => {
        if (!gameStarted || gameOver || isPaused) return;

        const speed = settings.difficulty === 'easy' ? 150 : settings.difficulty === 'hard' ? 80 : 100;

        gameLoopRef.current = setInterval(() => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y,
                };

                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE
                ) {
                    handleGameOver();
                    return prevSnake;
                }

                if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                    handleGameOver();
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((prev) => prev + 10);
                    generateFood(newSnake);
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, speed);

        return () => clearInterval(gameLoopRef.current);
    }, [direction, gameStarted, gameOver, isPaused, food, settings]);

    const generateFood = (currentSnake) => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
        setFood(newFood);
    };

    const handleGameOver = () => {
        setGameOver(true);
        clearInterval(gameLoopRef.current);

        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
        }

        updateGameStats('snake', score);
    };

    const startGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        setGameStarted(true);
        generateFood(INITIAL_SNAKE);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        setGameStarted(false);
        setFood({ x: 15, y: 15 });
    };

    return (
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Game Area */}
            <div className="md:col-span-2">
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <div className="flex justify-center">
                        <div className="relative">
                            <canvas
                                ref={canvasRef}
                                width={GRID_SIZE * CELL_SIZE}
                                height={GRID_SIZE * CELL_SIZE}
                                className="border-2 border-cyan-500/50 rounded-lg w-full max-w-md"
                            />
                            {!gameStarted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">Neon Snake</h3>
                                        <p className="text-gray-400">Use arrow keys to move</p>
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
                            {gameOver && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-red-400">Game Over!</h3>
                                        <p className="text-xl md:text-2xl text-white">Score: {score}</p>
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
                            {isPaused && !gameOver && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4">
                                        <h3 className="text-3xl font-bold text-cyan-400">Paused</h3>
                                        <button
                                            onClick={togglePause}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all mx-auto"
                                        >
                                            <Play className="w-5 h-5" />
                                            Resume
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
                {/* Score Card */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-white">Score</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-cyan-400">{score}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">Current Score</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-purple-400">{highScore}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">High Score</p>
                        </div>
                    </div>
                </div>

                {/* Controls Card */}
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Controls</h3>
                    <div className="space-y-2">
                        {gameStarted && !gameOver && (
                            <button
                                onClick={togglePause}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all"
                            >
                                {isPaused ? (
                                    <>
                                        <Play className="w-4 h-4" /> Resume
                                    </>
                                ) : (
                                    <>
                                        <Pause className="w-4 h-4" /> Pause
                                    </>
                                )}
                            </button>
                        )}
                        <button
                            onClick={resetGame}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    </div>
                </div>

                {/* Instructions Card */}
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
                    <ul className="text-xs md:text-sm space-y-2 text-gray-400">
                        <li>• Arrow keys to move</li>
                        <li>• Eat neon food</li>
                        <li>• Avoid walls & body</li>
                        <li>• +10 per food</li>
                    </ul>
                </div>

                {/* Difficulty Badge */}
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                    <p className="text-lg font-bold text-yellow-400 capitalize">{settings.difficulty}</p>
                </div>
            </div>
        </div>
    );
}