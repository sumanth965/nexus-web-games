import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import GameContainer from './components/GameContainer';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState({});
  const location = useLocation();
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Page Transition Effect
  useEffect(() => {
    // Scroll to top instantly
    if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
    }

    // GSAP Page Entrance
    gsap.fromTo(mainRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
    );
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  }, [location.pathname]);

  const [leaderboard, setLeaderboard] = useState([]);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: true,
    difficulty: 'medium',
  });

  // Initialize user & leaderboard
  useEffect(() => {
    // Load from LocalStorage
    const savedUser = localStorage.getItem('nexus_user');
    const savedStats = localStorage.getItem('nexus_stats');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    else {
      setUser({
        id: Date.now(),
        username: 'Player' + Math.floor(Math.random() * 1000),
        avatar: '🎮',
        level: 1,
        totalScore: 0,
        gamesPlayed: 0,
      });
    }

    if (savedStats) setGameStats(JSON.parse(savedStats));

    if (leaderboard.length === 0) {
      setLeaderboard([
        { id: 1, username: 'CyberKing', totalScore: 15420, level: 12 },
        { id: 2, username: 'NeonQueen', totalScore: 14890, level: 11 },
        { id: 3, username: 'PixelMaster', totalScore: 13560, level: 10 },
        { id: 4, username: 'GlitchHero', totalScore: 12340, level: 9 },
        { id: 5, username: 'ArcadeKing', totalScore: 11200, level: 8 },
      ]);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem('nexus_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nexus_stats', JSON.stringify(gameStats));
  }, [gameStats]);

  // Unified game stats updater (used by ALL games)
  const updateGameStats = (gameName, score) => {
    setGameStats(prev => {
      const stats = prev[gameName] || { highScore: 0, gamesPlayed: 0, totalScore: 0 };

      return {
        ...prev,
        [gameName]: {
          highScore: Math.max(stats.highScore, score),
          gamesPlayed: stats.gamesPlayed + 1,
          totalScore: stats.totalScore + score,
        },
      };
    });

    setUser(prev => {
      const newTotal = prev.totalScore + score;
      return {
        ...prev,
        totalScore: newTotal,
        gamesPlayed: prev.gamesPlayed + 1,
        level: Math.floor(newTotal / 1000) + 1,
      };
    });

    setLeaderboard(prev => {
      const updated = [...prev];
      const idx = updated.findIndex(p => p.id === user?.id);

      const playerEntry = {
        id: user?.id,
        username: user?.username,
        totalScore: (user?.totalScore || 0) + score,
        level: Math.floor(((user?.totalScore || 0) + score) / 1000) + 1,
      };

      if (idx >= 0) updated[idx] = playerEntry;
      else updated.push(playerEntry);

      return updated.sort((a, b) => b.totalScore - a.totalScore).slice(0, 100);
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
      <CustomCursor />
      <div className="noise" />
      <Navigation user={user} />

      <main ref={mainRef} className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <Routes>
          <Route path="/" element={<HomePage user={user} gameStats={gameStats} />} />
          <Route path="/games" element={<GamesPage updateGameStats={updateGameStats} settings={settings} />} />
          <Route path="/game/:id" element={<GameContainer updateGameStats={updateGameStats} settings={settings} />} />
          <Route path="/leaderboard" element={<LeaderboardPage leaderboard={leaderboard} currentUser={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} updateUser={setUser} gameStats={gameStats} />} />
          <Route path="/settings" element={<SettingsPage settings={settings} updateSettings={setSettings} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
// };

// Main App
