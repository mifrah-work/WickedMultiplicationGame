import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import DaySelection from './components/DaySelection';
import ChapterStory from './components/ChapterStory';
import GameBattle from './components/GameBattle';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'daySelection', 'chapterStory', 'gameBattle'
  const [practiceMode, setPracticeMode] = useState(null); // 'multiplication' or 'division'
  const [selectedDay, setSelectedDay] = useState(null);
  const [unlockedDays, setUnlockedDays] = useState([1]); // Start with day 1 unlocked

  // Load progress from localStorage based on practice mode
  useEffect(() => {
    if (practiceMode) {
      const savedProgress = localStorage.getItem(`wickedGameProgress_${practiceMode}`);
      if (savedProgress) {
        setUnlockedDays(JSON.parse(savedProgress));
      } else {
        setUnlockedDays([1]); // Reset to day 1 when switching modes
      }
    }
  }, [practiceMode]);

  // Save progress to localStorage
  const saveProgress = (newUnlockedDays) => {
    setUnlockedDays(newUnlockedDays);
    localStorage.setItem(`wickedGameProgress_${practiceMode}`, JSON.stringify(newUnlockedDays));
  };

  // Reset progress for current mode
  const handleResetProgress = () => {
    setUnlockedDays([1]);
    localStorage.setItem(`wickedGameProgress_${practiceMode}`, JSON.stringify([1]));
  };

  const handleSelectMode = (mode) => {
    setPracticeMode(mode);
    setCurrentScreen('daySelection');
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setCurrentScreen('chapterStory');
  };

  const handleStartGame = () => {
    setCurrentScreen('gameBattle');
  };

  const handleGameComplete = (victory) => {
    if (victory && selectedDay < 7 && !unlockedDays.includes(selectedDay + 1)) {
      const newUnlockedDays = [...unlockedDays, selectedDay + 1];
      saveProgress(newUnlockedDays);
    }
    setCurrentScreen('daySelection');
  };

  const handleBack = () => {
    setCurrentScreen('daySelection');
  };

  const handleBackToHome = () => {
    setPracticeMode(null);
    setCurrentScreen('home');
  };

  const handleBackToStory = () => {
    setCurrentScreen('chapterStory');
  };

  return (
    <div className="App">
      {currentScreen === 'home' && (
        <HomePage onSelectMode={handleSelectMode} />
      )}

      {currentScreen === 'daySelection' && (
        <DaySelection
          onSelectDay={handleSelectDay}
          unlockedDays={unlockedDays}
          practiceMode={practiceMode}
          onBackToHome={handleBackToHome}
          onResetProgress={handleResetProgress}
        />
      )}
      
      {currentScreen === 'chapterStory' && (
        <ChapterStory 
          day={selectedDay}
          practiceMode={practiceMode}
          onStartGame={handleStartGame}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'gameBattle' && (
        <GameBattle 
          day={selectedDay}
          practiceMode={practiceMode}
          onGameComplete={handleGameComplete}
          onBack={handleBackToStory}
          onBackToHome={handleBack}
        />
      )}
    </div>
  );
}

export default App;