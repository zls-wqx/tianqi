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
                } else {
                    document.getElementById('location').textContent = '未找到该城市的天气信息';
                    document.getElementById('temperature').textContent = '--°C';
                    document.getElementById('condition').textContent = '--';
                }
            })
            .catch(error => {
                console.error('获取天气信息失败:', error);
                document.getElementById('location').textContent = '无法获取天气信息';
            });
    }
});
