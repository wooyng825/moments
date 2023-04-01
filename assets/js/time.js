const dateSection = document.querySelector('div#date-section');
const timeSection = document.querySelector('div#time-section');
const date = document.createElement('span');
const day = document.createElement('span');

const days = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
}


const now = new Date();
const formatDate = Intl.DateTimeFormat('kr', { dateStyle: 'medium' }).format(now);
const formatDay = days[now.getDay()];
date.id = 'date';
date.innerText = formatDate;
day.id = 'day';
day.innerText = formatDay;
switch (formatDay) {
    case 'SAT':
        day.style.color = 'blue';
        break;
    case 'SUN':
        day.style.color = 'red';
        break;
    default:
        day.style.color = 'black';
        break;
}
dateSection.append(date, day);

function timeHandler() {
    const now = new Date();
    let hour = String(now.getHours()).padStart(2, 0);
    let minute = String(now.getMinutes()).padStart(2, 0);
    let second = String(now.getSeconds()).padStart(2, 0);
    let formatTime = `${hour} : ${minute} : ${second}`;

    timeSection.innerText = formatTime;
}

timeHandler();
setInterval(timeHandler, 1000);