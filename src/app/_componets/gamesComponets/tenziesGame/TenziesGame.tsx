/**
 * Tenzies Game Component
 *
 * This component implements the Tenzies dice game.
 * Players roll ten dice and try to get all dice to show the same number.
 * Players can freeze individual dice between rolls.
 * The game tracks the number of rolls and the time elapsed.
 *
 * Features:
 * - Ten interactive dice that can be rolled.
 * - Dice can be frozen/unfrozen by clicking them.
 * - Game start/reset functionality.
 * - Tracks the number of rolls.
 * - Timer to track game duration.
 * - Win condition: all dice show the same number.
 * - "Play Again" functionality after winning.
 * - Help/Instructions modal.
 *
 * @component
 * @returns {JSX.Element} The Tenzies game interface.
 * 
 *  * Inspiration from: https://www.geeksforgeeks.org/reactjs/tenzies-game-using-reactjs/
 */

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, styled } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faPlay, faCheckCircle, faClock, faSync } from '@fortawesome/free-solid-svg-icons';
import HelpComponent from './HelpComponent';

const StyledButton = styled(Button)(() => ({
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    margin: "20px 10px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "backgroundColor 0.3s, transform 0.3s, boxShadow 0.3s",
    "&:hover": { backgroundColor: "#219150", transform: "scale(1.05)", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", }
}));

const TenziesGame = () => {
    const [dice, set_Dice] = useState(Array(10).fill(1));
    const [roll, set_Rolls] = useState(0);
    const [gamewin, set_game_win] = useState(false);
    const [dfreeze, set_d_freeze] = useState(Array(10).fill(false));
    const [time, set_Time] = useState(0);
    const [timerun, set_Time_Run] = useState(false);
    const [gamestart, set_game_start] = useState(false);
    const [showhelp, set_show_help] = useState(false);
    const [playAgain, set_play_again] = useState(false);
    const rolldFunction = () => {
        if (gamestart && !gamewin && timerun) {
            const newd = dice.map((value, index) => {
                if (!dfreeze[index]) { return Math.floor(Math.random() * 6) + 1; }
                return value;
            });
            set_Dice(newd);
            set_Rolls(roll + 1);
        }
        else { alert('Please start the game first!'); }
    };
    const gamePlayFuntion = () => {
        if (playAgain) {
            newresetFuntion();
            set_play_again(false);
            set_game_start(true);
            set_Time_Run(true);
        }
        else if (!gamestart) {
            newresetFuntion();
            set_game_start(true);
            set_Time_Run(true);
        }
    };
    const newresetFuntion = () => {
        const initialDice = Array(10).fill(1).map(() => Math.floor(Math.random() * 6) + 1);
        set_Dice(initialDice);
        set_Rolls(0);
        set_game_win(false);
        set_d_freeze(Array(10).fill(false));
        set_Time(0);
        set_Time_Run(false);
    };

    const dFreezeFunction = (index: number) => {
        if (!gamewin && gamestart) {
            const newFrozen = [...dfreeze];
            newFrozen[index] = !newFrozen[index];
            set_d_freeze(newFrozen);
        }
    };

    useEffect(() => {
        if (timerun && time < 60) {
            const timerInterval = setInterval(() => {
                if (timerun) { set_Time(time + 1); } else { clearInterval(timerInterval); }
            }, 1000);
            return () => { clearInterval(timerInterval); };
        }
    }, [timerun, time]);


    // Enable Play Again button
    useEffect(() => {
        if (dice.every((value) => value === dice[0]) && gamestart) {
            set_game_win(true);
            set_Time_Run(false);
            set_play_again(true);
        }
    }, [dice, gamestart]);
    return (
        <Box sx={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffebc0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Box id="header-section" sx={{ marginBottom: '20px' }}><Typography variant="h1" sx={{ color: 'green', }}>GeeksforGeeks Tenzies Game</Typography></Box>
            <Box id="body-section">
                <Box sx={{ textAlign: 'center', color: '#555', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StyledButton variant="contained" color="info" onClick={() => set_show_help(true)} sx={{ marginBottom: '15px', gap: '10px', padding: '10px 20px', fontSize: '18px' }}><FontAwesomeIcon icon={faPlay} />Show Instructions</StyledButton>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', maxWidth: '500px', margin: '0 auto' }}>
                {dice.map((value, index) => (
                    <Box
                        key={index}
                        className={`dice ${dfreeze[index] ? 'frozen' : ''}`}
                        onClick={() => dFreezeFunction(index)}
                        sx={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: dfreeze[index] ? "#e74c3c" : "#3498db",
                            color: "#fff",
                            fontSize: "28px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "10px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transition: "backgroundColor 0.3s, transform 0.3s, boxShadow 0.3s",
                            transform: dfreeze[index] ? "scale(1.2)" : undefined,
                            boxShadow: dfreeze[index] ? "0 0 10px rgba(231, 76, 60, 0.7)" : "0 0 5px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        {value}
                    </Box>
                ))}
            </Box>
            <StyledButton variant="contained" color="success" onClick={rolldFunction} disabled={gamewin || !timerun} sx={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}>
                <FontAwesomeIcon icon={faDice} /> Roll Dice
            </StyledButton>
            <Typography variant="h6" sx={{ marginTop: '15px', color: '#333' }}><FontAwesomeIcon icon={faSync} /> Rolls: {roll}</Typography>
            <Typography variant="h6" sx={{ marginTop: '10px', color: '#333' }}><FontAwesomeIcon icon={faClock} /> Time Elapsed: {time} seconds</Typography>
            <Box>
                <StyledButton variant="contained" color="primary" onClick={gamePlayFuntion} sx={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px' }}>
                    {playAgain ? (<span><FontAwesomeIcon icon={faPlay} /> Play Again</span>) : (<span><FontAwesomeIcon icon={faPlay} /> Start Game</span>)}
                </StyledButton>
            </Box>
            {gamewin && (<Box sx={{ marginTop: '20px', color: 'green', fontSize: '20px', fontWeight: 'bold' }}>
                <Typography variant="h5">Congratulations! You won the game!<FontAwesomeIcon icon={faCheckCircle} /></Typography>
            </Box>)}
            <HelpComponent show={showhelp} handleClose={() => set_show_help(false)} />
        </Box>
    );
};
export default TenziesGame;