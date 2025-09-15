import * as am5 from "@amcharts/amcharts5";

export let data = [{
    name: "COFFEE",
    nodeSettings: { fill: am5.color(0xaaaaaa) },
    children: [{
        name: "Berry",
        nodeSettings: { fill: am5.color(0x72588a) },
        children: [
            { name: "Strawberry", nodeSettings: { fill: am5.color(0xbb3b4b) }, value: 1 },
            { name: "Raspberry", nodeSettings: { fill: am5.color(0xbc366a) }, value: 1 },
            { name: "Blueberry", nodeSettings: { fill: am5.color(0x565585) }, value: 1 },
            { name: "Black currant", nodeSettings: { fill: am5.color(0x473e58) }, value: 1 },
            { name: "Strawberry", nodeSettings: { fill: am5.color(0x2e3245) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Fruitty",
        nodeSettings: { fill: am5.color(0xe16858) },
        children: [
            { name: "Pear", nodeSettings: { fill: am5.color(0xbbc395) }, value: 1 },
            { name: "Green apple", nodeSettings: { fill: am5.color(0xb7c56e) }, value: 1 },
            { name: "Red apple", nodeSettings: { fill: am5.color(0xb56963) }, value: 1 },
            { name: "Lime", nodeSettings: { fill: am5.color(0x79b16e) }, value: 1 },
            { name: "Lemon", nodeSettings: { fill: am5.color(0xfbe83a) }, value: 1 },
            { name: "Bergamot", nodeSettings: { fill: am5.color(0x82b46d) }, value: 1 },
            { name: "Orange", nodeSettings: { fill: am5.color(0xd77639) }, value: 1 },
            { name: "Mandarin", nodeSettings: { fill: am5.color(0xe3834d) }, value: 1 },
            { name: "Apricot", nodeSettings: { fill: am5.color(0xd49471) }, value: 1 },
            { name: "Peach", nodeSettings: { fill: am5.color(0xe7a56e) }, value: 1 },
            { name: "Mango", nodeSettings: { fill: am5.color(0xefd245) }, value: 1 },
            { name: "Pineapple", nodeSettings: { fill: am5.color(0xf2e08f) }, value: 1 },
            { name: "Honeydew melon", nodeSettings: { fill: am5.color(0xeed98a) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Dried fruit",
        nodeSettings: { fill: am5.color(0x65443d) },
        children: [
            { name: "Raisin", nodeSettings: { fill: am5.color(0x1b353f) }, value: 1 },
            { name: "Prune", nodeSettings: { fill: am5.color(0x253e4c) }, value: 1 },
            { name: "Dates", nodeSettings: { fill: am5.color(0x3e332b) }, value: 1 },
            { name: "Cranberry", nodeSettings: { fill: am5.color(0x7c2d45) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Sweets",
        nodeSettings: { fill: am5.color(0xc39c69) },
        children: [
            { name: "Vanilla", nodeSettings: { fill: am5.color(0x413126) }, value: 1 },
            { name: "Butter", nodeSettings: { fill: am5.color(0xe5d1a1) }, value: 1 },
            { name: "Honey", nodeSettings: { fill: am5.color(0xc7ae5e) }, value: 1 },
            { name: "Caramel", nodeSettings: { fill: am5.color(0xad7b50) }, value: 1 },
            { name: "Sweet liquor", nodeSettings: { fill: am5.color(0xae723b) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Chocolate",
        nodeSettings: { fill: am5.color(0x5a452c) },
        children: [
            { name: "Pure cocoa", nodeSettings: { fill: am5.color(0x3e3121) }, value: 1 },
            { name: "Dark chocolate", nodeSettings: { fill: am5.color(0x483a21) }, value: 1 },
            { name: "Milk chocolate", nodeSettings: { fill: am5.color(0x604a2b) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Nutty",
        nodeSettings: { fill: am5.color(0x877768) },
        children: [
            { name: "Hazelnut", nodeSettings: { fill: am5.color(0x645032) }, value: 1 },
            { name: "Almond", nodeSettings: { fill: am5.color(0x776756) }, value: 1 },
            { name: "Peanut", nodeSettings: { fill: am5.color(0xddc2a5) }, value: 1 },
            { name: "Walnut", nodeSettings: { fill: am5.color(0x937a5b) }, value: 1 },
            { name: "Peacan", nodeSettings: { fill: am5.color(0x947e61) }, value: 1 },
            { name: "Cashew", nodeSettings: { fill: am5.color(0xe5cdb7) }, value: 1 },
            { name: "Brazil nut", nodeSettings: { fill: am5.color(0xa88a74) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Roasted",
        nodeSettings: { fill: am5.color(0x926d63) },
        children: [
            { name: "Smoke", nodeSettings: { fill: am5.color(0x959890) }, value: 1 },
            { name: "Tobacco", nodeSettings: { fill: am5.color(0x756950) }, value: 1 },
            { name: "Toast", nodeSettings: { fill: am5.color(0x96886f) }, value: 1 },
            { name: "Burned", nodeSettings: { fill: am5.color(0x50483f) }, value: 1 },
            { name: "Ashy", nodeSettings: { fill: am5.color(0x51483d) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Industrial",
        nodeSettings: { fill: am5.color(0x989694) },
        children: [
            { name: "Leather", nodeSettings: { fill: am5.color(0x6f5744) }, value: 1 },
            { name: "Rubber", nodeSettings: { fill: am5.color(0x554f4a) }, value: 1 },
            { name: "Earthy", nodeSettings: { fill: am5.color(0x615c50) }, value: 1 },
            { name: "Musty", nodeSettings: { fill: am5.color(0x7d6d5c) }, value: 1 },
            { name: "Woody", nodeSettings: { fill: am5.color(0x9e7f60) }, value: 1 },
            { name: "Paper/cardboard", nodeSettings: { fill: am5.color(0xa79076) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Spicy",
        nodeSettings: { fill: am5.color(0xa47037) },
        children: [
            { name: "Cinnamon", nodeSettings: { fill: am5.color(0x96794c) }, value: 1 },
            { name: "Clove", nodeSettings: { fill: am5.color(0x453c2a) }, value: 1 },
            { name: "Nutmeg", nodeSettings: { fill: am5.color(0x705c3e) }, value: 1 },
            { name: "Cardamon", nodeSettings: { fill: am5.color(0x8b7b6c) }, value: 1 },
            { name: "Pepper", nodeSettings: { fill: am5.color(0x463c28) }, value: 1 },
            { name: "Coriander seeds", nodeSettings: { fill: am5.color(0xbea585) }, value: 1 },
            { name: "Liquorice", nodeSettings: { fill: am5.color(0x201a15) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Cereal",
        nodeSettings: { fill: am5.color(0xdfbd94) },
        children: [
            { name: "Malt", nodeSettings: { fill: am5.color(0xbca78a) }, value: 1 },
            { name: "Grain", nodeSettings: { fill: am5.color(0xe1c6a8) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Green",
        nodeSettings: { fill: am5.color(0x6ba478) },
        children: [
            { name: "Cedar", nodeSettings: { fill: am5.color(0x548263) }, value: 1 },
            { name: "Grass", nodeSettings: { fill: am5.color(0x53a164) }, value: 1 },
            { name: "Straw", nodeSettings: { fill: am5.color(0xbab08c) }, value: 1 },
            { name: "Hay", nodeSettings: { fill: am5.color(0xb69f65) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Herb/\nvegetal",
        nodeSettings: { fill: am5.color(0x598264) },
        children: [
            { name: "Thyme", nodeSettings: { fill: am5.color(0x6c8067) }, value: 1 },
            { name: "Oregano", nodeSettings: { fill: am5.color(0x6e9362) }, value: 1 },
            { name: "Basil", nodeSettings: { fill: am5.color(0x36894b) }, value: 1 },
            { name: "Rosemary", nodeSettings: { fill: am5.color(0x5d8769) }, value: 1 },
            { name: "Garden peas", nodeSettings: { fill: am5.color(0x378a4c) }, value: 1 },
            { name: "Cucumber", nodeSettings: { fill: am5.color(0x028f4b) }, value: 1 },
            { name: "Tomato", nodeSettings: { fill: am5.color(0x9f4d4b) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }, {
        name: "Floral",
        nodeSettings: { fill: am5.color(0x8f6497) },
        children: [
            { name: "Lavender", nodeSettings: { fill: am5.color(0x7b6084) }, value: 1 },
            { name: "Rose", nodeSettings: { fill: am5.color(0x8b334a) }, value: 1 },
            { name: "Hibiscus", nodeSettings: { fill: am5.color(0xae4360) }, value: 1 },
            { name: "Jasmine", nodeSettings: { fill: am5.color(0xe7d0dd) }, value: 1 },
            { name: "Coffee blossom", nodeSettings: { fill: am5.color(0xe7d1db) }, value: 1 },
            { name: "Camomile", nodeSettings: { fill: am5.color(0xe5d9b6) }, value: 1 },
            { name: "Elderflower", nodeSettings: { fill: am5.color(0xe0e0dc) }, value: 1 }
        ]
    }, {
        value: 0.1, nodeSettings: { fill: am5.color(0xffffff) }
    }]
}];