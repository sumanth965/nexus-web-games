import React, { useState } from 'react';
import { User, Edit2, Save, Trophy, Target, Zap, Gamepad2, Star, Award, BarChart3, Clock } from 'lucide-react';

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

    // Calculate level progress
    const expPerLevel = 1000;
    const currentExp = user?.totalScore || 0;
    const progressInCurrentLevel = currentExp % expPerLevel;
    const progressPercentage = (progressInCurrentLevel / expPerLevel) * 100;
    const expToNextLevel = expPerLevel - progressInCurrentLevel;

    const stats = [
        { icon: Award, label: 'Global Rank', value: '#154', color: 'from-blue-500/20 to-cyan-500/10', textColor: 'text-blue-400' },
        { icon: Trophy, label: 'Highest Score', value: Math.max(...Object.values(gameStats || {}).map(s => s.highScore || 0), 0).toLocaleString(), color: 'from-amber-500/20 to-yellow-500/10', textColor: 'text-amber-400' },
        { icon: Clock, label: 'Play Time', value: (user?.gamesPlayed || 0) * 5 + 'm', color: 'from-emerald-500/20 to-teal-500/10', textColor: 'text-emerald-400' },
        { icon: BarChart3, label: 'Consistency', value: '88%', color: 'from-purple-500/20 to-pink-500/10', textColor: 'text-purple-400' }
    ];

    const gamesList = [
        { id: 'snake', name: 'Neon Snake', icon: '🐍', color: 'cyan' },
        { id: 'tetris', name: 'Cyber Tetris', icon: '🟦', color: 'purple' },
        { id: '2048', name: 'Neon 2048', icon: '🔢', color: 'green' },
        { id: 'memory', name: 'Memory Matrix', icon: '🧠', color: 'yellow' },
        { id: 'shooter', name: 'Space Invaders', icon: '🚀', color: 'red' },
        { id: 'tictactoe', name: 'Tic Tac Toe', icon: '⭕', color: 'blue' }
    ];

    return (
        <div className="space-y-10 animate-fade-in max-w-6xl mx-auto px-4">
            {/* Profile Header */}
            <section className="relative glass-effect rounded-[3rem] p-8 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    {/* Avatar Container */}
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-2xl transition-transform group-hover:scale-105">
                            <div className="w-full h-full bg-gray-900 rounded-[2.3rem] flex items-center justify-center text-6xl md:text-8xl">
                                {user?.avatar || '🎮'}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gray-900 border-2 border-cyan-500 p-3 rounded-2xl shadow-xl">
                            <Star className="w-6 h-6 text-cyan-400 fill-cyan-400" />
                        </div>
                    </div>

                    {/* Meta Section */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <div className="space-y-2">
                           {isEditing ? (
                               <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                                    <input
                                        type="text"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                        className="bg-gray-800/80 border border-cyan-500/50 rounded-2xl px-6 py-3 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 w-full max-w-sm"
                                    />
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button onClick={handleSave} className="flex-1 px-6 py-3 bg-cyan-500 text-black font-black rounded-xl hover:bg-cyan-400 transition-colors">SAVE</button>
                                        <button onClick={handleCancel} className="flex-1 px-6 py-3 bg-gray-800 text-white font-black rounded-xl hover:bg-gray-700 transition-colors">Abort</button>
                                    </div>
                               </div>
                           ) : (
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                        {user?.username}
                                    </h2>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-3 bg-gray-800/50 hover:bg-cyan-500/20 rounded-2xl transition-all text-cyan-400 border border-gray-700"
                                    >
                                        <Edit2 className="w-6 h-6" />
                                    </button>
                                </div>
                           )}
                           <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
                                <span className="bg-cyan-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                    Veteran Player
                                </span>
                                <span className="text-gray-500 font-bold text-sm">Member since April 2026</span>
                           </div>
                        </div>

                        {/* Exp Bar */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-cyan-400 font-black text-2xl">LEVEL {user?.level || 1}</p>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Master of Mini-Games</p>
                                </div>
                                <p className="text-gray-400 font-bold text-sm">
                                    {Math.floor(progressPercentage)}% TO <span className="text-white">LVL {(user?.level || 1) + 1}</span>
                                </p>
                            </div>
                            <div className="h-4 bg-gray-800/80 rounded-full border border-gray-700 overflow-hidden shadow-inner p-1">
                                <div 
                                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                {expToNextLevel} XP required for Promotion
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`p-8 rounded-[2rem] bg-gradient-to-br ${stat.color} border border-gray-800 flex flex-col items-center gap-4 transition-all hover:scale-105`}>
                        <div className="p-4 bg-gray-900 rounded-2xl shadow-xl">
                            <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Games Performance */}
            <div className="glass-effect rounded-[3rem] p-10 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black text-white">Archives & Performance</h3>
                        <p className="text-gray-400 font-medium">Detailed combat record across the Nexus arsenal.</p>
                    </div>
                    <div className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center gap-3">
                         <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
                         <span className="text-cyan-400 font-bold text-sm tracking-widest uppercase">Live Tracking Active</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {gamesList.map((game) => {
                         const gStats = gameStats[game.id] || { highScore: 0, gamesPlayed: 0, totalScore: 0 };
                         return (
                            <div key={game.id} className="group p-1 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-cyan-500/50 hover:to-blue-500/50 rounded-3xl transition-all duration-500">
                                <div className="bg-gray-950 p-6 rounded-[1.4rem] flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="text-4xl group-hover:scale-110 transition-transform">{game.icon}</div>
                                        <div>
                                            <p className="font-black text-xl text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{game.name}</p>
                                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{gStats.gamesPlayed} Matches</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">High Record</p>
                                        <p className="text-2xl font-black text-white">{gStats.highScore.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                         );
                    })}
                </div>
            </div>
        </div>
    );
}