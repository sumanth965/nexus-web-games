import React, { useRef } from 'react';
import { Trophy, Medal, Crown, Star, ArrowUp, Zap, Ghost } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LeaderboardPage({ leaderboard, currentUser }) {
    const sortedBoard = [...(leaderboard || [])].sort((a, b) => b.totalScore - a.totalScore);
    const container = useRef(null);

    useGSAP(() => {
        // Spotlight Entrance
        gsap.from(".podium-card", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".podium-card",
                start: "top 90%",
            }
        });

        // Independent Row Reveals
        gsap.utils.toArray(".rank-row").forEach((row) => {
            gsap.from(row, {
                x: -40,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: container });

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />;
            case 2: return <Medal className="w-7 h-7 text-purple-400" />;
            case 3: return <Medal className="w-6 h-6 text-amber-500" />;
            default: return <span className="text-xl font-black text-gray-600">#{rank}</span>;
        }
    };

    const getRowStyle = (rank, isCurrentUser) => {
        if (isCurrentUser) return 'bg-cyan-500/10 border-cyan-500/40 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]';
        if (rank === 1) return 'bg-gradient-to-r from-cyan-950/40 to-transparent border-cyan-500/20';
        return 'bg-gray-900/40 border-gray-800 hover:border-gray-700';
    };

    return (
        <div ref={container} className="space-y-12 max-w-5xl mx-auto px-4 pb-20">
            {/* Legend Header */}
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-gray-900 border border-gray-800 rounded-full shadow-2xl">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Competitive Arena</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                    HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">FAME</span>
                </h1>
                <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto">
                    The elite circle of Nexus players. Legends are made in milliseconds.
                </p>
            </div>

            {/* Top 3 Spotlight */}
            {sortedBoard.length >= 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative">
                    <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                    
                    {/* SILVER - 2nd */}
                    {sortedBoard[1] && (
                        <div className="podium-card order-2 md:order-1 flex flex-col items-center space-y-4 pb-8 border-b-2 border-purple-500/20">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-3xl bg-gray-900 border-2 border-purple-500/50 flex items-center justify-center text-4xl shadow-2xl group-hover:scale-105 transition-transform">
                                    🥈
                                </div>
                                <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">#2</div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-xl text-white uppercase tracking-tight">{sortedBoard[1].username}</h3>
                                <p className="text-purple-400 font-bold text-2xl mt-1">{sortedBoard[1].totalScore.toLocaleString()}</p>
                            </div>
                        </div>
                    )}

                    {/* GOLD - 1st */}
                    {sortedBoard[0] && (
                        <div className="podium-card order-1 md:order-2 flex flex-col items-center space-y-6 pb-12 border-b-4 border-cyan-500 shadow-[0_20px_40px_-20px_rgba(6,182,212,0.4)] relative z-10 transition-transform hover:scale-105">
                             <div className="absolute -top-20 animate-bounce">
                                <Crown className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                             </div>
                             <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-1">
                                <div className="w-full h-full bg-gray-900 rounded-[2.3rem] flex items-center justify-center text-6xl">
                                    🥇
                                </div>
                             </div>
                             <div className="text-center">
                                <h3 className="font-black text-3xl text-cyan-400 uppercase tracking-tighter">{sortedBoard[0].username}</h3>
                                <p className="text-white font-black text-4xl mt-1">{sortedBoard[0].totalScore.toLocaleString()}</p>
                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Grand Champion</span>
                                </div>
                             </div>
                        </div>
                    )}

                    {/* BRONZE - 3rd */}
                    {sortedBoard[2] && (
                        <div className="podium-card order-3 md:order-3 flex flex-col items-center space-y-4 pb-8 border-b-2 border-amber-500/20">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-3xl bg-gray-900 border-2 border-amber-500/50 flex items-center justify-center text-3xl shadow-2xl group-hover:scale-105 transition-transform">
                                    🥉
                                </div>
                                <div className="absolute -top-3 -right-3 bg-amber-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">#3</div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-lg text-white uppercase tracking-tight">{sortedBoard[2].username}</h3>
                                <p className="text-amber-500 font-bold text-xl mt-1">{sortedBoard[2].totalScore.toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* List View */}
            <div className="glass-effect rounded-[3rem] p-4 md:p-8 space-y-4">
                <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-6 md:col-span-7">Warrior</div>
                    <div className="col-span-4 md:col-span-3 text-right">Combat Score</div>
                </div>

                <div className="space-y-3">
                    {sortedBoard.slice(0, 50).map((entry, i) => {
                        const rank = i + 1;
                        const isCurrentUser = entry.id === currentUser?.id;

                        return (
                            <div 
                                key={entry.id}
                                className={`rank-row grid grid-cols-12 items-center px-8 py-5 rounded-2xl border transition-all duration-300 ${getRowStyle(rank, isCurrentUser)}`}
                            >
                                <div className="col-span-2">
                                    {getRankIcon(rank)}
                                </div>
                                <div className="col-span-6 md:col-span-7 flex items-center gap-4">
                                    <div className="w-10 h-10 hidden sm:flex items-center justify-center bg-gray-800 rounded-xl text-xl">
                                        {rank > 3 ? '👤' : (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉')}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className={`font-black text-lg uppercase tracking-tight ${isCurrentUser ? 'text-cyan-400' : 'text-white'}`}>
                                                {entry.username}
                                            </p>
                                            {isCurrentUser && (
                                                <div className="px-2 py-0.5 bg-cyan-500 text-black text-[8px] font-black rounded uppercase">You</div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">LVL {entry.level || 1}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-3 text-right">
                                    <p className={`text-2xl font-black ${rank <= 3 ? (rank === 1 ? 'text-cyan-400' : rank === 2 ? 'text-purple-400' : 'text-amber-500') : 'text-gray-300'}`}>
                                        {entry.totalScore.toLocaleString()}
                                    </p>
                                    <div className="flex items-center justify-end gap-1 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                                        <ArrowUp className="w-2 h-2 text-green-500" /> +{Math.floor((entry.totalScore % 50) + 10)} PTS
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {sortedBoard.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                         <Ghost className="w-16 h-16 text-gray-800 mx-auto" />
                         <p className="text-gray-600 font-black uppercase tracking-widest">No legends registered yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}