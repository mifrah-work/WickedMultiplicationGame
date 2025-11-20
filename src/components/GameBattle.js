import React, { useState, useRef } from 'react';
import { gameData, generateQuestions, sounds } from '../data/gameData';

const GameBattle = ({ day, onGameComplete, onBack, onBackToHome }) => {
  const chapter = gameData[day];
  const [questions] = useState(() => generateQuestions(50));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [heroEnergy, setHeroEnergy] = useState(100);
  const [villainEnergy, setVillainEnergy] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [heroAttacking, setHeroAttacking] = useState(false);
  const [villainAttacking, setVillainAttacking] = useState(false);
  const [correctSoundIndex, setCorrectSoundIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const inputRef = useRef(null);
  const currentSoundRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (userAnswer.trim() === '') return;

    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    // Play sound effects
    if (isCorrect) {
      // Only play sound if not muted
      if (!isMuted) {
        // Stop any currently playing sound
        if (currentSoundRef.current) {
          currentSoundRef.current.pause();
          currentSoundRef.current.currentTime = 0;
        }
        
        const currentCorrectSound = sounds.correct[correctSoundIndex];
        const correctSound = new Audio(currentCorrectSound);
        currentSoundRef.current = correctSound;
        
        correctSound.play().catch(e => console.log('Audio play failed:', e));
        
        // Let the audio play naturally without cutting it off
      }
      
      // Cycle to next correct sound
      setCorrectSoundIndex((correctSoundIndex + 1) % sounds.correct.length);
      
      setScore(score + 1);
      setHeroAttacking(true);
      setVillainEnergy(Math.max(0, villainEnergy - 2));
    } else {
      // Only play sound if not muted
      if (!isMuted) {
        // Stop any currently playing sound
        if (currentSoundRef.current) {
          currentSoundRef.current.pause();
          currentSoundRef.current.currentTime = 0;
        }
        
        const wrongAudio = new Audio(sounds.wrong);
        wrongAudio.play().catch(e => console.log('Audio play failed:', e));
      }
      
      setWrongAnswers(wrongAnswers + 1);
      setVillainAttacking(true);
      setHeroEnergy(Math.max(0, heroEnergy - 2));
    }

    // Reset animations and move to next question after delay
    const delay = isCorrect ? 0 : 1000; // Instant for correct, 1 second for wrong
    console.log('Delay set to:', delay, 'ms'); // Debug log
    
    setTimeout(() => {
      setHeroAttacking(false);
      setVillainAttacking(false);
      setShowFeedback(false);
      setUserAnswer('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        // Auto-focus the input for the next question
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      } else {
        // Game finished
        const won = wrongAnswers + (isCorrect ? 0 : 1) <= 3;
        setVictory(won);
        setGameOver(true);
      }
    }, delay);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showFeedback) {
      handleSubmitAnswer();
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setWrongAnswers(0);
    setHeroEnergy(100);
    setVillainEnergy(100);
    setGameOver(false);
    setVictory(false);
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    setHeroAttacking(false);
    setVillainAttacking(false);
    setCorrectSoundIndex(0);
    // Keep mute state when restarting
    
    // Auto-focus the input when restarting
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-900 to-green-900 flex items-center justify-center p-8">
        <div className="max-w-2xl mx-auto bg-black/40 rounded-3xl p-12 border-4 border-pink-300 text-center">
          <h1 className={`text-6xl font-bold mb-6 ${victory ? 'text-green-400' : 'text-red-400'}`}>
            {victory ? '🎉 VICTORY! 🎉' : '💀 DEFEAT 💀'}
          </h1>
          
          <div className="bg-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Battle Results</h2>
            <div className="text-lg text-white space-y-2">
              <p>Correct Answers: <span className="text-green-400 font-bold">{score}/50</span></p>
              <p>Wrong Answers: <span className="text-red-400 font-bold">{wrongAnswers}/50</span></p>
              <p>Accuracy: <span className="text-yellow-400 font-bold">{Math.round((score/50) * 100)}%</span></p>
            </div>
          </div>

          {victory ? (
            <div className="mb-8">
              <p className="text-xl text-green-300 mb-4">
                🌟 {chapter.hero} has defeated {chapter.villain}! 🌟
              </p>
              <p className="text-lg text-white">
                The next day has been unlocked! Keep up the great work!
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-xl text-red-300 mb-4">
                💔 {chapter.villain} was too strong this time! 💔
              </p>
              <p className="text-lg text-white">
                Don't give up! Practice makes perfect. Try again!
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={onBack}
              className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-xl transition-all duration-300"
            >
              ← Back to Days
            </button>
            <button
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300"
            >
              🔄 Try Again
            </button>
            {victory && (
              <button
                onClick={() => onGameComplete(victory)}
                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all duration-300"
              >
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900 via-green-900 to-emerald-900 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center bg-black/30 rounded-2xl p-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold">{chapter.title}</h1>
            <p className="text-yellow-400">Question {currentQuestionIndex + 1} of 50</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Back to Home Button */}
            <button
              onClick={onBackToHome}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
              title="Back to Day Selection"
            >
              🏠 Home
            </button>
            {/* Volume Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isMuted 
                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                  : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              title={isMuted ? 'Click to unmute' : 'Click to mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <div className="text-white text-right">
              <p>Correct: <span className="text-green-400 font-bold">{score}</span></p>
              <p>Wrong: <span className="text-red-400 font-bold">{wrongAnswers}/3</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Hero */}
        <div className="bg-blue-600/30 rounded-2xl p-6 border-2 border-blue-400">
          <h3 className="text-xl font-bold text-blue-300 mb-4 text-center">{chapter.hero}</h3>
          <div className={`w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ${
            heroAttacking ? 'transform scale-125 shadow-2xl shadow-green-400/80 ring-4 ring-green-400/50' : ''
          }`}>
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
              🦸‍♂️
            </div>
          </div>
          <div className="text-center mb-4">
            <p className="text-white mb-2">Energy</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${heroEnergy}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-1">{heroEnergy}/100</p>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-yellow-600/20 rounded-2xl p-6 border-2 border-yellow-400 flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-300 mb-6">
              {currentQuestion.question} = ?
            </h2>
            
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={showFeedback}
              className="w-32 h-16 text-3xl text-center bg-white rounded-xl border-4 border-yellow-400 font-bold text-gray-800 mb-6"
              placeholder="?"
              autoFocus
            />
            
            <div>
              <button
                onClick={handleSubmitAnswer}
                disabled={showFeedback || userAnswer.trim() === ''}
                className="px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-500 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                ⚔️ ATTACK!
              </button>
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-xl text-center font-bold text-xl ${
              lastAnswerCorrect 
                ? 'bg-green-500/30 text-green-300 border-2 border-green-400' 
                : 'bg-red-500/30 text-red-300 border-2 border-red-400'
            }`}>
              {lastAnswerCorrect ? (
                <div>
                  <p>✅ Correct!</p>
                  <p className="text-sm">Hero attacks!</p>
                </div>
              ) : (
                <div>
                  <p>❌ Wrong! Answer: {currentQuestion.answer}</p>
                  <p className="text-sm">Villain strikes back!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Villain */}
        <div className="bg-red-600/30 rounded-2xl p-6 border-2 border-red-400">
          <h3 className="text-xl font-bold text-red-300 mb-4 text-center">{chapter.villain}</h3>
          <div className={`w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ${
            villainAttacking ? 'transform scale-125 shadow-2xl shadow-red-400/80 ring-4 ring-red-400/50' : ''
          }`}>
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
              👹
            </div>
          </div>
          <div className="text-center mb-4">
            <p className="text-white mb-2">Energy</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-red-400 to-orange-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${villainEnergy}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-1">{villainEnergy}/100</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/30 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white font-bold">Battle Progress</p>
            <p className="text-yellow-400 font-bold">{Math.round(((currentQuestionIndex + 1) / 50) * 100)}%</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / 50) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBattle;