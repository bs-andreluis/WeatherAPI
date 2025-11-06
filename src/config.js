// config.js
// Exports the OpenWeather API key read from Vite environment variables.
// Create a `.env` file at the project root with:
// VITE_OPENWEATHER_KEY=your_api_key_here


export const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || "";


export function ensureApiKey() {
if (!API_KEY) throw new Error("Missing OpenWeather API key. Create a .env file with VITE_OPENWEATHER_KEY=");
}