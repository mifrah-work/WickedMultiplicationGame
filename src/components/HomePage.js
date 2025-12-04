import React from 'react';

function HomePage({ onSelectMode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <h1 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Wicked Math Practice
        </h1>
        <p className="text-center text-purple-200 mb-12 text-lg">
          Choose your practice mode
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Multiplication Mode */}
          <button
            onClick={() => onSelectMode('multiplication')}
            className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">✖️</div>
              <h2 className="text-2xl font-bold mb-2">Multiplication</h2>
              <p className="text-green-100">Practice your times tables</p>
            </div>
          </button>

          {/* Division Mode */}
          <button
            onClick={() => onSelectMode('division')}
            className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">➗</div>
              <h2 className="text-2xl font-bold mb-2">Division</h2>
              <p className="text-pink-100">Practice division problems</p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-purple-300 text-sm">
          <p>🎭 Featuring characters from Wicked 🎭</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
