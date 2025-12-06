import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

const GRID_SIZE = 4;

const TILE_COLORS = {
    2: { bg: 'rgb(30, 41, 59)', text: 'rgb(241, 245, 250)' },
    4: { bg: 'rgb(51, 65, 85)', text: 'rgb(241, 245, 250)' },
    8: { bg: 'rgb(6, 182, 212)', text: 'rgb(255, 255, 255)' },
    16: { bg: 'rgb(34, 211, 238)', text: 'rgb(255, 255, 255)' },
    32: { bg: 'rgb(168, 85, 247)', text: 'rgb(255, 255, 255)' },
    64: { bg: 'rgb(147, 51, 234)', text: 'rgb(255, 255, 255)' },
    128: { bg: 'rgb(236, 72, 153)', text: 'rgb(255, 255, 255)' },
    256: { bg: 'rgb(236, 72, 153)', text: 'rgb(255, 255, 255)' },
    512: { bg: 'rgb(34, 197, 94)', text: 'rgb(255, 255, 255)' },
    1024: { bg: 'rgb(34, 197, 94)', text: 'rgb(0, 0, 0)' },
    2048: { bg: 'rgb(234, 179, 8)', text: 'rgb(0, 0, 0)' },
};

export default function Game2048({ updateGameStats, settings }) {
    const [grid, setGrid] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('2048HighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameStarted || gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    move('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    move('down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    move('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    move('right');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [grid, gameStarted, gameOver]);

    const initializeGrid = () => {
        const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
        addRandomTile(newGrid);
        addRandomTile(newGrid);
        return newGrid;
    };

    const addRandomTile = (grid) => {
        const emptyCells = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (grid[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const move = (direction) => {
        const newGrid = grid.map(row => [...row]);
        let moved = false;
        let scoreIncrease = 0;

        const moveLeft = () => {
            for (let i = 0; i < GRID_SIZE; i++) {
                let row = newGrid[i].filter(cell => cell !== 0);
                for (let j = 0; j < row.length - 1; j++) {
                    if (row[j] === row[j + 1]) {
                        row[j] *= 2;
                        scoreIncrease += row[j];
                        row.splice(j + 1, 1);
                        if (row[j] === 2048) setGameWon(true);
                    }
                }
                while (row.length < GRID_SIZE) row.push(0);
                if (JSON.stringify(newGrid[i]) !== JSON.stringify(row)) moved = true;
                newGrid[i] = row;
            }
        };

        const moveRight = () => {
            for (let i = 0; i < GRID_SIZE; i++) {
                let row = newGrid[i].filter(cell => cell !== 0);
                for (let j = row.length - 1; j > 0; j--) {
                    if (row[j] === row[j - 1]) {
                        row[j] *= 2;
                        scoreIncrease += row[j];
                        row.splice(j - 1, 1);
                        if (row[j] === 2048) setGameWon(true);
                        j--;
                    }
                }
                while (row.length < GRID_SIZE) row.unshift(0);
                if (JSON.stringify(newGrid[i]) !== JSON.stringify(row)) moved = true;
                newGrid[i] = row;
            }
        };

        const moveUp = () => {
            for (let j = 0; j < GRID_SIZE; j++) {
                let col = [];
                for (let i = 0; i < GRID_SIZE; i++) {
                    if (newGrid[i][j] !== 0) col.push(newGrid[i][j]);
                }
                for (let i = 0; i < col.length - 1; i++) {
                    if (col[i] === col[i + 1]) {
                        col[i] *= 2;
                        scoreIncrease += col[i];
                        col.splice(i + 1, 1);
                        if (col[i] === 2048) setGameWon(true);
                    }
                }
                while (col.length < GRID_SIZE) col.push(0);
                for (let i = 0; i < GRID_SIZE; i++) {
                    if (newGrid[i][j] !== col[i]) moved = true;
                    newGrid[i][j] = col[i];
                }
            }
        };

        const moveDown = () => {
            for (let j = 0; j < GRID_SIZE; j++) {
                let col = [];
                for (let i = 0; i < GRID_SIZE; i++) {
                    if (newGrid[i][j] !== 0) col.push(newGrid[i][j]);
                }
                for (let i = col.length - 1; i > 0; i--) {
                    if (col[i] === col[i - 1]) {
                        col[i] *= 2;
                        scoreIncrease += col[i];
                        col.splice(i - 1, 1);
                        if (col[i] === 2048) setGameWon(true);
                        i--;
                    }
                }
                while (col.length < GRID_SIZE) col.unshift(0);
                for (let i = 0; i < GRID_SIZE; i++) {
                    if (newGrid[i][j] !== col[i]) moved = true;
                    newGrid[i][j] = col[i];
                }
            }
        };

        switch (direction) {
            case 'left':
                moveLeft();
                break;
            case 'right':
                moveRight();
                break;
            case 'up':
                moveUp();
                break;
            case 'down':
                moveDown();
                break;
            default:
                break;
        }

        if (moved) {
            addRandomTile(newGrid);
            setGrid(newGrid);
            setScore(score + scoreIncrease);

            if (!canMove(newGrid)) {
                handleGameOver(score + scoreIncrease);
            }
        }
    };

    const canMove = (grid) => {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (grid[i][j] === 0) return true;
            }
        }

        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) return true;
                if (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) return true;
            }
        }

        return false;
    };

    const handleGameOver = (finalScore) => {
        setGameOver(true);

        if (finalScore > highScore) {
            setHighScore(finalScore);
            localStorage.setItem('2048HighScore', finalScore.toString());
        }

        updateGameStats('2048', finalScore);
    };

    const startGame = () => {
        const newGrid = initializeGrid();
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setGameStarted(true);
    };

    const resetGame = () => {
        setGrid([]);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setGameStarted(false);
    };

    const tileSize = 'w-16 h-16 md:w-24 md:h-24';
    const fontSize = 'text-xl md:text-2xl';

    return (
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Game Area */}
            <div className="md:col-span-2">
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <div className="flex justify-center">
                        <div className="relative w-full">
                            <div className="bg-gray-800/50 p-2 md:p-3 rounded-xl border-2 border-cyan-500/30 max-w-md mx-auto">
                                <div className="grid grid-cols-4 gap-1 md:gap-3">
                                    {gameStarted ? (
                                        grid.map((row, i) =>
                                            row.map((cell, j) => (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className={`${tileSize} rounded-lg flex items-center justify-center ${fontSize} font-bold transition-all duration-200`}
                                                    style={{
                                                        backgroundColor: cell ? TILE_COLORS[cell]?.bg || 'rgb(30, 41, 59)' : 'rgb(30, 41, 59)',
                                                        color: cell ? TILE_COLORS[cell]?.text || 'rgb(241, 245, 250)' : 'transparent',
                                                        boxShadow: cell ? `0 0 20px ${TILE_COLORS[cell]?.bg}66` : 'none',
                                                    }}
                                                >
                                                    {cell || ''}
                                                </div>
                                            ))
                                        )
                                    ) : (
                                        Array(16).fill(0).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`${tileSize} rounded-lg bg-gray-700/30`}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>

                            {!gameStarted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">Neon 2048</h3>
                                        <p className="text-sm md:text-base text-gray-400">Use arrow keys to play</p>
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
                                        <p className="text-lg md:text-xl text-white">Score: {score}</p>
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

                            {gameWon && !gameOver && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-yellow-400">You Won! 🎉</h3>
                                        <p className="text-lg md:text-xl text-white">Reached 2048!</p>
                                        <div className="flex flex-col md:flex-row gap-3 justify-center">
                                            <button
                                                onClick={() => setGameWon(false)}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all"
                                            >
                                                Continue
                                            </button>
                                            <button
                                                onClick={startGame}
                                                className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all"
                                            >
                                                New Game
                                            </button>
                                        </div>
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
                    <div className="text-center space-y-4">
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-cyan-400">{score}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">Current Score</p>
                        </div>
                        <div className="pt-3 border-t border-gray-700/50">
                            <p className="text-2xl md:text-3xl font-bold text-yellow-400">{highScore}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">High Score</p>
                        </div>
                    </div>
                </div>

                {/* Controls Card */}
                <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-4 md:p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Controls</h3>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        <div></div>
                        <button
                            onClick={() => move('up')}
                            disabled={!gameStarted || gameOver}
                            className="p-2 rounded-lg border border-gray-600 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Move Up"
                        >
                            <ArrowUp className="w-5 h-5 mx-auto" />
                        </button>
                        <div></div>

                        <button
                            onClick={() => move('left')}
                            disabled={!gameStarted || gameOver}
                            className="p-2 rounded-lg border border-gray-600 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Move Left"
                        >
                            <ArrowLeft className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                            onClick={() => move('down')}
                            disabled={!gameStarted || gameOver}
                            className="p-2 rounded-lg border border-gray-600 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Move Down"
                        >
                            <ArrowDown className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                            onClick={() => move('right')}
                            disabled={!gameStarted || gameOver}
                            className="p-2 rounded-lg border border-gray-600 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Move Right"
                        >
                            <ArrowRight className="w-5 h-5 mx-auto" />
                        </button>
                    </div>
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
                    <h3 className="text-lg font-bold text-white mb-4">How to Play</h3>
                    <ul className="text-xs md:text-sm space-y-2 text-gray-400">
                        <li>• Use arrow keys to slide</li>
                        <li>• Merge same numbers</li>
                        <li>• Reach 2048 to win!</li>
                        <li>• Game ends when stuck</li>
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