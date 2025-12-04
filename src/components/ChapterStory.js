import React from 'react';
import { gameData } from '../data/gameData';

const ChapterStory = ({ day, practiceMode, onStartGame, onBack }) => {
  const chapter = gameData[day];
  
  const handleStartGame = () => {
    // Initialize audio context to enable sound playback
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const audioContext = new AudioContext();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }
    
    // Also create a dummy audio element to ensure audio permission
    const audio = new Audio();
    audio.play().catch(() => {
      // This will likely fail, but it establishes the audio context
    });
    
    onStartGame();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-pink-600 to-green-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto bg-pink-900/40 rounded-3xl p-12 border-4 border-green-300 shadow-2xl">
        <div className="text-center">
          {/* Day and Chapter Title */}
          <h1 className="text-5xl font-bold text-pink-300 mb-2">
            Day {day}
          </h1>
          <h2 className="text-3xl font-bold text-green-200 mb-8">
            {chapter.title}
          </h2>
          
          {/* Action Buttons - Moved to top */}
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={onBack}
              className="px-8 py-4 bg-green-700 hover:bg-pink-600 text-green-100 font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              ← Back to Days
            </button>
            <button
              onClick={handleStartGame}
              className="px-12 py-4 bg-gradient-to-r from-pink-500 to-green-500 hover:from-pink-400 hover:to-green-400 text-green-100 font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-400/50"
            >
              🚀 Start Battle!
            </button>
          </div>
          
          {/* Story Section */}
          <div className="bg-green-900/20 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-pink-300 mb-4">📖 The Story</h3>
            <p className="text-xl text-green-100 leading-relaxed">
              {chapter.story}
            </p>
          </div>
          
          {/* Characters Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Hero */}
            <div className="bg-green-600/30 rounded-2xl p-6 border-2 border-green-400">
              <h4 className="text-xl font-bold text-green-300 mb-3">🦸‍♂️ Your Hero</h4>
              <div className="w-32 h-32 mx-auto mb-4 bg-green-100/20 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={chapter.heroImage} 
                  alt={chapter.hero}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-6xl" style={{display: 'none'}}>
                  👤
                </div>
              </div>
              <p className="text-lg font-semibold text-green-100">{chapter.hero}</p>
              <p className="text-sm text-green-200 mt-2">Ready to fight for justice!</p>
            </div>
            
            {/* Villain */}
            <div className="bg-pink-600/30 rounded-2xl p-6 border-2 border-pink-400">
              <h4 className="text-xl font-bold text-pink-300 mb-3">👹 The Villain</h4>
              <div className="w-32 h-32 mx-auto mb-4 bg-pink-100/20 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={chapter.villainImage} 
                  alt={chapter.villain}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-6xl" style={{display: 'none'}}>
                  😈
                </div>
              </div>
              <p className="text-lg font-semibold text-pink-100">{chapter.villain}</p>
              <p className="text-sm text-pink-200 mt-2">Prepare for battle!</p>
            </div>
          </div>
          
          {/* Mission Brief */}
          <div className="bg-pink-600/20 rounded-2xl p-6 mb-8 border-2 border-pink-400">
            <h3 className="text-2xl font-bold text-green-300 mb-4">🎯 Your Mission</h3>
            <div className="text-green-100 text-left space-y-2">
              <p>• Answer 50 questions correctly</p>
              <p>• Each correct answer powers up your hero's attack</p>
              <p>• Wrong answers give the villain strength</p>
              <p>• Multiplication: Defeat the villain with 3 or fewer mistakes to win!</p>
              <p>• Division: Defeat the villain with 10 or fewer mistakes to win!</p>
            </div>
          </div>
          
          {/* Motivational text */}
          <p className="text-lg text-pink-200 mt-6 italic">
            "The fate of Oz depends on you! Show your math mastery!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChapterStory;