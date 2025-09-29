export interface CountryDataType { year: string; population: number; tourists: number; safety: number }
export type CountryChartData = {
    [key: string]: { // key is country code like "US", "CA", etc.
        name: string;
        data: CountryDataType[];
    };
};

export const CountryDataSet: CountryChartData = {
    US: {
        name: "United States",
        data: [
            { year: "2018", population: 327, tourists: 80, safety: 70 },
            { year: "2019", population: 329, tourists: 85, safety: 68 },
            { year: "2020", population: 331, tourists: 40, safety: 72 },
            { year: "2021", population: 333, tourists: 60, safety: 74 },
            { year: "2022", population: 335, tourists: 90, safety: 75 },
        ],
    },
    CA: {
        name: "Canada",
        data: [
            { year: "2018", population: 37, tourists: 20, safety: 80 },
            { year: "2019", population: 38, tourists: 25, safety: 82 },
            { year: "2020", population: 38, tourists: 10, safety: 83 },
            { year: "2021", population: 39, tourists: 15, safety: 84 },
            { year: "2022", population: 39, tourists: 28, safety: 85 },
        ],
    },
    JP: {
        name: "Japan",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "BR": {
        name: "Brazil",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "MX": {
        name: "Mexico",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "AR": {
        name: "Argentina",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "GB": {
        name: "United Kingdom",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "FR": {
        name: "France",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "DE": {
        name: "Germany",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "ES": {
        name: "Spain",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "IT": {
        name: "Italy",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "CN": {
        name: "China",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "IN": {
        name: "India",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "KR": {
        name: "South Korea",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "SG": {
        name: "Singapore",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "AU": {
        name: "Australia",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "NZ": {
        name: "New Zealand",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "ZA": {
        name: "South Africa",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "NG": {
        name: "Nigeria",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "EG": {
        name: "Egypt",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "RU": {
        name: "Russia",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "TR": {
        name: "Turkey",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "SA": {
        name: "Saudi Arabia",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "AE": {
        name: "United Arab Emirates",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "IL": {
        name: "Israel",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "KE": {
        name: "Kenya",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "DZ": {
        name: "Algeria",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "MA": {
        name: "Morocco",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "GH": {
        name: "Ghana",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "TH": {
        name: "Thailand",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "VN": {
        name: "Vietnam",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "PH": {
        name: "Philippines",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "PK": {
        name: "Pakistan",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "NL": {
        name: "Netherlands",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "SE": {
        name: "Sweden",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "NO": {
        name: "Norway",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "PL": {
        name: "Poland",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "CL": {
        name: "Chile",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "CO": {
        name: "Colombia",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "PE": {
        name: "Peru",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "VE": {
        name: "Venezuela",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "IQ": {
        name: "Iraq",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "IR": {
        name: "Iran",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "QA": {
        name: "Qatar",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "KW": {
        name: "Kuwait",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "FJ": {
        name: "Fiji",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    },
    "PG": {
        name: "Papua New Guinea",
        data: [
            { year: "2018", population: 126, tourists: 31, safety: 90 },
            { year: "2019", population: 126, tourists: 32, safety: 91 },
            { year: "2020", population: 125, tourists: 4, safety: 92 },
            { year: "2021", population: 125, tourists: 8, safety: 92 },
            { year: "2022", population: 124, tourists: 25, safety: 93 },
        ],
    }
};