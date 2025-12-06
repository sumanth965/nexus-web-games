// App.jsx
import React, { useState, useEffect } from 'react';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: true,
    difficulty: 'medium',
  });
  const [selectedGame, setSelectedGame] = useState(null);

  // Initialize user & leaderboard
  useEffect(() => {
    if (!user) {
      setUser({
        id: Date.now(),
        username: 'Player' + Math.floor(Math.random() * 1000),
        avatar: '🎮',
        level: 1,
        totalScore: 0,
        gamesPlayed: 0,
      });
    }

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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} user={user} gameStats={gameStats} />;

      case 'games':
        return (
          <GamesPage
            updateGameStats={updateGameStats}
            setSelectedGame={setSelectedGame}
            selectedGame={selectedGame}
            settings={settings}   // ✅ CRITICAL FIX
          />
        );

      case 'leaderboard':
        return <LeaderboardPage leaderboard={leaderboard} currentUser={user} />;

      case 'profile':
        return <ProfilePage user={user} updateUser={setUser} gameStats={gameStats} />;

      case 'settings':
        return <SettingsPage settings={settings} updateSettings={setSettings} />;

      default:
        return <HomePage setCurrentPage={setCurrentPage} user={user} gameStats={gameStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
      />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {renderPage()}
      </main>
    </div>
  );
}


// Utility
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// UI Components
// const Button = ({ variant = 'default', size = 'default', children, className = '', ...props }) => {
//   const variants = {
//     default: 'bg-primary text-white hover:bg-primary/90',
//     destructive: 'bg-red-600 text-white hover:bg-red-700',
//     outline: 'border border-primary/50 bg-transparent hover:bg-primary/10',
//     ghost: 'hover:bg-accent hover:text-accent-foreground',
//     neon: 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]',
//   };
  
//   const sizes = {
//     default: 'px-4 py-2 text-sm',
//     sm: 'px-3 py-1.5 text-xs',
//     lg: 'px-6 py-3 text-base',
//     icon: 'p-2',
//   };

//   return (
//     <button className={cn('rounded-lg transition-all flex items-center gap-2', variants[variant], sizes[size], className)} {...props}>
//       {children}
//     </button>
//   );
// };

// const Card = ({ children, className = '' }) => (
//   <div className={cn('bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm', className)}>
//     {children}
//   </div>
// );

// const Badge = ({ children, className = '' }) => (
//   <span className={cn('inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded-full text-xs font-medium', className)}>
//     {children}
//   </span>
// );

// const Input = ({ className = '', ...props }) => (
//   <input className={cn('bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500', className)} {...props} />
// );

// const Label = ({ children, className = '' }) => (
//   <label className={cn('text-sm font-medium text-gray-300', className)}>{children}</label>
// );

// const Switch = ({ checked, onChange }) => (
//   <button onClick={() => onChange(!checked)} className={cn('relative w-12 h-6 rounded-full transition-colors', checked ? 'bg-cyan-500' : 'bg-gray-600')}>
//     <span className={cn('absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform', checked && 'translate-x-6')} />
//   </button>
// );

// const Avatar = ({ children }) => (
//   <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
//     {children}
//   </div>
// );




// Games
// const SnakeGame = ({ updateGameStats }) => {
//   const [score, setScore] = useState(0);
//   const [gameStarted, setGameStarted] = useState(false);

//   return (
//     <Card>
//       <div className="text-center space-y-4">
//         <h3 className="text-2xl font-bold text-cyan-400">🐍 Neon Snake</h3>
//         <p className="text-gray-400">Score: {score}</p>
//         <Button variant="neon" onClick={() => { setScore(Math.floor(Math.random() * 100)); updateGameStats('snake', Math.floor(Math.random() * 100)); }}>
//           <Play className="w-4 h-4" /> Play
//         </Button>
//       </div>
//     </Card>
//   );
// };

// const TetrisGame = ({ updateGameStats }) => (
//   <Card>
//     <div className="text-center space-y-4">
//       <h3 className="text-2xl font-bold text-cyan-400">🟦 Cyber Tetris</h3>
//       <Button variant="neon" onClick={() => updateGameStats('tetris', 50)}><Play className="w-4 h-4" /> Play</Button>
//     </div>
//   </Card>
// );

// const Game2048 = ({ updateGameStats }) => (
//   <Card>
//     <div className="text-center space-y-4">
//       <h3 className="text-2xl font-bold text-cyan-400">🔢 Neon 2048</h3>
//       <Button variant="neon" onClick={() => updateGameStats('2048', 150)}><Play className="w-4 h-4" /> Play</Button>
//     </div>
//   </Card>
// );

// const MemoryMatch = ({ updateGameStats }) => (
//   <Card>
//     <div className="text-center space-y-4">
//       <h3 className="text-2xl font-bold text-cyan-400">🧠 Memory Matrix</h3>
//       <Button variant="neon" onClick={() => updateGameStats('memory', 80)}><Play className="w-4 h-4" /> Play</Button>
//     </div>
//   </Card>
// );

