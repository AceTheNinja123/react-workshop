
/**
 * Represents the game state for the Snake game
 * @interface StateType
 * @property {number[]} food - The [x, y] coordinates of the food
 * @property {string} direction - The current direction of snake movement (RIGHT, LEFT, DOWN, UP)
 * @property {number} speed - The game speed in milliseconds
 * @property {string} route - The current route/game state (e.g., "game")
 * @property {number[][]} snakeDots - Array of [x, y] coordinates representing snake segments
 */

/**
 * Generates a random food position on the game grid
 * @returns {number[]} An array containing [x, y] coordinates for the food position
 */

/**
 * Generates a game over message with the final score
 * @param {number[][]} snakeDots - Array of snake segments used to calculate the score
 * @returns {string} Game over message with the final score
 */

/**
 * Moves the snake in the current direction
 * Updates the snake's position by adding a new head and removing the tail
 * @param {StateType} state - The current game state
 * @param {(cb: (prev: StateType) => StateType) => void} setState - State setter function
 * @returns {void}
 */

/**
 * Checks if the snake's head has moved out of bounds
 * Triggers game over if the snake exceeds the grid boundaries
 * @param {StateType} state - The current game state
 * @param {() => void} gameOverFn - Callback function to trigger game over
 * @returns {void}
 */

/**
 * Detects if the snake has collided with itself
 * @param {StateType} state - The current game state
 * @param {() => void} gameOverFn - Callback function to trigger game over
 * @returns {void}
 */

/**
 * Increases the snake's length by one segment
 * @param {StateType} state - The current game state
 * @param {(cb: (prev: StateType) => StateType) => void} setState - State setter function
 * @returns {void}
 */

/**
 * Increases the game speed by decreasing the interval delay
 * Only increases speed if current speed is greater than 10ms
 * @param {StateType} state - The current game state
 * @param {(cb: (prev: StateType) => StateType) => void} setState - State setter function
 * @returns {void}
 */

/**
 * Checks if the snake has eaten the food
 * If collision detected, generates new food, increases snake length, and increases speed
 * @param {StateType} state - The current game state
 * @param {(cb: (prev: StateType) => StateType) => void} setState - State setter function
 * @param {() => void} increaseSnakeFn - Callback function to increase snake length
 * @param {() => void} increaseSpeedFn - Callback function to increase game speed
 * @returns {void}
 */
// snakeUtils.ts
interface StateType { food: number[]; direction: string; speed: number; route: string; snakeDots: number[][]; }

// Generate a random food position
export const getRandomFood = () => {
    const min = 1;
    const max = 98;
    const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
};

// Game over reset
export const gameOver = (snakeDots: number[][],) => {
    const gameOverMessage = `GAME OVER, your score is ${snakeDots.length - 2}`;
    //reset(initialState);
    return gameOverMessage
};

// Snake movement
export const moveSnake = (state: StateType, setState: (cb: (prev: StateType) => StateType) => void) => {
    const dots = [...state.snakeDots];
    let head = dots[dots.length - 1];

    if (state.route === "game") {
        switch (state.direction) {
            case "RIGHT":
                head = [head[0] + 2, head[1]];
                break;
            case "LEFT":
                head = [head[0] - 2, head[1]];
                break;
            case "DOWN":
                head = [head[0], head[1] + 2];
                break;
            case "UP":
                head = [head[0], head[1] - 2];
                break;
        }

        dots.push(head);
        dots.shift();

        setState((prev: StateType) => ({ ...prev, snakeDots: dots }));
    }
};

// Snake out of bounds
export const onSnakeOutOfBounds = (state: StateType, gameOverFn: () => void) => {
    const head = state.snakeDots[state.snakeDots.length - 1];
    if (state.route === "game") {
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            gameOverFn();
        }
    }
};

// Snake collision with itself
export const onSnakeCollapsed = (state: StateType, gameOverFn: () => void) => {
    const snake = [...state.snakeDots];
    const head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
            gameOverFn();
        }
    });
};

// Increase snake length
export const increaseSnake = (state: StateType, setState: (cb: (prev: StateType) => StateType) => void) => {
    const newSnake = [...state.snakeDots];
    newSnake.unshift([]);
    setState((prev: StateType) => ({ ...prev, snakeDots: newSnake }));
};

// Increase speed
export const increaseSpeed = (state: StateType, setState: (cb: (prev: StateType) => StateType) => void) => {
    if (state.speed > 10) {
        setState((prev: StateType) => ({ ...prev, speed: state.speed - 20 }));
    }
};

// Snake eats food
export const onSnakeEats = (state: StateType, setState: (cb: (prev: StateType) => StateType) => void, increaseSnakeFn: () => void, increaseSpeedFn: () => void) => {
    const head = state.snakeDots[state.snakeDots.length - 1];
    const food = state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
        setState((prev: StateType) => ({ ...prev, food: getRandomFood() }));
        increaseSnakeFn();
        increaseSpeedFn();
    }
};
