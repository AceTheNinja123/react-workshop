// Data.js
//interfaces
export interface dataType {
    id: number;
    name: string;
    img: string;
    matched: boolean;
}
export interface cardType {
    item: dataType;
    handleSelectedCards: (item: dataType) => void;
    toggled: boolean;
    stopflip: boolean;
}
//data
// const Data: dataType[] = [
//     { id: 1, name: "react", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165802/atom-4.png", matched: false, },
//     { id: 2, name: "java", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/java.png", matched: false, },
//     { id: 3, name: "css", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/css-3-1.png", matched: false, },
//     { id: 4, name: "node", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165805/nodejs-1.png", matched: false, },
//     { id: 5, name: "html", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165806/html-5-1.png", matched: false, },
//     { id: 6, name: "js", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165804/js-3.png", matched: false, },
//     { id: 7, name: "react", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165802/atom-4.png", matched: false, },
//     { id: 8, name: "java", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/java.png", matched: false, },
//     { id: 9, name: "css", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/css-3-1.png", matched: false, },
//     { id: 10, name: "node", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165805/nodejs-1.png", matched: false, },
//     { id: 11, name: "html", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165806/html-5-1.png", matched: false, },
//     { id: 12, name: "js", img: "https://media.geeksforgeeks.org/wp-content/uploads/20230927165804/js-3.png", matched: false, },
// ];
const Data: dataType[] = [
    { id: 1, name: "pizza", img: "/images/food/pizza.png", matched: false },
    { id: 2, name: "burger", img: "/images/food/burger.png", matched: false },
    { id: 3, name: "fries", img: "/images/food/fries.png", matched: false },
    { id: 4, name: "donut", img: "/images/food/donut.png", matched: false },
    { id: 5, name: "taco", img: "/images/food/taco.png", matched: false },
    { id: 6, name: "icecream", img: "/images/food/icecream.png", matched: false },

    // duplicates for matching
    { id: 7, name: "pizza", img: "/images/food/pizza.png", matched: false },
    { id: 8, name: "burger", img: "/images/food/burger.png", matched: false },
    { id: 9, name: "fries", img: "/images/food/fries.png", matched: false },
    { id: 10, name: "donut", img: "/images/food/donut.png", matched: false },
    { id: 11, name: "taco", img: "/images/food/taco.png", matched: false },
    { id: 12, name: "icecream", img: "/images/food/icecream.png", matched: false },
];
export default Data;