import React from 'react';
import { Gamepad2, Trophy, Target, Zap, ArrowRight } from 'lucide-react';

export default function HomePage({ setCurrentPage, user, gameStats }) {
  const totalGamesPlayed = Object.values(gameStats || {}).reduce((sum, stat) => sum + (stat?.gamesPlayed || 0), 0);
  const totalHighScore = Object.values(gameStats || {}).reduce((sum, stat) => sum + (stat?.highScore || 0), 0);
  const totalScore = user?.totalScore || 0;
  const userLevel = user?.level || 1;

  const stats = [
    {
      icon: Gamepad2,
      label: 'Games Played',
      value: totalGamesPlayed,
      color: 'from-cyan-500/20 to-cyan-500/10',
      textColor: 'text-cyan-400'
    },
    {
      icon: Trophy,
      label: 'Total Score',
      value: totalScore.toLocaleString(),
      color: 'from-purple-500/20 to-purple-500/10',
      textColor: 'text-purple-400'
    },
    {
      icon: Target,
      label: 'High Scores',
      value: totalHighScore.toLocaleString(),
      color: 'from-green-500/20 to-green-500/10',
      textColor: 'text-green-400'
    },
    {
      icon: Zap,
      label: 'Level',
      value: userLevel,
      color: 'from-yellow-500/20 to-yellow-500/10',
      textColor: 'text-yellow-400'
    }
  ];

  const features = [
    {
      title: 'Multiple Games',
      description: 'Choose from 5+ exciting arcade and puzzle games',
      icon: Gamepad2,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Leaderboards',
      description: 'Compete with players worldwide and climb the ranks',
      icon: Trophy,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your stats, achievements, and improvement',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 p-8 md:p-12 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-block bg-cyan-500/20 border border-cyan-500/50 rounded-full px-4 py-2 mb-4">
            <span className="text-cyan-400 font-semibold">Welcome Back, {user?.username || 'Player'}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-cyan-400">NEXUS</span>{' '}
            <span className="text-white">Gaming</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience the future of gaming with our collection of classic and modern games.
            Track your progress, compete on leaderboards, and become a legend.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('games')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all text-lg"
            >
              <Gamepad2 className="w-5 h-5" />
              Start Playing
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('leaderboard')}
              className="flex items-center gap-2 px-8 py-3 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 font-semibold rounded-lg transition-all text-lg"
            >
              <Trophy className="w-5 h-5" />
              View Leaderboard
            </button>
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

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="border border-gray-700/50 hover:border-gray-600 rounded-lg p-6 transition-all group hover:scale-105 transform bg-gray-900/30"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Access */}
      <div className="border-2 border-cyan-500/30 rounded-lg p-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">
            <span className="text-cyan-400">Ready to Play?</span>
          </h2>
          <p className="text-gray-400">Jump into action with our featured games</p>
          <button
            onClick={() => setCurrentPage('games')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all text-lg"
          >
            <Gamepad2 className="w-5 h-5" />
            Browse All Games
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}












// import React from 'react';
// import { Gamepad2, Trophy, Target, Zap, ArrowRight } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';

// export default function HomePage({ setCurrentPage, user, gameStats }) {
//   const totalGamesPlayed = Object.values(gameStats).reduce((sum, stat) => sum + stat.gamesPlayed, 0);
//   const totalHighScore = Object.values(gameStats).reduce((sum, stat) => sum + stat.highScore, 0);

//   const stats = [
//     {
//       icon: Gamepad2,
//       label: 'Games Played',
//       value: user?.gamesPlayed || 0,
//       color: 'text-primary',
//       glow: 'text-neon-cyan'
//     },
//     {
//       icon: Trophy,
//       label: 'Total Score',
//       value: user?.totalScore?.toLocaleString() || 0,
//       color: 'text-secondary',
//       glow: 'text-neon-magenta'
//     },
//     {
//       icon: Target,
//       label: 'High Scores',
//       value: totalHighScore?.toLocaleString() || 0,
//       color: 'text-accent',
//       glow: 'text-neon-purple'
//     },
//     {
//       icon: Zap,
//       label: 'Level',
//       value: user?.level || 1,
//       color: 'text-primary',
//       glow: 'text-neon-cyan'
//     }
//   ];

//   const features = [
//     {
//       title: 'Multiple Games',
//       description: 'Choose from 5+ exciting arcade and puzzle games',
//       icon: Gamepad2,
//       gradient: 'from-primary to-accent'
//     },
//     {
//       title: 'Leaderboards',
//       description: 'Compete with players worldwide and climb the ranks',
//       icon: Trophy,
//       gradient: 'from-secondary to-accent'
//     },
//     {
//       title: 'Track Progress',
//       description: 'Monitor your stats, achievements, and improvement',
//       icon: Target,
//       gradient: 'from-accent to-primary'
//     }
//   ];

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden rounded-2xl glass-card border-2 border-primary/20 p-8 md:p-12">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        
//         <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
//           <Badge className="bg-primary/20 text-primary border-primary/50 mb-4">
//             Welcome Back, {user?.username}
//           </Badge>
          
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//             <span className="text-neon-cyan">NEXUS</span>{' '}
//             <span className="text-foreground">Gaming</span>
//             <br />
//             <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//               Platform
//             </span>
//           </h1>
          
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//             Experience the future of gaming with our collection of classic and modern games.
//             Track your progress, compete on leaderboards, and become a legend.
//           </p>
          
//           <div className="flex flex-wrap justify-center gap-4 pt-4">
//             <Button
//               size="lg"
//               variant="neon"
//               onClick={() => setCurrentPage('games')}
//               className="gap-2 text-lg"
//             >
//               <Gamepad2 className="w-5 h-5" />
//               Start Playing
//               <ArrowRight className="w-5 h-5" />
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               onClick={() => setCurrentPage('leaderboard')}
//               className="gap-2 text-lg border-primary/50 hover:border-primary"
//             >
//               <Trophy className="w-5 h-5" />
//               View Leaderboard
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={index} className="glass-card border-border/50 hover:border-primary/50 transition-all group">
//               <CardContent className="p-6">
//                 <div className="flex flex-col items-center text-center space-y-3">
//                   <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color === 'text-primary' ? 'from-primary/20 to-primary/10' : stat.color === 'text-secondary' ? 'from-secondary/20 to-secondary/10' : 'from-accent/20 to-accent/10'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
//                     <Icon className={`w-6 h-6 ${stat.glow}`} />
//                   </div>
//                   <div>
//                     <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
//                     <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Features Section */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {features.map((feature, index) => {
//           const Icon = feature.icon;
//           return (
//             <Card key={index} className="glass-card border-border/50 hover:border-primary/50 transition-all group">
//               <CardHeader>
//                 <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                   <Icon className="w-6 h-6 text-primary-foreground" />
//                 </div>
//                 <CardTitle className="text-xl">{feature.title}</CardTitle>
//                 <CardDescription className="text-base">{feature.description}</CardDescription>
//               </CardHeader>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Quick Access */}
//       <Card className="glass-card border-2 border-primary/20">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">
//             <span className="text-neon-cyan">Ready to Play?</span>
//           </CardTitle>
//           <CardDescription className="text-center text-base">
//             Jump into action with our featured games
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-center">
//             <Button
//               size="lg"
//               variant="neon"
//               onClick={() => setCurrentPage('games')}
//               className="gap-2"
//             >
//               <Gamepad2 className="w-5 h-5" />
//               Browse All Games
//               <ArrowRight className="w-5 h-5" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }