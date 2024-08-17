document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');

    searchButton.addEventListener('click', function() {
        const city = cityInput.value.trim();

        if (city) {
            fetchWeather(city);
        } else {
            alert('请输入城市名称');
        }
    });

    function fetchWeather(city) {
        const id = '88888888'; // 替换为你的API ID
        const key = '88888888'; // 替换为你的API Key
        const sheng = '四川'; // 省份可以动态调整
        const place = city;

        const url = `https://cn.apihz.cn/api/tianqi/tqyb.php?id=${id}&key=${key}&sheng=${sheng}&place=${place}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    document.getElementById('location').textContent = `${data.sheng} ${data.place}`;
                    document.getElementById('temperature').textContent = `${data.wendu}°C`;
                    document.getElementById('condition').textContent = data.tianqi;
                    document.getElementById('wind').textContent = `风向：${data.fengxiang}`;
                    document.getElementById('wind-level').textContent = `风力：${data.fengli}`;
                    document.getElementById('humidity').textContent = `湿度：${data.humidity}`;
                    document.getElementById('aqi').textContent = `空气质量指数：${data.aqi}`;
                } else {
                    document.getElementById('location').textContent = '未找到该城市的天气信息';
                    resetWeatherInfo();
                }
            })
            .catch(error => {
                console.error('获取天气信息失败:', error);
                document.getElementById('location').textContent = '无法获取天气信息';
                resetWeatherInfo();
            });
    }

    function resetWeatherInfo() {
        document.getElementById('temperature').textContent = '--°C';
        document.getElementById('condition').textContent = '--';
        document.getElementById('wind').textContent = '风向：--';
        document.getElementById('wind-level').textContent = '风力：--';
        document.getElementById('humidity').textContent = '湿度：--';
        document.getElementById('aqi').textContent = '空气质量指数：--';
    }
});

