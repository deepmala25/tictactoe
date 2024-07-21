import React, { useState } from 'react';
import './TicTacToe.css';
import circleIcon from '../Assets/circle.png';
import crossIcon from '../Assets/cross.png';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null)); // Array to store the state of each cell
    const [isXNext, setIsXNext] = useState(true); // Track whose turn it is
    const [status, setStatus] = useState('Tic Tac Toe In React'); // Track the status of the game

    const handleClick = (index) => {
        if (status.includes('Wins') || board[index]) return; // If game is over or cell is already filled, ignore click

        const newBoard = board.slice(); // Create a copy of the board
        newBoard[index] = isXNext ? 'x' : 'o'; // Update the board with the current player's move
        setBoard(newBoard); // Set the new board state
        setIsXNext(!isXNext); // Switch turns
        checkWin(newBoard); // Check if the move resulted in a win
    };

    const checkWin = (board) => {
        const winningCombinations = [
            [0, 1, 2], // Row 1
            [3, 4, 5], // Row 2
            [6, 7, 8], // Row 3
            [0, 3, 6], // Column 1
            [1, 4, 7], // Column 2
            [2, 5, 8], // Column 3
            [0, 4, 8], // Diagonal 1
            [2, 4, 6]  // Diagonal 2
        ];

        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                announceWinner(board[a]); // Announce winner if a winning combination is found
                return;
            }
        }

        // Check for a draw (no empty spots left)
        if (!board.includes(null)) {
            setStatus('It\'s a draw!');
        }
    };

    const announceWinner = (winner) => {
        setStatus(`Congratulations: ${winner === 'x' ? 'Cross' : 'Circle'} Wins`);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null)); // Reset board
        setIsXNext(true); // Reset turn to X
        setStatus('Tic Tac Toe In React'); // Reset game status
    };

    return (
        <div className='container'>
            <h1 className="title">{status}</h1>
            <div className="board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => handleClick(index)}
                    >
                        {cell && <img src={cell === 'x' ? crossIcon : circleIcon} alt={cell} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
