import React from 'react';
import { Home, Gamepad2, Trophy, User, Settings } from 'lucide-react';

export default function Navigation({ currentPage, setCurrentPage, user }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'games', icon: Gamepad2, label: 'Games' },
        { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block sticky top-0 z-50 bg-gray-900/90 border-b border-cyan-500/20 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                                <Gamepad2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">NEXUS</h1>
                                <p className="text-xs text-gray-500">Gaming Platform</p>
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <div className="flex items-center gap-2">
                            {navItems.map(item => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentPage(item.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-white">{user?.username}</p>
                                <p className="text-xs text-gray-400">Level {user?.level || 1}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-2 border-cyan-500/50 text-lg font-bold text-white">
                                {user?.avatar || '🎮'}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 border-t border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-around h-20 px-2">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all transform ${
                                    isActive
                                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 scale-110'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-all ${
                                        isActive ? 'drop-shadow-[0_0_8px_rgb(34,211,238)]' : ''
                                    }`}
                                />
                                <span className="text-xs font-semibold">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Bottom Padding */}
            <div className="md:hidden h-20"></div>
        </>
    );
}