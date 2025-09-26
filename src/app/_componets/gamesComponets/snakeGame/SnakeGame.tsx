import React, { useState, useEffect, useCallback } from "react";
import Snake from "./Snake";
import Food from "./Food";
import CustomButton from "./Button";
import Menu from "./Menu";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { getRandomFood, moveSnake, gameOver, onSnakeOutOfBounds, onSnakeCollapsed, increaseSnake, increaseSpeed, onSnakeEats } from "./GameFunctions"; // import utils
/* Taken inspiration from this: https://www.geeksforgeeks.org/reactjs/create-a-snake-game-in-react/ */

const initialState = {
    food: getRandomFood(),
    direction: "RIGHT",
    speed: 100,
    route: "menu",
    snakeDots: [
        [0, 0],
        [0, 2],
    ],
};

const SnakeGame = () => {
    const [state, setState] = useState(initialState);
    const [gameOverMessage, setGameOverMessage] = useState("");
    const theme = useTheme();
    const backgroundColor = theme.palette.greenCustomColors[0];

    const handleGameOver = useCallback(() => {
        const message = gameOver(state.snakeDots);
        setGameOverMessage(message);
    }, [state.snakeDots]);
    const clickGameOver = () => {
        setState(initialState);
        setGameOverMessage("");
    };
    useEffect(() => {
        const interval = setInterval(() => moveSnake(state, setState), state.speed);
        document.onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "a":
                case "A":
                    setState((prev) => ({ ...prev, direction: "LEFT" }));
                    break;
                case "w":
                case "W":
                    setState((prev) => ({ ...prev, direction: "UP" }));
                    break;
                case "d":
                case "D":
                    setState((prev) => ({ ...prev, direction: "RIGHT" }));
                    break;
                case "s":
                case "S":
                    setState((prev) => ({ ...prev, direction: "DOWN" }));
                    break;
            }
        };

        return () => clearInterval(interval);
    }, [state.speed, state, setState]);

    useEffect(() => {
        onSnakeOutOfBounds(state, handleGameOver);
        onSnakeCollapsed(state, handleGameOver);
        onSnakeEats(
            state,
            setState,
            () => increaseSnake(state, setState),
            () => increaseSpeed(state, setState)
        );
    }, [state, handleGameOver]);

    return (
        <Box sx={{width: '100%', height: "750px", alignContent: "center", justifyContent: "center" }}>
            {state.route === "menu" ? (<Box sx={{width: '100%', height: '80%', alignContent: "center", justifyContent: "center" }}><Menu onRouteChange={() => setState((prev) => ({ ...prev, route: "game" }))} /></Box>) :
                (
                    <>
                        {gameOverMessage !== "" && (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", gap: 1 }}>
                                <Typography variant="h6" color="error">{gameOverMessage}</Typography>
                                <Button variant="contained" color="error" onClick={clickGameOver}>Restart</Button>
                            </Box>
                        )}
                        {gameOverMessage == "" && (<Box>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "600px",
                                    height: "500px",
                                    border: "2px solid " + backgroundColor,
                                    borderRadius: "10px",
                                    margin: "50px auto",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    "@media (max-width:800px)": { width: "350px", height: "300px", },
                                }}
                            >
                                <Snake snakeDots={state.snakeDots} />
                                <Food dot={state.food} />
                            </Box>
                            <CustomButton
                                onDown={() => setState((prev) => ({ ...prev, direction: "DOWN" }))}
                                onLeft={() => setState((prev) => ({ ...prev, direction: "LEFT" }))}
                                onRight={() => setState((prev) => ({ ...prev, direction: "RIGHT" }))}
                                onUp={() => setState((prev) => ({ ...prev, direction: "UP" }))}
                            />
                        </Box>)}
                    </>
                )}
        </Box>
    );
};

export default SnakeGame;
