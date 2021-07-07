import {arabicToAncientRus} from "./rusCount.js";

input.oninput = function() {
    result.innerHTML = Number.isNaN(Number(input.value)) ? "НЕКОРРЕКТНЫЙ ВВОД" : 
                                                   arabicToAncientRus(Number(input.value)); 
    zeroes.innerHTML = `<strong>КОЛИЧЕСТВО ДЕСЯТИЧКОВ</strong> ${input.value.length > 1 ? input.value.length - 1 : 0}`;
};


setInterval(() => {
    let currentDate = new Date();
    let [hours, minutes, seconds] = [currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()];
    if (String(hours).length < 2) hours = `0${hours}`;
    if (String(minutes).length < 2) minutes = `0${minutes}`;
    if (String(seconds).length < 2) seconds = `0${seconds}`;
    normalClock.innerHTML = `${hours}:${minutes} ${seconds}`;
    let ancientRusClockString = '';
    ancientRusClockString += `${arabicToAncientRus(+hours)} <strong>ЧАСОВ</strong> `;
    ancientRusClockString += `${arabicToAncientRus(+minutes)} <strong>МИНУТ</strong> `;
    ancientRusClockString += `${arabicToAncientRus(+seconds)} <strong>СЕКУНД</strong> `;
    ancientRusClock.innerHTML = ancientRusClockString;
}, 1000)

