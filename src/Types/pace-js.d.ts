declare module 'pace-js' {
  const Pace: {
    start: () => void;
    stop: () => void;
    restart: () => void;
    options: Record<string, unknown>; // You can replace this with a custom type later
    ignore: () => void;
    track: () => void;
    // Add other properties or methods as needed
  };
  export = Pace;
}