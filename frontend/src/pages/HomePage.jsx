import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Trophy, Target, Zap, ArrowRight, Star, Users, Flame } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WavyTransition from '../components/WavyTransition';
import MouseTrail from '../components/MouseTrail';

export default function HomePage({ user, gameStats }) {
  const navigate = useNavigate();
  const container = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  useGSAP(() => {
    // Parallax Orbs
    gsap.to(orb1.current, {
        y: -150,
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
        }
    });

    gsap.to(orb2.current, {
        y: 100,
        x: -50,
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
        }
    });

    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      delay: 1.2
    });

    // Independent Scroll Reveals for Stats
    gsap.utils.toArray(".stat-card").forEach((card) => {
        gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });
  }, { scope: container });
  const totalGamesPlayed = Object.values(gameStats || {}).reduce((sum, stat) => sum + (stat?.gamesPlayed || 0), 0);
  const totalHighScore = Object.values(gameStats || {}).reduce((sum, stat) => sum + (stat?.highScore || 0), 0);
  const totalScore = user?.totalScore || 0;
  const userLevel = user?.level || 1;

  const stats = [
    {
      icon: Gamepad2,
      label: 'Games Played',
      value: totalGamesPlayed,
      color: 'from-cyan-500/20 to-blue-500/10',
      textColor: 'text-cyan-400'
    },
    {
      icon: Trophy,
      label: 'Total Score',
      value: totalScore.toLocaleString(),
      color: 'from-purple-500/20 to-pink-500/10',
      textColor: 'text-purple-400'
    },
    {
      icon: Target,
      label: 'High Scores',
      value: totalHighScore.toLocaleString(),
      color: 'from-green-500/20 to-emerald-500/10',
      textColor: 'text-green-400'
    },
    {
      icon: Zap,
      label: 'Level reached',
      value: userLevel,
      color: 'from-yellow-500/20 to-orange-500/10',
      textColor: 'text-yellow-400'
    }
  ];

  return (
    <div ref={container} className="space-y-16 pb-12 relative overflow-hidden">
      <WavyTransition />
      <MouseTrail />
      {/* Background Orbs */}
      <div ref={orb1} className="absolute top-20 right-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div ref={orb2} className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gray-900/40 border border-gray-800 p-8 md:p-20 backdrop-blur-3xl shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        
        <div className="hero-content relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-2 shadow-inner">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-gray-300 font-medium text-sm">Welcome Back, <span className="text-cyan-400 font-bold">{user?.username}</span></span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter">
            <span className="text-white">ULTIMATE</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              NEXUS GAMING
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            The playground for the next generation. Play iconic arcade classics reimagined for the web.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <button
              onClick={() => navigate('/games')}
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-2xl transition-all text-xl shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] hover:scale-105"
            >
              <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              PLAY NOW
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-gray-800/50 border border-gray-700 text-white font-extrabold rounded-2xl transition-all text-xl hover:bg-gray-800 hover:border-cyan-500/50 backdrop-blur-sm"
            >
              <Trophy className="w-6 h-6 text-yellow-500" />
              RANKINGS
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className={`stat-card bg-gradient-to-br ${stat.color} border border-gray-800/50 backdrop-blur-xl rounded-3xl p-8 transition-all group hover:border-gray-600 hover:shadow-2xl`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Highlights */}
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
        <div className="p-10 rounded-[2rem] bg-gradient-to-br from-purple-600/20 to-pink-600/5 border border-purple-500/20 relative overflow-hidden group">
          <Flame className="absolute top-2 right-2 w-32 h-32 text-purple-500/5 group-hover:scale-125 transition-transform" />
          <h3 className="text-3xl font-bold text-white mb-4">Daily Challenges</h3>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            New objectives every 24 hours. Complete them to earn exclusive badges and bonus XP for your profile.
          </p>
          <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-sm">
            Coming Soon <Star className="w-4 h-4 fill-purple-400" />
          </div>
        </div>

        <div className="p-10 rounded-[2rem] bg-gradient-to-br from-cyan-600/20 to-blue-600/5 border border-cyan-500/20 relative overflow-hidden group">
          <Users className="absolute top-2 right-2 w-32 h-32 text-cyan-500/5 group-hover:scale-125 transition-transform" />
          <h3 className="text-3xl font-bold text-white mb-4">Nexus Community</h3>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Join thousands of players worldwide. Share your high scores, discover tips, and suggest new mini-games.
          </p>
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-sm">
            Active Community <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-[2.5rem] bg-gray-900/60 border border-gray-800 p-12 text-center shadow-2xl overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold text-white">Your game is waiting.</h2>
            <p className="text-gray-400 text-lg">No installs. No lag. Just pure arcade bliss.</p>
            <button
              onClick={() => navigate('/games')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-colors shadow-2xl"
            >
              BROWSE GAMES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}