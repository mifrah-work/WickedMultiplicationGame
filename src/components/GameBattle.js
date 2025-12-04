import React, { useState, useRef, useEffect } from 'react';
import { gameData, generateQuestions, sounds } from '../data/gameData';

const GameBattle = ({ day, practiceMode, onGameComplete, onBack, onBackToHome }) => {
  const chapter = gameData[day];
  const [questions] = useState(() => generateQuestions(50, practiceMode, day));
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

    // Stopwatch state
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timerRef = useRef(null);

    // Start stopwatch when battle opens
    useEffect(() => {
      if (!gameOver) {
        timerRef.current = setInterval(() => {
          setElapsedSeconds((prev) => prev + 1);
        }, 1000);
      }
      return () => {
        clearInterval(timerRef.current);
      };
    }, [gameOver]);

    // Reset stopwatch when play again
    useEffect(() => {
      if (currentQuestionIndex === 0 && !gameOver) {
        setElapsedSeconds(0);
      }
    }, [currentQuestionIndex, gameOver]);

    // Format stopwatch time
    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

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
        // Clip after 0.7 seconds
        setTimeout(() => {
          correctSound.pause();
          correctSound.currentTime = 0;
        }, 700);
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
        // Clip after 0.7 seconds
        setTimeout(() => {
          wrongAudio.pause();
          wrongAudio.currentTime = 0;
        }, 700);
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
        let winThreshold = 3;
        if (practiceMode === 'division') {
          winThreshold = 10;
        }
        const won = wrongAnswers + (isCorrect ? 0 : 1) <= winThreshold;
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

  // Save completion time if victory (must be top-level, not inside conditional)
  useEffect(() => {
    if (gameOver && victory) {
      const key = `wicked_chapter_time_${day}`;
      localStorage.setItem(key, elapsedSeconds);
    }
  }, [gameOver, victory, day, elapsedSeconds]);

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-700 to-pink-900 flex items-center justify-center p-8">
        <div className="max-w-2xl mx-auto bg-pink-900/40 rounded-3xl p-12 border-4 border-green-300 text-center">
          <h1 className={`text-6xl font-bold mb-6 ${victory ? 'text-green-300' : 'text-pink-400'}`}>
            {victory ? '🎉 VICTORY! 🎉' : '💀 DEFEAT 💀'}
          </h1>

          <div className="bg-green-900/20 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-pink-300 mb-4">Battle Results</h2>
            <div className="text-lg text-green-100 space-y-2">
              <p>Correct Answers: <span className="text-pink-300 font-bold">{score}/50</span></p>
              <p>Wrong Answers: <span className="text-green-300 font-bold">{wrongAnswers}/50</span></p>
              <p>Accuracy: <span className="text-pink-400 font-bold">{Math.round((score/50) * 100)}%</span></p>
              <p>Time Taken: <span className="text-green-300 font-bold">{formatTime(elapsedSeconds)}</span></p>
            </div>
          </div>

          {victory ? (
            <div className="mb-8">
              <p className="text-xl text-pink-300 mb-4">
                🌟 {chapter.hero} has defeated {chapter.villain}! 🌟
              </p>
              <p className="text-lg text-green-100">
                The next day has been unlocked! Keep up the great work!
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-xl text-green-300 mb-4">
                💔 {chapter.villain} was too strong this time! 💔
              </p>
              <p className="text-lg text-pink-100">
                Don't give up! Practice makes perfect. Try again!
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={onBack}
              className="px-8 py-4 bg-green-700 hover:bg-pink-600 text-green-100 font-bold rounded-xl transition-all duration-300"
            >
              ← Back to Days
            </button>
            <button
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-green-100 font-bold rounded-xl transition-all duration-300"
            >
              🔄 Try Again
            </button>
            {victory && (
              <button
                onClick={() => onGameComplete(victory)}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-green-500 hover:from-pink-400 hover:to-green-400 text-green-100 font-bold rounded-xl transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-pink-600 to-green-900 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center bg-black/30 rounded-2xl p-4 relative">
          <div className="text-green-100">
            <h1 className="text-2xl font-bold">{chapter.title}</h1>
            <p className="text-pink-300">Question {currentQuestionIndex + 1} of 50</p>
          </div>
          {/* Stopwatch Centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-2xl font-bold text-pink-300 bg-green-900/80 px-6 py-2 rounded-xl border-2 border-pink-400 shadow-lg">
              ⏱️ {formatTime(elapsedSeconds)}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Back to Home Button */}
            <button
              onClick={onBackToHome}
              className="px-4 py-2 bg-green-700 hover:bg-pink-600 text-green-100 font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
              title="Back to Day Selection"
            >
              🏠 Home
            </button>
            {/* Volume Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isMuted 
                  ? 'bg-pink-600 hover:bg-pink-500 text-green-100' 
                  : 'bg-green-600 hover:bg-green-500 text-pink-100'
              }`}
              title={isMuted ? 'Click to unmute' : 'Click to mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <div className="text-green-100 text-right">
              <p>Correct: <span className="text-pink-300 font-bold">{score}</span></p>
              <p>Wrong: <span className="text-green-300 font-bold">{wrongAnswers}/3</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Hero */}
        <div className="bg-green-600/30 rounded-2xl p-6 border-2 border-green-400">
          <h3 className="text-xl font-bold text-green-300 mb-4 text-center">{chapter.hero}</h3>
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
            <p className="text-green-100 mb-2">Energy</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-pink-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${heroEnergy}%` }}
              ></div>
            </div>
            <p className="text-green-100 text-sm mt-1">{heroEnergy}/100</p>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-pink-600/20 rounded-2xl p-6 border-2 border-pink-400 flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-300 mb-6">
              {currentQuestion.question} = ?
            </h2>
            
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={showFeedback}
              className="w-32 h-16 text-3xl text-center bg-white rounded-xl border-4 border-pink-400 font-bold text-green-700 mb-6"
              placeholder="?"
              autoFocus
            />
            
            <div>
              <button
                onClick={handleSubmitAnswer}
                disabled={showFeedback || userAnswer.trim() === ''}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-green-500 hover:from-pink-400 hover:to-green-400 disabled:bg-gray-500 text-green-100 font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105"
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
        <div className="bg-pink-600/30 rounded-2xl p-6 border-2 border-pink-400">
          <h3 className="text-xl font-bold text-pink-300 mb-4 text-center">{chapter.villain}</h3>
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
            <p className="text-pink-100 mb-2">Energy</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-pink-400 to-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${villainEnergy}%` }}
              ></div>
            </div>
            <p className="text-pink-100 text-sm mt-1">{villainEnergy}/100</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/30 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-green-100 font-bold">Battle Progress</p>
            <p className="text-pink-300 font-bold">{Math.round(((currentQuestionIndex + 1) / 50) * 100)}%</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-400 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / 50) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBattle;