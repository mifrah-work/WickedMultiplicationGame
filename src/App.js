import React, { useState, useEffect } from 'react';
import DaySelection from './components/DaySelection';
import ChapterStory from './components/ChapterStory';
import GameBattle from './components/GameBattle';

function App() {
  const [currentScreen, setCurrentScreen] = useState('daySelection'); // 'daySelection', 'chapterStory', 'gameBattle'
  const [selectedDay, setSelectedDay] = useState(null);
  const [unlockedDays, setUnlockedDays] = useState([1]); // Start with day 1 unlocked

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('wickedMultiplicationProgress');
    if (savedProgress) {
      setUnlockedDays(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newUnlockedDays) => {
    setUnlockedDays(newUnlockedDays);
    localStorage.setItem('wickedMultiplicationProgress', JSON.stringify(newUnlockedDays));
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setCurrentScreen('chapterStory');
  };

  const handleStartGame = () => {
    setCurrentScreen('gameBattle');
  };

  const resetProgress = () => {
    localStorage.removeItem('wickedMultiplicationProgress');
    setUnlockedDays([1]);
    setCurrentScreen('daySelection');
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

  const handleBackToStory = () => {
    setCurrentScreen('chapterStory');
  };

  return (
    <div className="App">
      {currentScreen === 'daySelection' && (
        <DaySelection
          onSelectDay={handleSelectDay}
          unlockedDays={unlockedDays}
          resetProgress={resetProgress}
        />
      )}
      
      {currentScreen === 'chapterStory' && (
        <ChapterStory 
          day={selectedDay}
          onStartGame={handleStartGame}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'gameBattle' && (
        <GameBattle 
          day={selectedDay}
          onGameComplete={handleGameComplete}
          onBack={handleBackToStory}
          onBackToHome={handleBack}
        />
      )}
    </div>
  );
}

export default App;