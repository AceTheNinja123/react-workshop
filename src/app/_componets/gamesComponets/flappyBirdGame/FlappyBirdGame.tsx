import React, { useState, useEffect, useCallback } from 'react';
import Bird from './Bird';
import PipesFunction from './Pipes';
import { Box, Typography } from "@mui/material";
/* Taken inspiration from https://www.geeksforgeeks.org/reactjs/flappy-bird-game-using-react-js/ */
interface PipesProps { x: number; y: number }

const FlappyBirdGame = () => {
    const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
    const [pipes, setPipes] = useState<Array<PipesProps>>([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const jump = () => {
        if (gameOver) {
            // Restart
            setBirdPosition({ x: 50, y: 200 });
            setPipes([]);
            setScore(0);
            setGameOver(false);
            setGameStarted(true);
        }
        else if (!gameOver && !gameStarted) { setGameStarted(true); }
        else { setBirdPosition(prev => ({ ...prev, y: prev.y - 60 })); }
    };

    const checkCollision = useCallback(() => {
        const birdTop = birdPosition.y;
        const birdBottom = birdPosition.y + 50;
        const birdLeft = birdPosition.x;
        const birdRight = birdPosition.x + 50;

        pipes.forEach((pipe) => {
            const pipeTop = pipe.y;
            const pipeBottom = pipe.y + 600;
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + 100;

            const isColliding =
                birdRight > pipeLeft &&
                birdLeft < pipeRight &&
                birdBottom > pipeTop &&
                birdTop < pipeBottom;

            if (isColliding) {
                if (birdLeft > pipeLeft && birdRight < pipeRight && birdBottom < pipeBottom) {
                    // Bird has crashed through the pipe, increase score
                    setScore((prevScore) => prevScore + 1);
                } else {
                    // Bird has hit the pipe, end the game
                    setGameOver(true);
                    setGameStarted(false);
                }
            }
        });

        // Check if bird is out of the screen vertically
        if (birdBottom > 800 || birdTop < -170) {
            setGameOver(true);
            setGameStarted(false);
        }
    }, [birdPosition, pipes]);

    useEffect(() => { checkCollision(); }, [birdPosition, pipes, gameOver, checkCollision]);

    // Gravity and collision
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const gravity = setInterval(() => { setBirdPosition(prev => ({ ...prev, y: prev.y + 5 })); }, 30);

        return () => clearInterval(gravity);
    }, [gameStarted, gameOver]);

    // Pipe generation
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const generator = setInterval(() => {
            setPipes(prev => [...prev, { x: 600, y: Math.floor(Math.random() * 250) + 100 },]);
        }, 2000);

        return () => clearInterval(generator);
    }, [gameStarted, gameOver]);

    // Pipe movement
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const move = setInterval(() => {
            setPipes(prev => prev.map(pipe => ({ ...pipe, x: pipe.x - 5 })).filter(pipe => pipe.x > -100));
        }, 30);

        return () => clearInterval(move);
    }, [gameStarted, gameOver]);

    return (
        <Box sx={{ position: 'relative', width: '600px', height: '600px', border: '1px solid #000', overflow: 'hidden', backgroundColor: gameOver ? '#ff6347' : '#87ceeb', transition: 'background-color 0.5s ease' }} onClick={jump}>
            <Bird birdPosition={birdPosition} />
            {pipes.map((pipe, index) => (<PipesFunction key={index} pipePosition={pipe} />))}
            {gameOver && (
                <center>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', gap: 2 }}>
                        <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 'bold', margin: 1 }}>Game Over!</Typography>
                        <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 'bold', margin: 1 }}>Score: {score}</Typography>
                        <Typography variant="body1" sx={{ backgroundColor: 'blue', padding: "2px 6px", borderRadius: '5px' }}>Click anywhere to Restart</Typography>
                    </Box>
                </center>
            )}
        </Box>
    );
};
export default FlappyBirdGame;