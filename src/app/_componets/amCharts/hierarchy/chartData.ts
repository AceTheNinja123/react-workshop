export let ForceDirectedTreeData = {
    value: 0,
    children: [
        {
            name: "Flora",
            children: [
                { name: "Black Tea", value: 1 },
                { name: "Floral", children: [{ name: "Chamomile", value: 1 }, { name: "Rose", value: 1 }, { name: "Jasmine", value: 1 }] }
            ]
        },
        {
            name: "Fruity",
            children: [
                { name: "Berry", children: [{ name: "Blackberry", value: 1 }, { name: "Raspberry", value: 1 }, { name: "Blueberry", value: 1 }, { name: "Strawberry", value: 1 }] },
                { name: "Dried Fruit", children: [{ name: "Raisin", value: 1 }, { name: "Prune", value: 1 }] },
                { name: "Other Fruit", children: [{ name: "Coconut", value: 1 }, { name: "Cherry", value: 1 }, { name: "Pomegranate", value: 1 }, { name: "Pineapple", value: 1 }, { name: "Grape", value: 1 }, { name: "Apple", value: 1 }, { name: "Peach", value: 1 }, { name: "Pear", value: 1 }] },
                { name: "Citrus Fruit", children: [{ name: "Grapefruit", value: 1 }, { name: "Orange", value: 1 }, { name: "Lemon", value: 1 }, { name: "Lime", value: 1 }] }
            ]
        },
        {
            name: "Sour/Fermented",
            children: [
                { name: "Sour", children: [{ name: "Sour Aromatics", value: 1 }, { name: "Acetic Acid", value: 1 }, { name: "Butyric Acid", value: 1 }, { name: "Isovaleric Acid", value: 1 }, { name: "Citric Acid", value: 1 }, { name: "Malic Acid", value: 1 }] },
                { name: "Alcohol/Fremented", children: [{ name: "Winey", value: 1 }, { name: "Whiskey", value: 1 }, { name: "Fremented", value: 1 }, { name: "Overripe", value: 1 }] }
            ]
        },
        {
            name: "Green/Vegetative",
            children: [
                { name: "Olive Oil", value: 1 },
                { name: "Raw", value: 1 },
                { name: "Green/Vegetative", children: [{ name: "Under-ripe", value: 1 }, { name: "Peapod", value: 1 }, { name: "Fresh", value: 1 }, { name: "Dark Green", value: 1 }, { name: "Vegetative", value: 1 }, { name: "Hay-like", value: 1 }, { name: "Herb-like", value: 1 }] },
                { name: "Beany", value: 1 }
            ]
        },
        {
            name: "Other",
            children: [
                { name: "Papery/Musty", children: [{ name: "Stale", value: 1 }, { name: "Cardboard", value: 1 }, { name: "Papery", value: 1 }, { name: "Woody", value: 1 }, { name: "Moldy/Damp", value: 1 }, { name: "Musty/Dusty", value: 1 }, { name: "Musty/Earthy", value: 1 }, { name: "Animalic", value: 1 }, { name: "Meaty Brothy", value: 1 }, { name: "Phenolic", value: 1 }] },
                { name: "Chemical", children: [{ name: "Bitter", value: 1 }, { name: "Salty", value: 1 }, { name: "Medicinal", value: 1 }, { name: "Petroleum", value: 1 }, { name: "Skunky", value: 1 }, { name: "Rubber", value: 1 }] }
            ]
        },
        {
            name: "Roasted",
            children: [
                { name: "Pipe Tobacco", value: 1 },
                { name: "Tobacco", value: 1 },
                { name: "Burnt", children: [{ name: "Acrid", value: 1 }, { name: "Ashy", value: 1 }, { name: "Smoky", value: 1 }, { name: "Brown, Roast", value: 1 }] },
                { name: "Cereal", children: [{ name: "Grain", value: 1 }, { name: "Malt", value: 1 }] }
            ]
        },
        {
            name: "Spices",
            children: [
                { name: "Pungent", value: 1 },
                { name: "Pepper", value: 1 },
                { name: "Brown Spice", children: [{ name: "Anise", value: 1 }, { name: "Nutmeg", value: 1 }, { name: "Cinnamon", value: 1 }, { name: "Clove", value: 1 }] }
            ]
        },
        {
            name: "Nutty/Cocoa",
            children: [
                { name: "Nutty", children: [{ name: "Peanuts", value: 1 }, { name: "Hazelnut", value: 1 }, { name: "Almond", value: 1 }] },
                { name: "Cocoa", children: [{ name: "Chocolate", value: 1 }, { name: "Dark Chocolate", value: 1 }] }
            ]
        },
        {
            name: "Sweet",
            children: [
                { name: "Brown Sugar", children: [{ name: "Molasses", value: 1 }, { name: "Maple Syrup", value: 1 }, { name: "Caramelized", value: 1 }, { name: "Honey", value: 1 }] },
                { name: "Vanilla", value: 1 },
                { name: "Vanillin", value: 1 },
                { name: "Overall Sweet", value: 1 },
                { name: "Sweet Aromatics", value: 1 }
            ]
        }
    ]
};

