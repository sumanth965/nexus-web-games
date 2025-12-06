import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Target } from 'lucide-react';

const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 25;

const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
];

const COLORS = [
    'rgb(34, 211, 238)', // cyan
    'rgb(236, 72, 153)', // magenta
    'rgb(168, 85, 247)', // purple
    'rgb(34, 197, 94)', // green
    'rgb(234, 179, 8)', // yellow
    'rgb(249, 115, 22)', // orange
    'rgb(239, 68, 68)', // red
];

export default function TetrisGame({ updateGameStats, settings }) {
    const canvasRef = useRef(null);
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
    const [currentPiece, setCurrentPiece] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const gameLoopRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('tetrisHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    useEffect(() => {
        if (!gameStarted || gameOver || isPaused) return;

        const speed = Math.max(100, 600 - (level * 50));
        gameLoopRef.current = setInterval(() => {
            moveDown();
        }, speed);

        return () => clearInterval(gameLoopRef.current);
    }, [currentPiece, position, board, gameStarted, gameOver, isPaused, level]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(15, 23, 42)';
        ctx.fillRect(0, 0, COLS * CELL_SIZE, ROWS * CELL_SIZE);

        // Draw grid
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= COLS; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, ROWS * CELL_SIZE);
            ctx.stroke();
        }
        for (let i = 0; i <= ROWS; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(COLS * CELL_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }

        // Draw board
        board.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    ctx.fillStyle = COLORS[cell - 1];
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = COLORS[cell - 1];
                    ctx.fillRect(
                        x * CELL_SIZE + 1,
                        y * CELL_SIZE + 1,
                        CELL_SIZE - 2,
                        CELL_SIZE - 2
                    );
                    ctx.shadowBlur = 0;
                }
            });
        });

        // Draw current piece
        if (currentPiece) {
            currentPiece.shape.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        ctx.fillStyle = COLORS[currentPiece.color];
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = COLORS[currentPiece.color];
                        ctx.fillRect(
                            (position.x + x) * CELL_SIZE + 1,
                            (position.y + y) * CELL_SIZE + 1,
                            CELL_SIZE - 2,
                            CELL_SIZE - 2
                        );
                        ctx.shadowBlur = 0;
                    }
                });
            });
        }
    }, [board, currentPiece, position]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameStarted || gameOver || isPaused) return;

            switch (e.key) {
                case 'ArrowLeft':
                    moveLeft();
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    moveRight();
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    moveDown();
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                case ' ':
                    rotate();
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentPiece, position, board, gameStarted, gameOver, isPaused]);

    const createPiece = () => {
        const shapeIndex = Math.floor(Math.random() * SHAPES.length);
        return {
            shape: SHAPES[shapeIndex],
            color: shapeIndex,
        };
    };

    const isValidMove = (piece, pos) => {
        return piece.shape.every((row, dy) =>
            row.every((cell, dx) => {
                if (!cell) return true;
                const newX = pos.x + dx;
                const newY = pos.y + dy;
                return (
                    newX >= 0 &&
                    newX < COLS &&
                    newY < ROWS &&
                    (newY < 0 || !board[newY][newX])
                );
            })
        );
    };

    const mergePiece = () => {
        const newBoard = board.map(row => [...row]);
        currentPiece.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    const boardY = position.y + y;
                    const boardX = position.x + x;
                    if (boardY >= 0) {
                        newBoard[boardY][boardX] = currentPiece.color + 1;
                    }
                }
            });
        });
        return newBoard;
    };

    const clearLines = (newBoard) => {
        let linesCleared = 0;
        const clearedBoard = newBoard.filter(row => {
            if (row.every(cell => cell !== 0)) {
                linesCleared++;
                return false;
            }
            return true;
        });

        while (clearedBoard.length < ROWS) {
            clearedBoard.unshift(Array(COLS).fill(0));
        }

        if (linesCleared > 0) {
            const points = [0, 100, 300, 500, 800][linesCleared];
            setScore(prev => prev + points);
            setLines(prev => prev + linesCleared);
            setLevel(Math.floor(lines / 10) + 1);
        }

        return clearedBoard;
    };

    const moveDown = () => {
        if (!currentPiece) {
            const newPiece = createPiece();
            const newPos = { x: Math.floor(COLS / 2) - 1, y: 0 };

            if (isValidMove(newPiece, newPos)) {
                setCurrentPiece(newPiece);
                setPosition(newPos);
            } else {
                handleGameOver();
            }
            return;
        }

        const newPos = { x: position.x, y: position.y + 1 };
        if (isValidMove(currentPiece, newPos)) {
            setPosition(newPos);
        } else {
            const newBoard = mergePiece();
            const clearedBoard = clearLines(newBoard);
            setBoard(clearedBoard);
            setCurrentPiece(null);
        }
    };

    const moveLeft = () => {
        if (!currentPiece) return;
        const newPos = { x: position.x - 1, y: position.y };
        if (isValidMove(currentPiece, newPos)) {
            setPosition(newPos);
        }
    };

    const moveRight = () => {
        if (!currentPiece) return;
        const newPos = { x: position.x + 1, y: position.y };
        if (isValidMove(currentPiece, newPos)) {
            setPosition(newPos);
        }
    };

    const rotate = () => {
        if (!currentPiece) return;
        const rotated = currentPiece.shape[0].map((_, i) =>
            currentPiece.shape.map(row => row[i]).reverse()
        );
        const rotatedPiece = { ...currentPiece, shape: rotated };
        if (isValidMove(rotatedPiece, position)) {
            setCurrentPiece(rotatedPiece);
        }
    };

    const handleGameOver = () => {
        setGameOver(true);
        clearInterval(gameLoopRef.current);

        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('tetrisHighScore', score.toString());
        }

        updateGameStats('tetris', score);
    };

    const startGame = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
        setCurrentPiece(null);
        setScore(0);
        setLines(0);
        setLevel(1);
        setGameOver(false);
        setIsPaused(false);
        setGameStarted(true);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    const resetGame = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
        setCurrentPiece(null);
        setScore(0);
        setLines(0);
        setLevel(1);
        setGameOver(false);
        setIsPaused(false);
        setGameStarted(false);
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
                                width={COLS * CELL_SIZE}
                                height={ROWS * CELL_SIZE}
                                className="border-2 border-cyan-500/50 rounded-lg w-full max-w-md"
                            />
                            {!gameStarted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">Cyber Tetris</h3>
                                        <p className="text-sm md:text-base text-gray-400">Arrow keys to move, Up/Space to rotate</p>
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
                                        <div className="space-y-2">
                                            <p className="text-lg md:text-xl text-white">Score: {score}</p>
                                            <p className="text-sm md:text-lg text-gray-400">Lines: {lines}</p>
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
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-white">Stats</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-cyan-400">{score}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">Score</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-xl md:text-2xl font-bold text-purple-400">{lines}</p>
                                <p className="text-xs text-gray-400 mt-1">Lines</p>
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl font-bold text-green-400">{level}</p>
                                <p className="text-xs text-gray-400 mt-1">Level</p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-gray-700/50">
                            <p className="text-lg md:text-xl font-bold text-yellow-400">{highScore}</p>
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
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all text-sm md:text-base"
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
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all text-sm md:text-base"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    </div>
                </div>

                {/* Instructions Card */}
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-white">Controls</h3>
                    </div>
                    <ul className="text-xs md:text-sm space-y-2 text-gray-400">
                        <li>• ← → to move</li>
                        <li>• ↓ to drop faster</li>
                        <li>• ↑ or Space to rotate</li>
                        <li>• Clear lines to score</li>
                    </ul>
                </div>

                {/* Level Badge */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                    <p className="text-lg font-bold text-purple-400 capitalize">{settings.difficulty}</p>
                </div>
            </div>
        </div>
    );
}