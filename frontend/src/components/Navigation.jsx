import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Trophy, User, Settings } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navigation({ user }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home', path: '/' },
        { id: 'games', icon: Gamepad2, label: 'Games', path: '/games' },
        { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
        { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
        { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block sticky top-0 z-50 bg-gray-900/90 border-b border-cyan-500/20 backdrop-blur-sm shadow-2xl">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Magnetic>
                            <NavLink to="/" className="flex items-center gap-3 group cursor-pointer decoration-transparent">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                                    <Gamepad2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">NEXUS</h1>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Web Games</p>
                                </div>
                            </NavLink>
                        </Magnetic>

                        {/* Navigation Items */}
                        <div className="flex items-center gap-2">
                            {navItems.map(item => {
                                const Icon = item.icon;
                                return (
                                    <Magnetic key={item.id}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.label}
                                        </NavLink>
                                    </Magnetic>
                                );
                            })}
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-white">{user?.username}</p>
                                <p className="text-[10px] text-gray-400 uppercase">Level {user?.level || 1}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-2 border-cyan-500/50 text-lg font-bold text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]">
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
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) => `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all transform ${
                                    isActive
                                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 scale-110 shadow-[0_-4px_10px_-4px_rgba(34,211,238,0.5)]'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <Icon
                                    className="w-5 h-5 transition-all"
                                />
                                <span className="text-[10px] font-bold uppercase">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Bottom Padding */}
            <div className="md:hidden h-20"></div>
        </>
    );
}