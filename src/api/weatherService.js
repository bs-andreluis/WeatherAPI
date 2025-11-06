// weatherService.js
// Responsible only for calling the OpenWeather current weather endpoint
// and returning a normalized object for the UI.


import { API_KEY } from "../config";


export async function getCurrentWeather(city) {
if (!city) throw new Error("City is required");
if (!API_KEY) throw new Error("Missing API key. Add VITE_OPENWEATHER_KEY in .env");


const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;


const res = await fetch(url);


if (!res.ok) {
const errText = await res.text().catch(() => "");
throw new Error(`API error: ${res.status} ${res.statusText} ${errText}`);
}


const data = await res.json();


// Normalize the response to only what the UI needs
return {
city: data.name,
country: data.sys?.country || "",
weather: data.weather?.[0]?.main || "",
description: data.weather?.[0]?.description || "",
icon: data.weather?.[0]?.icon || "",
temp: Math.round(data.main?.temp),
feels_like: Math.round(data.main?.feels_like),
humidity: data.main?.humidity
};
}