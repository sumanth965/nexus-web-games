import React, { useState } from 'react';
import { RefreshCw, Trophy, User } from 'lucide-react';

export default function TicTacToe({ updateGameStats }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i) => {
    if (board[i] || winner || isDraw) return;
    
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setGameOver(true);
      if (newWinner === 'X') {
         updateGameStats('tictactoe', 100);
      }
    } else if (newBoard.every(square => square !== null)) {
      setGameOver(true);
      updateGameStats('tictactoe', 20); // Small bonus for a draw
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-4">
      {/* Header Info */}
      <div className="flex items-center gap-12">
        <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${isXNext && !gameOver ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-110' : 'border-gray-800 opacity-50'}`}>
          <div className="text-3xl font-black text-cyan-400">X</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Player 1</div>
        </div>

        <div className="text-center">
            {winner ? (
                <div className="animate-bounce">
                    <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                    <h2 className="text-3xl font-black text-white">{winner} WINS!</h2>
                </div>
            ) : isDraw ? (
                <h2 className="text-3xl font-black text-gray-400 uppercase tracking-tighter">Solid Draw</h2>
            ) : (
                <div className="space-y-1">
                     <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Current Turn</p>
                     <p className={`text-4xl font-black ${isXNext ? 'text-cyan-400' : 'text-purple-500'} animate-pulse`}>
                        {isXNext ? 'X' : 'O'}
                     </p>
                </div>
            )}
        </div>

        <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${!isXNext && !gameOver ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-110' : 'border-gray-800 opacity-50'}`}>
          <div className="text-3xl font-black text-purple-500">O</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Player 2</div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-4 bg-gray-800/20 p-4 rounded-[2rem] border border-gray-700/50 backdrop-blur-xl shadow-inner">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={gameOver}
            className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-4xl md:text-6xl font-black transition-all transform active:scale-90
              ${!square && !gameOver ? 'bg-gray-800/50 hover:bg-gray-700 border border-gray-700 shadow-lg' : ''}
              ${square === 'X' ? 'bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : ''}
              ${square === 'O' ? 'bg-purple-500/10 border-2 border-purple-500 text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : ''}
            `}
          >
            {square}
          </button>
        ))}
      </div>

      {/* Footer Controls */}
      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-8 py-3 bg-gray-800 border border-gray-700 hover:border-cyan-500/50 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
      >
        <RefreshCw className={`w-5 h-5 ${gameOver ? 'animate-spin' : ''}`} />
        New Match
      </button>
    </div>
  );
}
