///////////////////////
// Welcome to Cursor //
///////////////////////

/*
Step 1: Try generating a react component that lets you play tictactoe with Cmd+K or Ctrl+K on a new line.
  - Then integrate it into the code below and run with npm start

Step 2: Try highlighting all the code with your mouse, then hit Cmd+k or Ctrl+K. 
  - Instruct it to change the game in some way (e.g. add inline styles, add a start screen, make it 4x4 instead of 3x3)

Step 3: Hit Cmd+L or Ctrl+L and ask the chat what the code does

Step 4: To try out cursor on your own projects, go to the file menu (top left) and open a folder.
*/


import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      {!gameStarted ? (
        <button onClick={() => setGameStarted(true)} style={{ padding: '10px 20px', fontSize: '20px', cursor: 'pointer' }}>
          ゲームスタート
        </button>
      ) : (
        <TicTacToe />
      )}
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function TicTacToe() {
  const [board, setBoard] = useState(Array(16).fill(null)); // 4x4のために16に変更
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'K' : 'P';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(16).fill(null)); // ゲームリセット機能
    setIsXNext(true);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => handleClick(i)} style={{ width: '60px', height: '60px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
        {board[i]}
      </button>
    );
  }

  function calculateWinner(squares) {
    const lines = [
      // 横の勝利条件
      [0, 1, 2], [1, 2, 3],
      [4, 5, 6], [5, 6, 7],
      [8, 9, 10], [9, 10, 11],
      [12, 13, 14], [13, 14, 15],
      // 縦の勝利条件
      [0, 4, 8], [4, 8, 12],
      [1, 5, 9], [5, 9, 13],
      [2, 6, 10], [6, 10, 14],
      [3, 7, 11], [7, 11, 15],
      // 斜めの勝利条件
      [0, 5, 10], [1, 6, 11],
      [4, 9, 14], [5, 10, 15],
      [2, 5, 8], [3, 6, 9],
      [6, 9, 12], [7, 10, 13]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="tictactoe" style={{ margin: '20px' }}>
      <div className="board" style={{ margin: 'auto', display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gridGap: '5px' }}>
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
        </div>
        <div className="row">
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
        </div>
        <div className="row">
          {renderSquare(8)}
          {renderSquare(9)}
          {renderSquare(10)}
          {renderSquare(11)}
        </div>
        <div className="row">
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
          {renderSquare(15)}
        </div>
      </div>
      <div className="game-info" style={{ marginTop: '20px' }}>
        <div>{winner ? `勝者: ${winner}` : `次のプレイヤー: ${isXNext ? 'けい' : 'P'}`}</div>
        <button onClick={resetGame} style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}>ゲームをリセット</button>
      </div>
    </div>
  );
}

export default TicTacToe;