// const SpaceShooter = ({ updateGameStats }) => (
//   <Card>
//     <div className="text-center space-y-4">
//       <h3 className="text-2xl font-bold text-cyan-400">🚀 Space Invaders</h3>
//       <Button variant="neon" onClick={() => updateGameStats('shooter', 200)}><Play className="w-4 h-4" /> Play</Button>
//     </div>
//   </Card>
// );

// Pages
// const HomePage = ({ setCurrentPage, user, gameStats }) => {
//   const totalGames = Object.values(gameStats).reduce((sum, stat) => sum + (stat?.gamesPlayed || 0), 0);
  
//   return (
//     <div className="space-y-8">
//       <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-2xl p-12 text-center">
//         <h1 className="text-5xl font-bold mb-4">
//           <span className="text-cyan-400">NEXUS</span> Gaming Platform
//         </h1>
//         <p className="text-gray-400 mb-6">Experience the future of gaming with classic and modern games</p>
//         <Button variant="neon" onClick={() => setCurrentPage('games')} className="w-full md:w-auto justify-center">
//           <Gamepad2 className="w-5 h-5" /> Start Playing
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="text-center">
//           <div className="text-3xl font-bold text-cyan-400">{totalGames}</div>
//           <div className="text-sm text-gray-400">Games Played</div>
//         </Card>
//         <Card className="text-center">
//           <div className="text-3xl font-bold text-purple-400">{user?.totalScore || 0}</div>
//           <div className="text-sm text-gray-400">Total Score</div>
//         </Card>
//         <Card className="text-center">
//           <div className="text-3xl font-bold text-green-400">{user?.level || 1}</div>
//           <div className="text-sm text-gray-400">Level</div>
//         </Card>
//         <Card className="text-center">
//           <div className="text-3xl font-bold text-yellow-400">{user?.gamesPlayed || 0}</div>
//           <div className="text-sm text-gray-400">Sessions</div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// const GamesPage = ({ updateGameStats, setSelectedGame, selectedGame }) => {
//   const games = [
//     { id: 'snake', name: 'Neon Snake', component: SnakeGame },
//     { id: 'tetris', name: 'Cyber Tetris', component: TetrisGame },
//     { id: '2048', name: 'Neon 2048', component: Game2048 },
//     { id: 'memory', name: 'Memory Matrix', component: MemoryMatch },
//     { id: 'shooter', name: 'Space Invaders', component: SpaceShooter },
//   ];

//   if (selectedGame) {
//     const GameComp = selectedGame.component;
//     return (
//       <div className="space-y-4">
//         <Button variant="outline" onClick={() => setSelectedGame(null)}><ArrowLeft className="w-4 h-4" /> Back</Button>
//         <GameComp updateGameStats={updateGameStats} />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-4xl font-bold text-center"><span className="text-cyan-400">Choose</span> Your Game</h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {games.map(game => (
//           <Card key={game.id} className="cursor-pointer hover:border-cyan-500/50 transition-all">
//             <h3 className="text-xl font-bold text-cyan-400 mb-2">{game.name}</h3>
//             <Button variant="neon" className="w-full" onClick={() => setSelectedGame(game)}>Play Now</Button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// const LeaderboardPage = ({ leaderboard, currentUser }) => {
//   const sortedBoard = [...leaderboard].sort((a, b) => b.totalScore - a.totalScore);
  
//   return (
//     <div className="space-y-6">
//       <h1 className="text-4xl font-bold text-center"><span className="text-cyan-400">Global</span> Leaderboard</h1>
      
//       {currentUser && (
//         <Card className="border-cyan-500/50">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-cyan-400 font-bold">{currentUser.username}</p>
//               <p className="text-gray-400 text-sm">Level {currentUser.level}</p>
//             </div>
//             <p className="text-2xl font-bold text-cyan-400">{currentUser.totalScore}</p>
//           </div>
//         </Card>
//       )}

//       <Card>
//         <div className="space-y-2">
//           {sortedBoard.slice(0, 10).map((entry, idx) => (
//             <div key={idx} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <span className="text-lg font-bold text-cyan-400">#{idx + 1}</span>
//                 <div>
//                   <p className="font-semibold text-white">{entry.username}</p>
//                   <p className="text-xs text-gray-400">Lvl {entry.level}</p>
//                 </div>
//               </div>
//               <p className="text-xl font-bold text-purple-400">{entry.totalScore}</p>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// };

// const ProfilePage = ({ user, updateUser, gameStats }) => {
//   const [editing, setEditing] = useState(false);
//   const [username, setUsername] = useState(user?.username || '');

//   const handleSave = () => {
//     if (username.trim()) {
//       updateUser({ ...user, username: username.trim() });
//       setEditing(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-4xl font-bold text-center"><span className="text-cyan-400">Your</span> Profile</h1>

