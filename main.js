

const inputEl = document.querySelector('#input-date')
const stop = document.querySelector('#stopBtn')
const start = document.querySelector('#startBtn')
const divEl = document.querySelector('#countdown')
const divClock = document.querySelector('#clock')

let timerId = null

const holidayName = "моего дня рождения";
const weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];



function pad(n) {
  return String(n).padStart(2, "0");
}



function updateClock(){
    const now = new Date();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

divClock.textContent = `${hours}:${minutes}:${seconds}`

}

start.addEventListener('click', () => {
    if(timerId !== null) return;

    if(!inputEl.value){
        divEl.textContent = 'Выберите дату!'
        return
    }

    const date = new Date(inputEl.value)

    function updateTimer(){
        const diff = date - new Date()
        if(diff <= 0){
            clearInterval(timerId)
            timerId = null
            divEl.textContent = 'Дата уже прошла!'
            return;
        }

    const days = Math.floor(diff / (1000 * 60 * 60 *24))
    const hour = Math.floor((diff / (1000 * 60 *60)) % 24)
    const minut = Math.floor((diff / 1000 * 60) % 60)
    const second = Math.floor((diff / 1000) % 60)
  
    
if(diff < 1000 * 60 * 60 * 24){
    divEl.style.color = 'red';
}else {
    divEl.style.color = 'black';

}

const dayName = weekDays[date.getDay()];

divEl.textContent = `До ${holidayName} (${dayName}): Дней: ${days}, часов: ${hour}, минут: ${minut}, секунд: ${second}`;

}
    

updateTimer();  

timerId = setInterval(updateTimer, 1000);


})

updateClock();  

setInterval(updateClock, 1000);

stop.addEventListener('click', () => {
    clearInterval(timerId)
    timerId = null
})