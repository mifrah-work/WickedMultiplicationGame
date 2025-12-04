import React from 'react';
import { gameData } from '../data/gameData';

const DaySelection = ({ onSelectDay, unlockedDays, practiceMode, onBackToHome, onResetProgress }) => {
  const modeTitle = practiceMode === 'multiplication' ? 'Multiplication Quest' : 'Division Quest';
  const modeEmoji = practiceMode === 'multiplication' ? '✖️' : '➗';

  // Helper to format seconds as mm:ss
  const formatTime = (secs) => {
    if (!secs) return null;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-600 via-green-700 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:justify-between">
          <button
            onClick={onBackToHome}
            className="px-6 py-2 bg-green-700 hover:bg-pink-600 text-green-100 font-bold rounded-lg transition-colors duration-200 flex items-center gap-2 border-2 border-pink-400 shadow"
          >
            ← Back to Home
          </button>
          <div className="flex-1 flex justify-end">
            <button
              onClick={onResetProgress}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              🔄 Reset Progress
            </button>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-center text-green-300 mb-4 drop-shadow-lg">
          {modeEmoji} {modeTitle} {modeEmoji}
        </h1>
        <p className="text-xl text-center text-pink-100 mb-12">
          Choose your adventure! Help defeat the villains!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(gameData).map(([day, chapter]) => {
            const isUnlocked = unlockedDays.includes(parseInt(day));
            const isCompleted = unlockedDays.includes(parseInt(day) + 1) || (parseInt(day) === 7 && unlockedDays.includes(8));
            // Get completion time from localStorage
            let completionTime = null;
            if (isCompleted) {
              const key = `wicked_chapter_time_${day}`;
              const secs = localStorage.getItem(key);
              if (secs) completionTime = formatTime(Number(secs));
            }

            return (
              <div
                key={day}
                className={`relative p-6 rounded-xl border-4 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-green-600 to-pink-500 border-green-300 hover:border-pink-300 shadow-lg hover:shadow-pink-400/50'
                    : 'bg-gray-700 border-gray-500 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isUnlocked && onSelectDay(parseInt(day))}
              >
                {/* Lock icon for locked days */}
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-gray-400">
                    🔒
                  </div>
                )}

                {/* Completion star for completed days */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 text-yellow-400 text-2xl">
                    ⭐
                  </div>
                )}

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-pink-300 mb-2">
                    Day {day}
                  </h2>
                  <h3 className="text-lg font-semibold text-green-200 mb-3">
                    {chapter.title}
                  </h3>
                  <div className="text-sm text-pink-200 mb-4">
                    <p><strong>Hero:</strong> {chapter.hero}</p>
                    <p><strong>Villain:</strong> {chapter.villain}</p>
                  </div>
                  <p className="text-sm text-green-100 italic">
                    {chapter.story}
                  </p>
                  {/* Completion time display */}
                  {completionTime && (
                    <p className="text-lg text-green-300 mt-2">Time: <span className="font-bold">{completionTime}</span></p>
                  )}
                </div>

                {/* Progress indicator */}
                <div className="mt-4 text-center">
                  {isCompleted ? (
                    <span className="text-green-200 font-bold">✅ Completed</span>
                  ) : isUnlocked ? (
                    <span className="text-green-300 font-bold">🎮 Play Now</span>
                  ) : (
                    <span className="text-gray-400">🔒 Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-green-900/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-pink-300 mb-4">🎯 Game Rules</h3>
            <div className="text-green-100 text-left space-y-2">
              <p>• Answer 50 multiplication questions (tables: 1, 2, 3, 4, 5, 10, 11)</p>
              <p>• Correct answers: Your hero attacks! ⚔️</p>
              <p>• Wrong answers: Villain strikes back! 💥</p>
              <p>• Win condition: Make 3 or fewer mistakes</p>
              <p>• Victory unlocks the next day! 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaySelection;