import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../components/Magnetic';

export default function GamesPage() {
  const navigate = useNavigate();
  const container = useRef(null);

  useGSAP(() => {
    // Independent 3D Card Reveals
    gsap.utils.toArray(".game-card").forEach((card) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            rotationX: -15,
            transformOrigin: "50% 0%",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 95%",
                toggleActions: "play none none reverse",
            }
        });
    });

    // Stagger reveal for stats
    gsap.from(".footer-stat", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".footer-stat",
            start: "top 95%",
        }
    });
  }, { scope: container });

  const games = [
    {
      id: 'snake',
      name: 'Neon Snake',
      description: 'Classic snake game with a cyberpunk twist',
      difficulty: 'Easy',
      color: 'from-cyan-500 to-blue-500',
      icon: '🐍',
      image: '/assets/snake.png',
    },
    {
      id: 'tetris',
      name: 'Cyber Tetris',
      description: 'Stack blocks in this timeless puzzle game',
      difficulty: 'Medium',
      color: 'from-purple-500 to-pink-500',
      icon: '🟦',
    },
    {
      id: '2048',
      name: 'Neon 2048',
      description: 'Combine tiles to reach 2048',
      difficulty: 'Medium',
      color: 'from-green-500 to-emerald-500',
      icon: '🔢',
    },
    {
      id: 'memory',
      name: 'Memory Matrix',
      description: 'Match pairs in this memory challenge',
      difficulty: 'Easy',
      color: 'from-yellow-500 to-orange-500',
      icon: '🧠',
    },
    {
      id: 'shooter',
      name: 'Space Invaders',
      description: 'Defend against the alien invasion',
      difficulty: 'Hard',
      color: 'from-red-500 to-pink-500',
      icon: '🚀',
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'Classic 2-player strategy match',
      difficulty: 'Easy',
      color: 'from-blue-600 to-cyan-600',
      icon: '⭕',
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Hard':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div ref={container} className="space-y-10 px-4">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Choose</span>{' '}
          <span className="text-white">Your Game</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Dive into our collection of classic & modern arcade games optimized for your browser.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/game/${game.id}`)}
            className="game-card animate-glint group cursor-pointer bg-gray-900/40 border border-gray-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-sm"
          >
            {/* IMAGE OR ICON */}
            <div className={`h-40 bg-gradient-to-br ${game.color} flex items-center justify-center p-6 relative overflow-hidden`}>
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              {game.image ? (
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-24 h-24 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform relative z-10"
                />
              ) : (
                <div className="text-7xl group-hover:scale-110 transition-transform drop-shadow-2xl relative z-10">
                  {game.icon}
                </div>
              )}
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {game.name}
                  </h3>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{game.description}</p>
              </div>

              <Magnetic>
                <button
                  className="w-full py-4 bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 text-white rounded-2xl font-bold transition-all shadow-xl"
                >
                  Launch Game
                </button>
              </Magnetic>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-gray-800 max-w-6xl mx-auto">
        <div className="footer-stat">
            <Stat icon={Zap} label="Instantly Playable" text="No downloads required" color="cyan" />
        </div>
        <div className="footer-stat">
            <Stat icon={Trophy} label="Global Leaderboard" text="Compete for world rank" color="purple" />
        </div>
        <div className="footer-stat">
            <Stat icon={Zap} label="Save Progress" text="Scores sync to profile" color="green" />
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types, no-unused-vars
function Stat({ icon: Icon, label, text, color }) {
  const colors = {
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    purple: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
    green: 'text-green-400 border-green-500/20 bg-green-500/5',
  };

  return (
    <div className={`border rounded-2xl p-6 text-center backdrop-blur-sm ${colors[color]}`}>
      <div className="flex justify-center items-center gap-3 mb-2">
        <Icon className="w-6 h-6" />
        <span className="font-bold text-lg">{label}</span>
      </div>
      <p className="text-sm text-gray-400 font-medium">{text}</p>
    </div>
  );
}
