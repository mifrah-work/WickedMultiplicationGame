import React from 'react';
import { gameData } from '../data/gameData';

const DaySelection = ({ onSelectDay, unlockedDays, practiceMode, onBackToHome, onResetProgress }) => {
  const modeTitle = practiceMode === 'multiplication' ? 'Multiplication Quest' : 'Division Quest';
  const modeEmoji = practiceMode === 'multiplication' ? '✖️' : '➗';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:justify-between">
          <button
            onClick={onBackToHome}
            className="px-6 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
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
        
        <h1 className="text-6xl font-bold text-center text-yellow-400 mb-4 drop-shadow-lg">
          {modeEmoji} {modeTitle} {modeEmoji}
        </h1>
        <p className="text-xl text-center text-white mb-12">
          Choose your adventure! Help defeat the villains!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(gameData).map(([day, chapter]) => {
            const isUnlocked = unlockedDays.includes(parseInt(day));
            const isCompleted = unlockedDays.includes(parseInt(day) + 1) || (parseInt(day) === 7 && unlockedDays.includes(8));
            
            return (
              <div
                key={day}
                className={`relative p-6 rounded-xl border-4 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-yellow-400 hover:border-yellow-300 shadow-lg hover:shadow-yellow-400/50'
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
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                    Day {day}
                  </h2>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {chapter.title}
                  </h3>
                  <div className="text-sm text-gray-200 mb-4">
                    <p><strong>Hero:</strong> {chapter.hero}</p>
                    <p><strong>Villain:</strong> {chapter.villain}</p>
                  </div>
                  <p className="text-sm text-gray-300 italic">
                    {chapter.story}
                  </p>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-4 text-center">
                  {isCompleted ? (
                    <span className="text-green-400 font-bold">✅ Completed</span>
                  ) : isUnlocked ? (
                    <span className="text-yellow-400 font-bold">🎮 Play Now</span>
                  ) : (
                    <span className="text-gray-400">🔒 Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-black/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎯 Game Rules</h3>
            <div className="text-white text-left space-y-2">
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