import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const titleRef = useRef(null);

    const toggle = (index) => {
        if (lock || data[index] !== "") return;

        const newData = [...data];
        const currentPlayer = count % 2 === 0 ? "x" : "o";
        newData[index] = currentPlayer;

        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
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
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }

        // Check for a draw (no empty spots left)
        if (!newData.includes("")) {
            titleRef.current.innerHTML = 'It\'s a draw!';
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon}> Wins`;
    };

    const reset = () => {
        setLock(false);
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        titleRef.current.innerHTML = 'Tic Tac Toe In <span>React</span>';
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={() => toggle(0)}>
                        {data[0] && <img src={data[0] === "x" ? cross_icon : circle_icon} alt={data[0]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(1)}>
                        {data[1] && <img src={data[1] === "x" ? cross_icon : circle_icon} alt={data[1]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(2)}>
                        {data[2] && <img src={data[2] === "x" ? cross_icon : circle_icon} alt={data[2]} />}
                    </div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={() => toggle(3)}>
                        {data[3] && <img src={data[3] === "x" ? cross_icon : circle_icon} alt={data[3]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(4)}>
                        {data[4] && <img src={data[4] === "x" ? cross_icon : circle_icon} alt={data[4]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(5)}>
                        {data[5] && <img src={data[5] === "x" ? cross_icon : circle_icon} alt={data[5]} />}
                    </div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={() => toggle(6)}>
                        {data[6] && <img src={data[6] === "x" ? cross_icon : circle_icon} alt={data[6]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(7)}>
                        {data[7] && <img src={data[7] === "x" ? cross_icon : circle_icon} alt={data[7]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(8)}>
                        {data[8] && <img src={data[8] === "x" ? cross_icon : circle_icon} alt={data[8]} />}
                    </div>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
