import React, { useState } from 'react';
import { ArrowLeft, Zap, Trophy } from 'lucide-react';
import SnakeGame from '../games/SnakeGame';
import TetrisGame from '../games/TetrisGame';
import Game2048 from '../games/Game2048';
import MemoryMatch from '../games/MemoryMatch';
import SpaceShooter from '../games/SpaceShooter';

export default function GamesPage({ updateGameStats, settings }) {
    const [selectedGame, setSelectedGame] = useState(null);

    const games = [
        {
            id: 'snake',
            name: 'Neon Snake',
            description: 'Classic snake game with a cyberpunk twist',
            component: SnakeGame,
            difficulty: 'Easy',
            color: 'from-cyan-500 to-blue-500',
            icon: '🐍'
        },
        {
            id: 'tetris',
            name: 'Cyber Tetris',
            description: 'Stack blocks in this timeless puzzle game',
            component: TetrisGame,
            difficulty: 'Medium',
            color: 'from-purple-500 to-pink-500',
            icon: '🟦'
        },
        {
            id: '2048',
            name: 'Neon 2048',
            description: 'Combine tiles to reach 2048',
            component: Game2048,
            difficulty: 'Medium',
            color: 'from-green-500 to-emerald-500',
            icon: '🔢'
        },
        {
            id: 'memory',
            name: 'Memory Matrix',
            description: 'Match pairs in this memory challenge',
            component: MemoryMatch,
            difficulty: 'Easy',
            color: 'from-yellow-500 to-orange-500',
            icon: '🧠'
        },
        {
            id: 'shooter',
            name: 'Space Invaders',
            description: 'Defend against the alien invasion',
            component: SpaceShooter,
            difficulty: 'Hard',
            color: 'from-red-500 to-pink-500',
            icon: '🚀'
        }
    ];

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/50';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/50';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    if (selectedGame) {
        const GameComponent = selectedGame.component;
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="flex items-center gap-2 px-4 py-2 border border-cyan-500/50 hover:border-cyan-500 text-cyan-400 font-semibold rounded-lg transition-all hover:bg-cyan-500/10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Games
                        </button>
                        <div>
                            <h2 className="text-3xl font-bold text-white">{selectedGame.name}</h2>
                            <p className="text-sm text-gray-400 mt-1">{selectedGame.description}</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border ${getDifficultyColor(selectedGame.difficulty)}`}>
                        <span className="font-semibold text-sm">{selectedGame.difficulty}</span>
                    </div>
                </div>

                <GameComponent
                    updateGameStats={updateGameStats}
                    settings={settings}
                    gameName={selectedGame.id}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="text-center space-y-4 pb-8">
                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="text-cyan-400">Choose</span>{' '}
                    <span className="text-white">Your Game</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Select from our collection of classic and modern games
                </p>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className="group cursor-pointer bg-gray-900/30 border border-gray-700/50 hover:border-gray-600 rounded-2xl overflow-hidden transition-all hover:scale-105 transform"
                    >
                        {/* Game Icon Header */}
                        <div className={`h-32 bg-gradient-to-br ${game.color} relative overflow-hidden flex items-center justify-center`}>
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                                {game.icon}
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {game.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-2">
                                        {game.description}
                                    </p>
                                </div>
                            </div>

                            {/* Difficulty Badge */}
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(game.difficulty)}`}>
                                {game.difficulty}
                            </div>

                            {/* Play Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedGame(game);
                                }}
                                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all transform group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                            >
                                Play Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Bar */}
            <div className="mt-8 grid md:grid-cols-3 gap-4 pt-8 border-t border-gray-700/50">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-semibold">5 Games</span>
                    </div>
                    <p className="text-sm text-gray-400">Available to play</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                        <Trophy className="w-5 h-5" />
                        <span className="font-semibold">Compete</span>
                    </div>
                    <p className="text-sm text-gray-400">Earn high scores</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-semibold">Unlock</span>
                    </div>
                    <p className="text-sm text-gray-400">Achievements & levels</p>
                </div>
            </div>
        </div>
    );
}