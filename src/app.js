// app.js
import { getCurrentWeather } from "./api/weatherService";
import { saveSearch, getHistory } from "./utils/storage";
import { ensureApiKey } from "./config.js";


// Ensure the developer set the API key (helps during dev)
try { ensureApiKey(); } catch (e) { console.warn(e.message); }


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultEl = document.getElementById("result");
const historyList = document.getElementById("historyList");


function renderResult(data) {
resultEl.classList.remove("hidden");
resultEl.innerHTML = `
<div class="card">
<div class="result-title">
<div>
<div class="temp">${data.temp}°C</div>
<div class="small">${data.city}, ${data.country}</div>
</div>
<div style="margin-left:auto;text-align:right">
<div class="small">${data.weather}</div>
<div class="small">Feels like ${data.feels_like}°C</div>
</div>
</div>
<div style="margin-top:12px;color:var(--muted)">Humidity: ${data.humidity}% — ${data.description}</div>
</div>
`;
}


function renderHistory() {
const arr = getHistory();
historyList.innerHTML = arr.map(city => `<li data-city="${city}">${city}</li>`).join("");
}
renderHistory();


//Handle search button click
searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const data = await getCurrentWeather(city);
        renderResult(data);
        saveSearch(city);
        renderHistory();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});


// Allow clicking on history to search again
historyList.addEventListener("click", (e) => {
  const city = e.target.dataset.city;
  if (!city) return;

  cityInput.value = city;
  searchBtn.click();
});
