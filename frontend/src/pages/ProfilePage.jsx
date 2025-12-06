import React, { useState } from 'react';
import { User, Edit2, Save, Trophy, Target, Zap, Gamepad2 } from 'lucide-react';

export default function ProfilePage({ user, updateUser, gameStats }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(user?.username || '');

    const handleSave = () => {
        if (editedUsername.trim()) {
            updateUser({ ...user, username: editedUsername.trim() });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUsername(user?.username || '');
    };

    const stats = [
        {
            icon: Trophy,
            label: 'Total Score',
            value: user?.totalScore?.toLocaleString() || 0,
            color: 'from-cyan-500/20 to-cyan-500/10',
            textColor: 'text-cyan-400'
        },
        {
            icon: Gamepad2,
            label: 'Games Played',
            value: user?.gamesPlayed || 0,
            color: 'from-purple-500/20 to-purple-500/10',
            textColor: 'text-purple-400'
        },
        {
            icon: Zap,
            label: 'Current Level',
            value: user?.level || 1,
            color: 'from-yellow-500/20 to-yellow-500/10',
            textColor: 'text-yellow-400'
        },
        {
            icon: Target,
            label: 'Next Level',
            value: (user?.level || 1) + 1,
            color: 'from-green-500/20 to-green-500/10',
            textColor: 'text-green-400'
        }
    ];

    const gamesList = [
        { id: 'snake', name: 'Neon Snake', icon: '🐍' },
        { id: 'tetris', name: 'Cyber Tetris', icon: '🟦' },
        { id: '2048', name: 'Neon 2048', icon: '🔢' },
        { id: 'memory', name: 'Memory Matrix', icon: '🧠' },
        { id: 'shooter', name: 'Space Invaders', icon: '🚀' }
    ];

    const progressPercentage = ((user?.totalScore % 1000) / 1000) * 100;
    const pointsToNext = 1000 - (user?.totalScore % 1000);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4 pb-6">
                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="text-cyan-400">Your</span>{' '}
                    <span className="text-white">Profile</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Track your progress and achievements
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-5xl flex-shrink-0 border-4 border-cyan-500/50">
                        {user?.avatar || '🎮'}
                    </div>

                    <div className="flex-1 w-full">
                        {/* Username Section */}
                        {isEditing ? (
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-300">Edit Username</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                        className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
                                        placeholder="Enter username"
                                    />
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-semibold rounded-lg transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className="text-4xl font-bold text-cyan-400">{user?.username}</h2>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all text-cyan-400 hover:text-cyan-300"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <div className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-full px-4 py-2 text-sm font-semibold">
                                        Level {user?.level || 1}
                                    </div>
                                    <div className="bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-full px-4 py-2 text-sm font-semibold">
                                        {user?.gamesPlayed || 0} Games Played
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Progress to Level {(user?.level || 1) + 1}</span>
                                        <span className="font-bold text-cyan-400">{Math.floor(progressPercentage)}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/50">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 rounded-full"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {pointsToNext} points to next level
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${stat.color} border border-gray-700/50 hover:border-gray-600 rounded-lg p-6 transition-all group hover:scale-105 transform`}
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                                <div>
                                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Game Statistics */}
            <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="mb-6 pb-4 border-b border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white">Game Statistics</h2>
                    <p className="text-gray-400 text-sm">Your performance in each game</p>
                </div>

                <div className="space-y-4">
                    {gamesList.map((game) => {
                        const gStats = gameStats[game.id] || { highScore: 0, gamesPlayed: 0, totalScore: 0 };
                        const avgScore = gStats.gamesPlayed > 0 ? Math.floor(gStats.totalScore / gStats.gamesPlayed) : 0;

                        return (
                            <div
                                key={game.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-all group hover:bg-gray-800/50"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        {game.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{game.name}</p>
                                        <p className="text-sm text-gray-400">{gStats.gamesPlayed} plays</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm text-gray-400">High Score</p>
                                    <p className="text-2xl font-bold text-cyan-400">{gStats.highScore.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">Avg: {avgScore.toLocaleString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}