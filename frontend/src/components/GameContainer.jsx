import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, RotateCcw, Info, Settings2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

import SnakeGame from '../games/SnakeGame';
import TetrisGame from '../games/TetrisGame';
import Game2048 from '../games/Game2048';
import MemoryMatch from '../games/MemoryMatch';
import SpaceShooter from '../games/SpaceShooter';
import TicTacToe from '../games/TicTacToe';

const games = {
  snake: { component: SnakeGame, difficulty: 'Easy', name: 'Neon Snake', category: 'Arcade' },
  tetris: { component: TetrisGame, difficulty: 'Medium', name: 'Cyber Tetris', category: 'Puzzle' },
  '2048': { component: Game2048, difficulty: 'Medium', name: 'Neon 2048', category: 'Logic' },
  memory: { component: MemoryMatch, difficulty: 'Easy', name: 'Memory Matrix', category: 'Brain' },
  shooter: { component: SpaceShooter, difficulty: 'Hard', name: 'Space Invaders', category: 'Action' },
  tictactoe: { component: TicTacToe, difficulty: 'Easy', name: 'Tic Tac Toe', category: 'Strategy' },
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

export default function GameContainer({ updateGameStats, settings }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games[id];
  const containerRef = useRef(null);
  const gameFrameRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.8
    })
    .from(gameFrameRef.current, {
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 1,
    }, "-=0.4")
    .from(".game-sidebar > *", {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    }, "-=0.6");
  }, { scope: containerRef });

  if (!game) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-4xl font-black text-white">404: LEVEL NOT FOUND</h2>
        <p className="text-gray-500">The game data core has been corrupted or moved.</p>
        <Magnetic>
            <button 
                onClick={() => navigate('/games')} 
                className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
            >
                Return to Nexus
            </button>
        </Magnetic>
      </div>
    );
  }

  const GameComponent = game.component;

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 pb-20 space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 bg-gray-900/40 border border-gray-800 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-6">
            <Magnetic>
                <button
                onClick={() => navigate('/games')}
                className="group flex items-center justify-center w-12 h-12 border border-gray-700 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </button>
            </Magnetic>
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-white">{game.name}</h2>
                    <span className="px-2 py-0.5 text-[10px] bg-gray-800 text-gray-500 rounded font-black uppercase tracking-tighter">Live</span>
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{game.category} • Browser Optimized</p>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <div className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest shadow-xl shadow-black/20 ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty} Mode
            </div>
            <Magnetic>
                <button className="p-3 text-gray-400 hover:text-white transition-colors bg-gray-800/50 rounded-xl">
                    <Settings2 className="w-5 h-5" />
                </button>
            </Magnetic>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Game Area */}
        <div className="lg:col-span-9 space-y-6">
            <div 
                ref={gameFrameRef}
                className="relative aspect-video lg:aspect-auto lg:h-[650px] bg-black rounded-[2.5rem] overflow-hidden border border-cyan-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
                <div className="absolute top-4 left-4 flex gap-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>

                <div className="w-full h-full flex items-center justify-center p-2 md:p-8">
                     <GameComponent 
                        updateGameStats={updateGameStats} 
                        settings={settings}
                        gameName={id}
                    />
                </div>

                {/* Bottom Game Controls Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="Restart">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-white/20"></div>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="Help">
                        <Info className="w-4 h-4" />
                    </button>
                     <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="Fullscreen">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* Sidebar / Leaderboard Preview */}
        <div className="lg:col-span-3 space-y-6 game-sidebar">
            <div className="bg-gray-900/40 border border-gray-800 rounded-[2rem] p-8 backdrop-blur-3xl space-y-6">
                <div className="space-y-1">
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">Session Data</h3>
                    <div className="h-1 w-8 bg-cyan-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                    <div className="p-4 bg-gray-950/50 border border-gray-800 rounded-2xl">
                         <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Current Multiplier</p>
                         <p className="text-2xl font-black text-cyan-400">1.2x</p>
                    </div>
                    <div className="p-4 bg-gray-950/50 border border-gray-800 rounded-2xl">
                         <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">XP Potential</p>
                         <p className="text-2xl font-black text-purple-400">+450</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-800 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Network Active</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Low Latency</span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[2rem] p-8 backdrop-blur-3xl group cursor-pointer hover:border-cyan-500/40 transition-all">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                    Level Up Fast <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">Complete daily challenges in {game.name} to earn bonus XP and climb the leaderboard.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

const ArrowRight = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
)
