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
