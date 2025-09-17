export interface dataType { "date": string; "value": number | null; "name": string; "markers": { "fill": string; "height": number; "width": number; "url": string; } }
export interface imageType { "src"?: string; "height"?: number; "width"?: number; "blurDataURL"?: string; "blurWidth"?: number; "blurHeight"?: number; }

export const monsterData = [
    {
        name: "Godzilla",
        data: [
            { date: "2020", value: 75, name: "Godzilla", markers: { fill: "#4CAF50", height: 20, width: 20, url: "url(/img/monsters/godzilla.png)" } },
            { date: "2021", value: 80, name: "Godzilla", markers: { fill: "#4CAF50", height: 20, width: 20, url: "url(/img/monsters/godzilla.png)" } },
            { date: "2022", value: 85, name: "Godzilla", markers: { fill: "#4CAF50", height: 20, width: 20, url: "url(/img/monsters/godzilla.png)" } },
            { date: "2023", value: 87, name: "Godzilla", markers: { fill: "#4CAF50", height: 20, width: 20, url: "url(/img/monsters/godzilla.png)" } },
            { date: "2024", value: 89, name: "Godzilla", markers: { fill: "#4CAF50", height: 20, width: 20, url: "url(/img/monsters/godzilla.png)" } },
            { date: "2025", value: 92, name: "Godzilla", markers: { fill: "#4CAF50", height: 20, width: 20, url: "url(/img/monsters/godzilla.png)" } },
        ],
    },
    {
        name: "Hydra",
        data: [
            { date: "2020", value: null, name: "Hydra", markers: { fill: "#9C27B0", height: 20, width: 20, url: "url(/img/monsters/hydra.png)" } },
            { date: "2021", value: null, name: "Hydra", markers: { fill: "#9C27B0", height: 20, width: 20, url: "url(/img/monsters/hydra.png)" } },
            { date: "2022", value: 70, name: "Hydra", markers: { fill: "#9C27B0", height: 20, width: 20, url: "url(/img/monsters/hydra.png)" } },
            { date: "2023", value: 75, name: "Hydra", markers: { fill: "#9C27B0", height: 20, width: 20, url: "url(/img/monsters/hydra.png)" } },
            { date: "2024", value: 78, name: "Hydra", markers: { fill: "#9C27B0", height: 20, width: 20, url: "url(/img/monsters/hydra.png)" } },
            { date: "2025", value: 82, name: "Hydra", markers: { fill: "#9C27B0", height: 20, width: 20, url: "url(/img/monsters/hydra.png)" } },
        ],
    },
    {
        name: "Kraken",
        data: [
            { date: "2020", value: null, name: "Kraken", markers: { fill: "#2196F3", height: 20, width: 20, url: "url(/img/monsters/kraken.png)" } },
            { date: "2021", value: 57, name: "Kraken", markers: { fill: "#2196F3", height: 20, width: 20, url: "url(/img/monsters/kraken.png)" } },
            { date: "2022", value: 60, name: "Kraken", markers: { fill: "#2196F3", height: 20, width: 20, url: "url(/img/monsters/kraken.png)" } },
            { date: "2023", value: 65, name: "Kraken", markers: { fill: "#2196F3", height: 20, width: 20, url: "url(/img/monsters/kraken.png)" } },
            { date: "2024", value: 72, name: "Kraken", markers: { fill: "#2196F3", height: 20, width: 20, url: "url(/img/monsters/kraken.png)" } },
            { date: "2025", value: 80, name: "Kraken", markers: { fill: "#2196F3", height: 20, width: 20, url: "url(/img/monsters/kraken.png)" } },
        ],
    },
    {
        name: "Minotaur",
        data: [
            { date: "2020", value: 55, name: "Minotaur", markers: { fill: "#FF9800", height: 20, width: 20, url: "url(/img/monsters/minotaur.png)" } },
            { date: "2021", value: 53, name: "Minotaur", markers: { fill: "#FF9800", height: 20, width: 20, url: "url(/img/monsters/minotaur.png)" } },
            { date: "2022", value: 50, name: "Minotaur", markers: { fill: "#FF9800", height: 20, width: 20, url: "url(/img/monsters/minotaur.png)" } },
            { date: "2023", value: 58, name: "Minotaur", markers: { fill: "#FF9800", height: 20, width: 20, url: "url(/img/monsters/minotaur.png)" } },
            { date: "2024", value: 63, name: "Minotaur", markers: { fill: "#FF9800", height: 20, width: 20, url: "url(/img/monsters/minotaur.png)" } },
            { date: "2025", value: 70, name: "Minotaur", markers: { fill: "#FF9800", height: 20, width: 20, url: "url(/img/monsters/minotaur.png)" } },
        ],
    },
    {
        name: "Dragon",
        data: [
            { date: "2020", value: null, name: "Dragon", markers: { fill: "#E91E63", height: 20, width: 20, url: "url(/img/monsters/dragon.png)" } },
            { date: "2021", value: null, name: "Dragon", markers: { fill: "#E91E63", height: 20, width: 20, url: "url(/img/monsters/dragon.png)" } },
            { date: "2022", value: 95, name: "Dragon", markers: { fill: "#E91E63", height: 20, width: 20, url: "url(/img/monsters/dragon.png)" } },
            { date: "2023", value: 97, name: "Dragon", markers: { fill: "#E91E63", height: 20, width: 20, url: "url(/img/monsters/dragon.png)" } },
            { date: "2024", value: 98, name: "Dragon", markers: { fill: "#E91E63", height: 20, width: 20, url: "url(/img/monsters/dragon.png)" } },
            { date: "2025", value: 100, name: "Dragon", markers: { fill: "#E91E63", height: 20, width: 20, url: "url(/img/monsters/dragon.png)" } },
        ],
    },
];