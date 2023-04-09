const WEATHER_API_KEY = '178d035d25e5cf1e776dad665d3c1b4a';
const WEATHER_API_BASEURL = 'https://api.openweathermap.org/data/2.5/weather';
const weatherSection = document.querySelector('div#weather-section');
const weatherLocation = weatherSection.querySelector('div#weather-location');
const weatherMain = weatherSection.querySelector('div#weather-main');
const weatherIcon = weatherMain.querySelector('div#weather-icon');
const weatherTemps = weatherMain.querySelector('div#weather-temps');
const weatherOthers = weatherSection.querySelector('div#weather-others');
const weatherOtherTemps = weatherOthers.querySelector('div#other-temps');
const others = weatherOthers.querySelector('div#others');

const format = {
    country: {
        'KR': '대한민국',
    },
    city: {
        'Incheon': '인천광역시',
        'Seoul': '서울특별시',
        'Ganghwa-gun': '인천광역시 강화군',
        'Gimpo-si': '경기도 김포시',
        'Bucheon-si': '경기도 부천시',
        'Goyang-si': '경기도 고양시',
        'Paju': '경기도 파주시',
        'Munsan': '경기도 파주시 문산읍',
        'Guri-si': '경기도 구리시',
        'Uijeongbu-si': '경기도 의정부시',
        'Hwangmae': '경기도 동두천시 황매동',
        'Yeoncheon-gun': '경기도 연천군',
        'Unsal-li': '경기도 포천시 창수면 운산리',
        'Umulmok': '경기도 포천시 영북면 산정리 (우물목)',
        'Myongwoli-ri': '강원도 화천군 사내면 명월리',
        'Hwacheon': '강원도 화천군',
        'Hwado': '경기도 남양주시 화도읍',
        'Hanam': '경기도 하남시',
        'Yanggu': '강원도 양구군',
        'Inje': '강원도 인제군',
        'Buyeondong': '강원도 강릉시 연곡면 삼산리 (부연동)',
        'Kosong': '강원도 고성군',
        'Sokcho': '강원도 속초시',
        'Yangyang': '강원도 양양군',
        'Chuncheon': '강원도 춘천시',
        'Gapyeong County': '경기도 가평군',
        'Gangneung': '강원도 강릉시',
        'Tonghae': '강원도 동해시',
        '': '',
        '': '',
        '': '',
        '': '',

    },
    weather: {
        'Clear': 'clear',  // --- 맑음
        'Clouds': 'clouds',  // --- 구름
        'Drizzle': 'drizzle',  // --- 안개비
        'Rain': 'rain',  // --- 비
        'Snow': 'snow',  // --- 눈
        'Tornado': 'tornado',  // --- 태풍
        'Thunderstorm': 'thunderstorm',  // --- 천둥번개
        'Mist': 'mist',  // --- 안개
        'Smoke': 'mist',
        'Haze': 'mist',
        'Dust': 'mist',
        'Fog': 'mist',
        'Sand': 'mist',
        'Ash': 'mist',
        'Squall': 'mist',
    },
    others: {
        'temp_max': 'fa-solid fa-temperature-arrow-up',
        'temp_min': 'fa-solid fa-temperature-arrow-down',
        'wind_speed': 'fa-solid fa-wind',
        'humidity': 'fa-solid fa-water'
    },
}

/**
 * 웹 브라우저에서 사용자의 위치 정보를 성공적으로 수집하였을 때, call-back하는 함수
 * @param {웹 브라우저에서 수집한 사용자의 현재 위치정보 (위도, 경도)} position 
 */

function locSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    let url = `${WEATHER_API_BASEURL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(result => {
        let weatherData = {
            'country': result.sys.country,
            'city': result.name,
            'icons': result.weather[0].main,
            'temp': result.main.temp,
            'feels_like': result.main.feels_like,
            'temp_max': result.main.temp_max,
            'temp_min': result.main.temp_min,
            'wind_speed': result.wind.speed,
            'humidity': result.main.humidity
        }

        Object.keys(weatherData).forEach((key, index) => {
            let keys = document.createElement('div');
            let values = document.createElement('span');
            keys.id = key;
            if (index > 2) {
                let iClass = document.createElement('i');
                switch (key) {
                    case 'wind_speed':
                        iClass.className = format.others[key];
                        iClass.style.marginRight = '5px';
                        values.innerText = `${Math.round(weatherData[key])}m/s`;
                        others.appendChild(keys);
                        keys.append(iClass, values);
                        break;
                    case 'humidity':
                        iClass.className = format.others[key];
                        iClass.style.marginRight = '5px';
                        values.innerText = `${weatherData[key]}%`;
                        others.appendChild(keys);
                        keys.append(iClass, values);
                        break;
                    default:
                        switch (key) {
                            case 'temp':
                                keys.innerText = `${Math.round(weatherData[key])}℃`;
                                weatherTemps.appendChild(keys);
                                break;
                            case 'feels_like':
                                keys.innerText = `(체감 : ${Math.round(weatherData[key])}℃)`;
                                weatherTemps.appendChild(keys);
                                break;
                            default:
                                iClass.className = format.others[key];
                                iClass.style.marginRight = '5px';
                                values.innerText = `${Math.round(weatherData[key])}℃`;
                                weatherOtherTemps.appendChild(keys);
                                keys.append(iClass, values);
                                break;
                        }
                        break;
                }
            }
            else {
                let iClass = document.createElement('i');
                switch (key) {
                    case 'country':
                        iClass.style.margin = '0 10px';
                        iClass.className = 'fa-solid fa-location-dot';
                        keys.style.margin = '0 5px';
                        keys.innerText = `${format.country[weatherData[key]]}`;
                        weatherLocation.append(iClass, keys, '/ ');
                        break;
                    case 'city':
                        keys.style.margin = '0 5px';
                        keys.innerText = format.city[weatherData[key]];
                        weatherLocation.appendChild(keys);
                        break;
                    case 'icons':
                        const iconImage = document.createElement('img');
                        iconImage.src = `./assets/images/icons/${format.weather[weatherData[key]]}.gif`;
                        weatherIcon.appendChild(iconImage);
                        break;
                }
            }

        });
    });

}


/**
 * 웹 브라우저에서 다양한 이유로 사용자의 위치 정보를 찾을 수 없을 때, call-back하는 함수
 */
function locFailure() {
    alert('현재 위치를 찾을 수 없습니다.');
}

const options = {
    enableHighAccuracy: false,
    maximumAge: Infinity,
}

navigator.geolocation.getCurrentPosition(locSuccess, locFailure, options);


/**
 * weather-section을 클릭했을 때, 살짝 위로 올라오면서 주요 정보 외에 부가적인 정보가 보여지게 된다.
 */
function clickHandler() {
    weatherSection.classList.toggle('showAll');
}

weatherSection.addEventListener('click', clickHandler);