//       <Card className="border-cyan-500/50">
//         <div className="flex items-center gap-4 mb-4">
//           <Avatar>{user?.avatar || '🎮'}</Avatar>
//           <div className="flex-1">
//             {editing ? (
//               <div className="space-y-2">
//                 <Input value={username} onChange={(e) => setUsername(e.target.value)} />
//                 <div className="flex gap-2">
//                   <Button variant="neon" size="sm" onClick={handleSave}><Save className="w-4 h-4" /> Save</Button>
//                   <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <h2 className="text-2xl font-bold text-cyan-400">{user?.username}</h2>
//                 <Button variant="ghost" size="icon" onClick={() => setEditing(true)}><Edit2 className="w-4 h-4" /></Button>
//               </div>
//             )}
//             <Badge>Level {user?.level}</Badge>
//           </div>
//         </div>
//       </Card>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="text-center">
//           <div className="text-2xl font-bold text-cyan-400">{user?.totalScore || 0}</div>
//           <div className="text-xs text-gray-400">Total Score</div>
//         </Card>
//         <Card className="text-center">
//           <div className="text-2xl font-bold text-purple-400">{user?.gamesPlayed || 0}</div>
//           <div className="text-xs text-gray-400">Games</div>
//         </Card>
//         <Card className="text-center">
//           <div className="text-2xl font-bold text-green-400">{user?.level || 1}</div>
//           <div className="text-xs text-gray-400">Level</div>
//         </Card>
//         <Card className="text-center">
//           <div className="text-2xl font-bold text-yellow-400">{(user?.level || 1) + 1}</div>
//           <div className="text-xs text-gray-400">Next Level</div>
//         </Card>
//       </div>

//       <Card>
//         <h3 className="text-lg font-bold text-cyan-400 mb-4">Game Statistics</h3>
//         <div className="space-y-2">
//           {Object.entries(gameStats).map(([gameId, stats]) => (
//             <div key={gameId} className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
//               <span className="text-white capitalize">{gameId}</span>
//               <div className="text-right">
//                 <div className="text-cyan-400 font-bold">{stats.highScore}</div>
//                 <div className="text-xs text-gray-400">{stats.gamesPlayed} plays</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// };

// const SettingsPage = ({ settings, updateSettings }) => {
//   const handleResetData = () => {
//     if (window.confirm('Reset all data?')) {
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-4xl font-bold text-center"><span className="text-cyan-400">Game</span> Settings</h1>

//       <Card>
//         <h3 className="text-lg font-bold text-cyan-400 mb-4">Audio Settings</h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <Label>Sound Effects</Label>
//             <Switch checked={settings.soundEnabled} onChange={(val) => updateSettings({ ...settings, soundEnabled: val })} />
//           </div>
//           <div className="flex items-center justify-between">
//             <Label>Background Music</Label>
//             <Switch checked={settings.musicEnabled} onChange={(val) => updateSettings({ ...settings, musicEnabled: val })} />
//           </div>
//         </div>
//       </Card>

//       <Card>
//         <h3 className="text-lg font-bold text-cyan-400 mb-4">Game Settings</h3>
//         <div>
//           <Label>Difficulty</Label>
//           <select className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" value={settings.difficulty} onChange={(e) => updateSettings({ ...settings, difficulty: e.target.value })}>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>
//         </div>
//       </Card>

//       <Card className="border-red-500/30">
//         <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
//         <Button variant="destructive" onClick={handleResetData}>Reset All Data</Button>
//       </Card>

//       <Card className="text-center text-gray-400 text-sm">
//         NEXUS Gaming Platform v1.0.0
//       </Card>
//     </div>
//   );
// };

// Navigation
// const Navigation = ({ currentPage, setCurrentPage, user }) => {
//   const navItems = [
//     { id: 'home', label: 'Home', icon: Home },
//     { id: 'games', label: 'Games', icon: Gamepad2 },
//     { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-gray-900/90 border-b border-cyan-500/20 backdrop-blur-sm">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Gamepad2 className="w-6 h-6 text-cyan-400" />
//           <span className="font-bold text-cyan-400">NEXUS</span>
//         </div>
//         <div className="hidden md:flex gap-2">
//           {navItems.map(item => (
//             <Button key={item.id} variant={currentPage === item.id ? 'neon' : 'ghost'} size="sm" onClick={() => setCurrentPage(item.id)}>
//               <item.icon className="w-4 h-4" /> {item.label}
//             </Button>
//           ))}
//         </div>
//         <div className="text-right">
//           <p className="font-semibold text-white text-sm">{user?.username}</p>
//           <p className="text-xs text-gray-400">Level {user?.level}</p>
//         </div>
//       </div>
//       <div className="md:hidden flex gap-1 overflow-x-auto pb-4 px-4">
//         {navItems.map(item => (
//           <Button key={item.id} variant={currentPage === item.id ? 'neon' : 'outline'} size="sm" onClick={() => setCurrentPage(item.id)}>
//             <item.icon className="w-4 h-4" />
//           </Button>
//         ))}
//       </div>
//     </nav>
//   );
// };

// Main App
