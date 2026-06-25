/**
 * Shuffles an array containing numbers 1-15 and an empty string using the Fisher-Yates algorithm.
 * @returns {(number | string)[]} A shuffled array with elements [1, 2, 3, ..., 15, ""]
 */
export default function ShuffleArray() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}