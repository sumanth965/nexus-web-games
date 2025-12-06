import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Zap, Sliders, AlertTriangle } from 'lucide-react';

export default function SettingsPage({ settings, updateSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
    if (window.confirm('Are you sure you want to reset all game data? This action cannot be undone.')) {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 pb-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <Sliders className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="text-cyan-400">Game</span>{' '}
          <span className="text-white">Settings</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Customize your gaming experience
        </p>
      </div>

      {/* Audio Settings */}
      <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-6">
        <div className="mb-6 pb-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Audio Settings</h2>
          </div>
          <p className="text-gray-400 text-sm">Control sound effects and music</p>
        </div>

        <div className="space-y-4">
          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-all">
            <div className="flex items-center gap-4">
              {localSettings.soundEnabled ? (
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-cyan-400" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gray-700/30 flex items-center justify-center">
                  <VolumeX className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div>
                <p className="font-semibold text-white">Sound Effects</p>
                <p className="text-sm text-gray-400">Enable or disable game sound effects</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.soundEnabled}
                onChange={handleToggleSound}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-all">
            <div className="flex items-center gap-4">
              {localSettings.musicEnabled ? (
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Music className="w-6 h-6 text-purple-400" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gray-700/30 flex items-center justify-center">
                  <Music className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div>
                <p className="font-semibold text-white">Background Music</p>
                <p className="text-sm text-gray-400">Enable or disable background music</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.musicEnabled}
                onChange={handleToggleMusic}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Game Settings */}
      <div className="bg-gray-900/30 border border-gray-700/50 rounded-2xl p-6">
        <div className="mb-6 pb-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Game Settings</h2>
          </div>
          <p className="text-gray-400 text-sm">Adjust gameplay preferences</p>
        </div>

        <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
          <div className="space-y-3">
            <label className="block font-semibold text-white">Default Difficulty</label>
            <p className="text-sm text-gray-400 mb-3">Set the default difficulty level for games</p>
            <select
              value={localSettings.difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="w-full md:w-64 bg-gray-800 border border-gray-600 hover:border-gray-500 focus:border-cyan-500 focus:outline-none rounded-lg px-4 py-2 text-white font-semibold transition-all cursor-pointer"
            >
              <option value="easy">Easy - Casual Play</option>
              <option value="medium">Medium - Balanced</option>
              <option value="hard">Hard - Challenge Mode</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border-2 border-red-500/30 rounded-2xl p-6">
        <div className="mb-6 pb-4 border-b border-red-500/30">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-red-400">Danger Zone</h2>
          </div>
          <p className="text-red-300/70 text-sm">Irreversible actions - proceed with caution</p>
        </div>

        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-red-400">Reset All Data</p>
              <p className="text-sm text-gray-400 mt-1">
                This will delete all your game progress, scores, and statistics. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={handleResetData}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-gray-700/50 rounded-2xl p-6 text-center">
        <p className="text-sm font-semibold text-white">
          NEXUS Gaming Platform v1.0.0
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Built with React, Tailwind CSS, and modern web technologies
        </p>
        <p className="text-xs text-gray-500 mt-3">
          © 2025 NEXUS. All rights reserved.
        </p>
      </div>
    </div>
  );
}