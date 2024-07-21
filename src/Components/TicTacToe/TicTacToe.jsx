import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null)); // Array to store the state of each cell
    const [isXNext, setIsXNext] = useState(true); // Track whose turn it is
    const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over
    const titleRef = useRef(null); // Reference to the title element

    const handleClick = (index) => {
        if (isGameOver || board[index]) return; // If game is over or cell is already filled, ignore click

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
            titleRef.current.innerHTML = 'It\'s a draw!';
            setIsGameOver(true);
        }
    };

    const announceWinner = (winner) => {
        titleRef.current.innerHTML = `Congratulations: <img src=${winner === 'x' ? cross_icon : circle_icon} alt='winner' /> Wins`;
        setIsGameOver(true); // Set game as over
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null)); // Reset board
        setIsXNext(true); // Reset turn to X
        setIsGameOver(false); // Reset game over flag
        titleRef.current.innerHTML = 'Tic Tac Toe In <span>React</span>'; // Reset title
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => handleClick(index)}
                    >
                        {cell && <img src={cell === 'x' ? cross_icon : circle_icon} alt={cell} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
