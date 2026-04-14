import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Zap, Sliders, AlertTriangle, ShieldCheck, Cpu, Database } from 'lucide-react';

export default function SettingsPage({ settings, updateSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggleSound = () => {
    const newSettings = { ...localSettings, soundEnabled: !localSettings.soundEnabled };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleToggleMusic = () => {
    const newSettings = { ...localSettings, musicEnabled: !localSettings.musicEnabled };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleDifficultyChange = (difficulty) => {
    const newSettings = { ...localSettings, difficulty };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleResetData = () => {
    if (window.confirm('CRITICAL: Are you sure you want to PURGE all game data? This will erase your level, high scores, and local identity.')) {
        localStorage.clear();
        window.location.href = '/';
    }
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto px-4 pb-20">
      {/* Configuration Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
          System <span className="text-cyan-400 not-italic">Config</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">
          Optimize your interface parameters
        </p>
      </div>

      <div className="grid gap-8">
        {/* Core Systems */}
        <section className="glass-effect rounded-[2.5rem] p-8 md:p-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-800">
                <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                    <Cpu className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Audio Processors</h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Atmosphere Control</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                 {/* Sound FX */}
                 <div onClick={handleToggleSound} className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-4 ${localSettings.soundEnabled ? 'border-cyan-500 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-gray-800 bg-gray-900/40 opacity-50'}`}>
                    {localSettings.soundEnabled ? <Volume2 className="w-10 h-10 text-cyan-400" /> : <VolumeX className="w-10 h-10 text-gray-600" />}
                    <div className="text-center">
                        <p className="font-black text-white uppercase tracking-widest text-sm">FX Engine</p>
                        <p className={`text-[10px] font-black uppercase mt-1 ${localSettings.soundEnabled ? 'text-cyan-400' : 'text-red-500'}`}>{localSettings.soundEnabled ? 'Operational' : 'Offline'}</p>
                    </div>
                 </div>

                 {/* Music */}
                 <div onClick={handleToggleMusic} className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-4 ${localSettings.musicEnabled ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'border-gray-800 bg-gray-900/40 opacity-50'}`}>
                    <Music className={`w-10 h-10 ${localSettings.musicEnabled ? 'text-purple-400' : 'text-gray-600'}`} />
                    <div className="text-center">
                        <p className="font-black text-white uppercase tracking-widest text-sm">Background Synth</p>
                        <p className={`text-[10px] font-black uppercase mt-1 ${localSettings.musicEnabled ? 'text-purple-400' : 'text-red-500'}`}>{localSettings.musicEnabled ? 'Operational' : 'Offline'}</p>
                    </div>
                 </div>
            </div>
        </section>

        {/* Gameplay Logic */}
        <section className="glass-effect rounded-[2.5rem] p-8 md:p-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-800">
                <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                    <Zap className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Difficulty Matrix</h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Challenge Calibration</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {['easy', 'medium', 'hard'].map((d) => (
                    <button
                        key={d}
                        onClick={() => handleDifficultyChange(d)}
                        className={`flex-1 min-w-[120px] py-6 px-4 rounded-3xl border-2 font-black uppercase tracking-widest text-sm transition-all
                            ${localSettings.difficulty === d ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)] scale-105' : 'border-gray-800 text-gray-500 hover:border-gray-700'}
                        `}
                    >
                        {d}
                    </button>
                ))}
            </div>
        </section>

        {/* Local Storage & Security */}
        <div className="grid md:grid-cols-2 gap-8">
            <section className="glass-effect rounded-[2.5rem] p-8">
                 <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-emerald-500" />
                    <h3 className="font-black text-white uppercase italic">Data Integrity</h3>
                 </div>
                 <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                    Nexus utilizes decentralized LocalStorage for hyper-fast state retrieval. 100% Client-Side.
                 </p>
                 <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> Validated encryption active
                 </div>
            </section>

            <section className="bg-red-500/5 border-2 border-red-500/20 rounded-[2.5rem] p-8 group hover:border-red-500/50 transition-colors">
                 <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    <h3 className="font-black text-red-500 uppercase italic">Danger Zone</h3>
                 </div>
                 <p className="text-red-900 font-bold text-xs uppercase tracking-widest mb-6">Critical Data Purge Protocol</p>
                 <button 
                    onClick={handleResetData}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 uppercase tracking-tighter italic"
                 >
                    INITIATE DATA ERASE
                 </button>
            </section>
        </div>

        {/* Manifest Footer */}
        <footer className="text-center pt-8 border-t border-gray-900">
             <div className="flex justify-center items-center gap-4 mb-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <Sliders className="w-5 h-5" />
                <Cpu className="w-5 h-5" />
                <Zap className="w-5 h-5" />
             </div>
             <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em]">Nexus OS v.1.0 // Prod // Build {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}