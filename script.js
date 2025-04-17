async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "7c992ff9c548eeac414ba1da7791c7ed"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    const loader = document.getElementById("loader");
    const card = document.getElementById("weatherCard");
  
    loader.style.display = "block";
    card.style.display = "none";
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
  
      const data = await response.json();
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
      const date = new Date().toLocaleString();
  
      const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${date}</p>
        <img src="${iconUrl}" alt="Weather icon"/>
        <p><strong>${data.weather[0].description}</strong></p>
        <p>🌡 Temp: ${data.main.temp}°C</p>
        <p>🌡 Feels Like: ${data.main.feels_like}°C</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🔽 Pressure: ${data.main.pressure} hPa</p>
      `;
  
      card.innerHTML = html;
      card.style.display = "block";
    } catch (error) {
      card.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
      card.style.display = "block";
    } finally {
      loader.style.display = "none";
    }
  }  
