import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Heart } from 'lucide-react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 30;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;

export default function SpaceShooter({ updateGameStats, settings }) {
    const canvasRef = useRef(null);
    const [player, setPlayer] = useState({ x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 80 });
    const [enemies, setEnemies] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [keys, setKeys] = useState({});
    const gameLoopRef = useRef(null);
    const enemySpawnRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('shooterHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === ' ' && gameStarted && !gameOver && !isPaused) {
                e.preventDefault();
                shootBullet();
            }
            setKeys(prev => ({ ...prev, [e.key]: true }));
        };

        const handleKeyUp = (e) => {
            setKeys(prev => ({ ...prev, [e.key]: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameStarted, gameOver, isPaused, player]);

    useEffect(() => {
        if (!gameStarted || gameOver || isPaused) return;

        if (keys['ArrowLeft'] && player.x > 0) {
            setPlayer(prev => ({ ...prev, x: Math.max(0, prev.x - 5) }));
        }
        if (keys['ArrowRight'] && player.x < CANVAS_WIDTH - PLAYER_WIDTH) {
            setPlayer(prev => ({ ...prev, x: Math.min(CANVAS_WIDTH - PLAYER_WIDTH, prev.x + 5) }));
        }
    }, [keys, player, gameStarted, gameOver, isPaused]);

    useEffect(() => {
        if (!gameStarted || gameOver || isPaused) return;

        gameLoopRef.current = setInterval(() => {
            setBullets(prev => {
                const moved = prev.map(b => ({ ...b, y: b.y - 7 })).filter(b => b.y > 0);
                return moved;
            });

            setEnemies(prev => {
                const moved = prev.map(e => ({ ...e, y: e.y + 2 }));

                const reachedBottom = moved.some(e => e.y > CANVAS_HEIGHT);
                if (reachedBottom) {
                    setLives(l => {
                        const newLives = l - 1;
                        if (newLives <= 0) {
                            handleGameOver();
                        }
                        return newLives;
                    });
                }

                return moved.filter(e => e.y < CANVAS_HEIGHT + ENEMY_HEIGHT);
            });

            checkCollisions();
        }, 1000 / 60);

        const spawnRate = settings.difficulty === 'easy' ? 2000 : settings.difficulty === 'hard' ? 800 : 1200;
        enemySpawnRef.current = setInterval(() => {
            spawnEnemy();
        }, spawnRate);

        return () => {
            clearInterval(gameLoopRef.current);
            clearInterval(enemySpawnRef.current);
        };
    }, [gameStarted, gameOver, isPaused, bullets, enemies, lives, settings]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(15, 23, 42)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        for (let i = 0; i < 50; i++) {
            const x = (i * 73) % CANVAS_WIDTH;
            const y = (i * 97 + Date.now() * 0.05) % CANVAS_HEIGHT;
            ctx.fillStyle = 'rgba(34, 211, 238, 0.7)';
            ctx.fillRect(x, y, 1, 1);
        }

        ctx.fillStyle = 'rgb(34, 211, 238)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgb(34, 211, 238)';
        ctx.beginPath();
        ctx.moveTo(player.x + PLAYER_WIDTH / 2, player.y);
        ctx.lineTo(player.x, player.y + PLAYER_HEIGHT);
        ctx.lineTo(player.x + PLAYER_WIDTH, player.y + PLAYER_HEIGHT);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        bullets.forEach(bullet => {
            ctx.fillStyle = 'rgb(34, 197, 94)';
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgb(34, 197, 94)';
            ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT);
            ctx.shadowBlur = 0;
        });

        enemies.forEach(enemy => {
            ctx.fillStyle = 'rgb(236, 72, 153)';
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgb(236, 72, 153)';
            ctx.fillRect(enemy.x, enemy.y, ENEMY_WIDTH, ENEMY_HEIGHT);
            ctx.shadowBlur = 0;
        });
    }, [player, bullets, enemies]);

    const spawnEnemy = () => {
        const x = Math.random() * (CANVAS_WIDTH - ENEMY_WIDTH);
        setEnemies(prev => [...prev, { x, y: -ENEMY_HEIGHT, id: Date.now() }]);
    };

    const shootBullet = () => {
        setBullets(prev => [
            ...prev,
            { x: player.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2, y: player.y, id: Date.now() }
        ]);
    };

    const checkCollisions = () => {
        bullets.forEach(bullet => {
            enemies.forEach(enemy => {
                if (
                    bullet.x < enemy.x + ENEMY_WIDTH &&
                    bullet.x + BULLET_WIDTH > enemy.x &&
                    bullet.y < enemy.y + ENEMY_HEIGHT &&
                    bullet.y + BULLET_HEIGHT > enemy.y
                ) {
                    setBullets(prev => prev.filter(b => b.id !== bullet.id));
                    setEnemies(prev => prev.filter(e => e.id !== enemy.id));
                    setScore(s => s + 10);
                }
            });
        });

        enemies.forEach(enemy => {
            if (
                player.x < enemy.x + ENEMY_WIDTH &&
                player.x + PLAYER_WIDTH > enemy.x &&
                player.y < enemy.y + ENEMY_HEIGHT &&
                player.y + PLAYER_HEIGHT > enemy.y
            ) {
                setEnemies(prev => prev.filter(e => e.id !== enemy.id));
                setLives(l => {
                    const newLives = l - 1;
                    if (newLives <= 0) {
                        handleGameOver();
                    }
                    return newLives;
                });
            }
        });
    };

    const handleGameOver = () => {
        setGameOver(true);
        clearInterval(gameLoopRef.current);
        clearInterval(enemySpawnRef.current);

        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('shooterHighScore', score.toString());
        }

        updateGameStats('shooter', score);
    };

    const startGame = () => {
        setPlayer({ x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 80 });
        setEnemies([]);
        setBullets([]);
        setScore(0);
        setLives(3);
        setGameOver(false);
        setIsPaused(false);
        setGameStarted(true);
        setKeys({});
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    const resetGame = () => {
        clearInterval(gameLoopRef.current);
        clearInterval(enemySpawnRef.current);
        setPlayer({ x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 80 });
        setEnemies([]);
        setBullets([]);
        setScore(0);
        setLives(3);
        setGameOver(false);
        setIsPaused(false);
        setGameStarted(false);
        setKeys({});
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
                                width={CANVAS_WIDTH}
                                height={CANVAS_HEIGHT}
                                className="border-2 border-cyan-500/50 rounded-lg w-full max-w-md"
                            />
                            {!gameStarted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                                    <div className="text-center space-y-4 px-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">Space Invaders</h3>
                                        <p className="text-sm md:text-base text-gray-400">← → to move, Space to shoot</p>
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
                            <p className="text-3xl md:text-4xl font-bold text-cyan-400">{score}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">Score</p>
                        </div>

                        {/* Lives Display */}
                        <div>
                            <div className="flex gap-2 mb-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < lives
                                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                                                : 'bg-gray-700/50 text-gray-500'
                                            }`}
                                    >
                                        ❤
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs md:text-sm text-gray-400">Lives</p>
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
                    <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
                    <ul className="text-xs md:text-sm space-y-2 text-gray-400">
                        <li>• ← → to move</li>
                        <li>• Space to shoot</li>
                        <li>• Hit enemy: 10 pts</li>
                        <li>• Avoid collision</li>
                    </ul>
                </div>

                {/* Difficulty Badge */}
                <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                    <p className="text-lg font-bold text-pink-400 capitalize">{settings.difficulty}</p>
                </div>
            </div>
        </div>
    );
}