export const PackedCirclesRestaurant = {
  "name": "Packed Circles",
  "children": [
    // Neutral
    { "name": "table", "value": 210, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "menu", "value": 185, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "drink", "value": 160, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "plate", "value": 130, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "order", "value": 115, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "meal", "value": 95, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "bill", "value": 78, "color": "#c9c9cd", "polarities": "Neutral" },
    { "name": "reservation", "value": 62, "color": "#c9c9cd", "polarities": "Neutral" },

    // Negative
    { "name": "slow", "value": 55, "color": "#e55d5d", "polarities": "Negative" },
    { "name": "cold", "value": 49, "color": "#e55d5d", "polarities": "Negative" },
    { "name": "expensive", "value": 44, "color": "#e55d5d", "polarities": "Negative" },
    { "name": "dirty", "value": 37, "color": "#e55d5d", "polarities": "Negative" },
    { "name": "rude", "value": 28, "color": "#e55d5d", "polarities": "Negative" },
    { "name": "noisy", "value": 23, "color": "#e55d5d", "polarities": "Negative" },

    // Positive
    { "name": "delicious", "value": 175, "color": "#7ec991", "polarities": "Positive" },
    { "name": "tasty", "value": 150, "color": "#7ec991", "polarities": "Positive" },
    { "name": "fresh", "value": 128, "color": "#7ec991", "polarities": "Positive" },
    { "name": "friendly", "value": 115, "color": "#7ec991", "polarities": "Positive" },
    { "name": "fast", "value": 102, "color": "#7ec991", "polarities": "Positive" },
    { "name": "clean", "value": 91, "color": "#7ec991", "polarities": "Positive" },
    { "name": "cozy", "value": 85, "color": "#7ec991", "polarities": "Positive" },
    { "name": "affordable", "value": 73, "color": "#7ec991", "polarities": "Positive" }
  ]
};

export interface dataType { "name": string; "value": number; "color": string; "polarities": string; }
export const restaurantTreeMapData: {  [key: string]: Array<{ name: string; children: Array<dataType> }>;} = {
  "children": [
    {
      "name": "Neutral",
      "children": [
        { "name": "table", "value": 220, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "menu", "value": 180, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "drink", "value": 160, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "order", "value": 140, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "meal", "value": 120, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "plate", "value": 90, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "dish", "value": 85, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "bill", "value": 70, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "reservation", "value": 65, "color": "#c9c9cd", "polarities": "Neutral" },
        { "name": "crowd", "value": 60, "color": "#c9c9cd", "polarities": "Neutral" }
      ]
    },
    {
      "name": "Negative",
      "children": [
        { "name": "slow", "value": 55, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "cold", "value": 48, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "expensive", "value": 42, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "dirty", "value": 38, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "rude", "value": 29, "color": "#e55d5d", "polarities": "Negative" },
        { "name": "noisy", "value": 25, "color": "#e55d5d", "polarities": "Negative" }
      ]
    },
    {
      "name": "Positive",
      "children": [
        { "name": "delicious", "value": 170, "color": "#7ec991", "polarities": "Positive" },
        { "name": "tasty", "value": 140, "color": "#7ec991", "polarities": "Positive" },
        { "name": "fresh", "value": 130, "color": "#7ec991", "polarities": "Positive" },
        { "name": "friendly", "value": 115, "color": "#7ec991", "polarities": "Positive" },
        { "name": "fast", "value": 100, "color": "#7ec991", "polarities": "Positive" },
        { "name": "clean", "value": 95, "color": "#7ec991", "polarities": "Positive" },
        { "name": "cozy", "value": 88, "color": "#7ec991", "polarities": "Positive" },
        { "name": "affordable", "value": 72, "color": "#7ec991", "polarities": "Positive" }
      ]
    }
  ]
};