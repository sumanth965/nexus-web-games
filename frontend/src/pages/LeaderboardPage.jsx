import React from 'react';
import { Trophy, Medal, Crown, Star } from 'lucide-react';

export default function LeaderboardPage({ leaderboard, currentUser }) {
    const sortedBoard = [...(leaderboard || [])].sort((a, b) => b.totalScore - a.totalScore);
    const currentUserRank = sortedBoard.findIndex(entry => entry.id === currentUser?.id) + 1;

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-cyan-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-purple-400" />;
            case 3:
                return <Medal className="w-6 h-6 text-yellow-400" />;
            default:
                return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
        }
    };

    const getRankColor = (rank) => {
        switch (rank) {
            case 1:
                return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
            case 2:
                return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
            case 3:
                return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
            default:
                return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        }
    };

    const getScoreColor = (rank) => {
        switch (rank) {
            case 1:
                return 'text-cyan-400';
            case 2:
                return 'text-purple-400';
            case 3:
                return 'text-yellow-400';
            default:
                return 'text-white';
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4 pb-6">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="text-cyan-400">Global</span>{' '}
                    <span className="text-white">Leaderboard</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Compete with the best players worldwide
                </p>
            </div>

            {/* Current User Rank Card */}
            {currentUserRank > 0 && currentUser && (
                <div className={`border-2 ${getRankColor(currentUserRank)} rounded-2xl p-6 bg-gradient-to-r from-gray-900/30 to-gray-800/30 backdrop-blur`}>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full border-2 ${getRankColor(currentUserRank)} flex items-center justify-center`}>
                                {getRankIcon(currentUserRank)}
                            </div>
                            <div>
                                <p className={`font-semibold text-lg ${getRankColor(currentUserRank).split(' ')[0]}`}>
                                    Your Rank: #{currentUserRank}
                                </p>
                                <p className="text-white font-semibold">{currentUser?.username}</p>
                                <p className="text-sm text-gray-400">Level {currentUser?.level || 1}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-3xl font-bold ${getRankColor(currentUserRank).split(' ')[0]}`}>
                                {currentUser?.totalScore?.toLocaleString() || 0}
                            </p>
                            <p className="text-sm text-gray-400">Total Score</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Top 3 Podium */}
            {sortedBoard.length >= 3 && (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* 2nd Place */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-2 border-purple-500/30 rounded-2xl p-6 text-center space-y-4 md:mt-12 hover:border-purple-500/50 transition-all">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 border-2 border-purple-500/50 flex items-center justify-center">
                                <Medal className="w-10 h-10 text-purple-400" />
                            </div>
                        </div>
                        <div>
                            <div className="inline-block bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-full px-3 py-1 text-sm font-semibold mb-2">
                                2nd Place
                            </div>
                            <h3 className="text-xl font-bold text-white">{sortedBoard[1]?.username}</h3>
                            <p className="text-sm text-gray-400">Level {sortedBoard[1]?.level || 1}</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-purple-400">{sortedBoard[1]?.totalScore?.toLocaleString() || 0}</p>
                            <p className="text-sm text-gray-400">Total Score</p>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-2 border-cyan-500/50 rounded-2xl p-6 text-center space-y-4 hover:border-cyan-500/70 transition-all -mt-6 md:-mt-0 md:scale-105">
                        <div className="flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border-2 border-cyan-500/50 flex items-center justify-center animate-bounce">
                                <Crown className="w-12 h-12 text-cyan-400" />
                            </div>
                        </div>
                        <div>
                            <div className="inline-block bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-full px-3 py-1 text-sm font-semibold mb-2">
                                Champion
                            </div>
                            <h3 className="text-2xl font-bold text-cyan-400">{sortedBoard[0]?.username}</h3>
                            <p className="text-sm text-gray-400">Level {sortedBoard[0]?.level || 1}</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-cyan-400">{sortedBoard[0]?.totalScore?.toLocaleString() || 0}</p>
                            <p className="text-sm text-gray-400">Total Score</p>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/30 rounded-2xl p-6 text-center space-y-4 md:mt-12 hover:border-yellow-500/50 transition-all">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border-2 border-yellow-500/50 flex items-center justify-center">
                                <Medal className="w-10 h-10 text-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <div className="inline-block bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full px-3 py-1 text-sm font-semibold mb-2">
                                3rd Place
                            </div>
                            <h3 className="text-xl font-bold text-white">{sortedBoard[2]?.username}</h3>
                            <p className="text-sm text-gray-400">Level {sortedBoard[2]?.level || 1}</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-yellow-400">{sortedBoard[2]?.totalScore?.toLocaleString() || 0}</p>
                            <p className="text-sm text-gray-400">Total Score</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Leaderboard */}
            <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="mb-6 pb-4 border-b border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white">All Rankings</h2>
                    <p className="text-gray-400 text-sm">Top players from around the world</p>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                    {sortedBoard.map((entry, index) => {
                        const rank = index + 1;
                        const isCurrentUser = entry.id === currentUser?.id;

                        return (
                            <div
                                key={entry.id}
                                className={`flex items-center justify-between p-4 rounded-lg transition-all border ${
                                    isCurrentUser
                                        ? 'bg-cyan-500/10 border-cyan-500/50'
                                        : 'bg-gray-800/30 hover:bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50'
                                }`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-10 flex items-center justify-center">
                                        {getRankIcon(rank)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className={`font-semibold ${
                                                isCurrentUser ? 'text-cyan-400' : 'text-white'
                                            }`}>
                                                {entry.username}
                                            </p>
                                            {isCurrentUser && (
                                                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-full px-2 py-0.5 text-xs font-semibold">
                                                    You
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400">Level {entry.level || 1}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-bold ${getScoreColor(rank)}`}>
                                        {entry.totalScore?.toLocaleString() || 0}
                                    </p>
                                    <p className="text-xs text-gray-400">points</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}