import * as am5 from "@amcharts/amcharts5";

export interface circleTemplateType { fill: am5.Color; }
export interface polygonSettingsType { disabled: boolean, active: boolean, tooltipHTML: string, toggleKey: string, interactive: boolean, fill: am5.Color; }
export interface geometryType { "type": string; "coordinates": Array<Array<number>> }
export interface dataContextType { "geometry": geometryType; "geometryType": string; "madeFromGeoData": boolean; "id": string; "name": string; }
export interface dataType {
  id: string;
  name: string;
  value: number;
  review_rating:  number;
  nps: number;
  sentiment: string;
  cursor: string;
  circleTemp?: circleTemplateType;
  polygonSettings?: polygonSettingsType;
  countyValueGroup?: string;
}

export const bubbleMapData: dataType[] = [
  { id: "US", name: "United States", value: 500, review_rating: 4.3, nps: 62, sentiment: "Positive", cursor: "pointer" },
  { id: "CA", name: "Canada", value: 220, review_rating: 4.1, nps: 55, sentiment: "Positive", cursor: "pointer" },
  { id: "BR", name: "Brazil", value: 180, review_rating: 3.9, nps: 40, sentiment: "Neutral", cursor: "pointer" },
  { id: "MX", name: "Mexico", value: 8, review_rating: 3.7, nps: 35, sentiment: "Neutral", cursor: "pointer" },
  { id: "AR", name: "Argentina", value: 95, review_rating: 3.8, nps: 38, sentiment: "Neutral", cursor: "pointer" },
  { id: "GB", name: "United Kingdom", value: 300, review_rating: 4.2, nps: 58, sentiment: "Positive", cursor: "pointer" },
  { id: "FR", name: "France", value: 30, review_rating: 4.0, nps: 50, sentiment: "Positive", cursor: "pointer" },
  { id: "DE", name: "Germany", value: 24, review_rating: 4.4, nps: 65, sentiment: "Positive", cursor: "pointer" },
  { id: "ES", name: "Spain", value: 210, review_rating: 4.1, nps: 52, sentiment: "Positive", cursor: "pointer" },
  { id: "IT", name: "Italy", value: 2, review_rating: 4.0, nps: 48, sentiment: "Neutral", cursor: "pointer" },
  { id: "CN", name: "China", value: 400, review_rating: 3.6, nps: 30, sentiment: "Neutral", cursor: "pointer" },
  { id: "JP", name: "Japan", value: 320, review_rating: 4.3, nps: 60, sentiment: "Positive", cursor: "pointer" },
  { id: "IN", name: "India", value: 14, review_rating: 3.9, nps: 42, sentiment: "Neutral", cursor: "pointer" },
  { id: "KR", name: "South Korea", value: 190, review_rating: 4.2, nps: 53, sentiment: "Positive", cursor: "pointer" },
  { id: "SG", name: "Singapore", value: 85, review_rating: 4.5, nps: 70, sentiment: "Positive", cursor: "pointer" },
  { id: "AU", name: "Australia", value: 2, review_rating: 4.1, nps: 54, sentiment: "Positive", cursor: "pointer" },
  { id: "NZ", name: "New Zealand", value: 75, review_rating: 4.6, nps: 72, sentiment: "Positive", cursor: "pointer" },
  { id: "ZA", name: "South Africa", value: 150, review_rating: 3.7, nps: 36, sentiment: "Neutral", cursor: "pointer" },
  { id: "NG", name: "Nigeria", value: 8, review_rating: 3.5, nps: 28, sentiment: "Negative", cursor: "pointer" },
  { id: "EG", name: "Egypt", value: 30, review_rating: 3.8, nps: 34, sentiment: "Neutral", cursor: "pointer" },
  { id: "RU", name: "Russia", value: 260, review_rating: 3.6, nps: 32, sentiment: "Neutral", cursor: "pointer" },
  { id: "TR", name: "Turkey", value: 170, review_rating: 3.9, nps: 41, sentiment: "Neutral", cursor: "pointer" },
  { id: "SA", name: "Saudi Arabia", value: 140, review_rating: 3.7, nps: 37, sentiment: "Neutral", cursor: "pointer" },
  { id: "AE", name: "United Arab Emirates", value: 3, review_rating: 4.2, nps: 56, sentiment: "Positive", cursor: "pointer" },
  { id: "IL", name: "Israel", value: 90, review_rating: 4.0, nps: 45, sentiment: "Positive", cursor: "pointer" },
];