window.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    const form = document.getElementById('city-form');
    const cityInput = document.getElementById('city-input');
    const weatherElement = document.getElementById('weather');
    const icon = document.getElementById('img');
    const cityTitle = document.getElementById('city');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (!city) return;

        weatherElement.textContent = 'Загружаем погоду…';
        cityTitle.textContent = '';
        icon.removeAttribute('src');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message === 'city not found' ? 'Город не найден. Проверьте название.' : 'Не удалось получить погоду. Попробуйте ещё раз.');
            }

            cityTitle.textContent = `${data.name}, страна: ${data.sys.country}`;
            weatherElement.innerHTML = `Текущая температура: ${data.main.temp}°C<br>Описание: ${data.weather[0].description}`;
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            icon.alt = data.weather[0].description;
        } catch (error) {
            weatherElement.textContent = error.message || 'Ошибка загрузки погоды. Проверьте подключение к интернету.';
        }
    });
});
