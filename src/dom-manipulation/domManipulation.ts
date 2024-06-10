import { DayOfWeek, WeatherIcon, WeatherIcontype, WeatherResponse } from "../model/weatherResponse";
import Toast from 'typescript-toastify';

export const buttonClick = document.getElementById("button-location");
const container = document.getElementById("container");
const WeatherIconPng = document.getElementById("weather-icon");
const dateDayName = document.getElementById('date-dayname');
const dateDay = document.getElementById('date-day');
const locationText = document.getElementById('location-text');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const textTempMax = document.getElementById('text-temp-max');
const textTempMin = document.getElementById('text-temp-min');
const textHumidity = document.getElementById('text-humidity');
const textWind = document.getElementById('text-wind');
const spinner = document.getElementById('spinner');

export function updateInterface(data: WeatherResponse): void {
    dateDayName!.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    dateDay!.innerText = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    locationText!.innerText = data.name ?? 'Unknown location'; // Proporcionar un valor por defecto
    (WeatherIconPng as HTMLImageElement).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherTemp!.innerText = `${Math.round(data.main.temp)} ºC`;
    weatherDesc!.innerText = data.weather[0].description;
    textTempMax!.innerText = `${Math.round(data.main.temp_max)} ºC`;
    textTempMin!.innerText = `${Math.round(data.main.temp_min)} ºC`;
    textHumidity!.innerText = `${data.main.humidity} %`;
    textWind!.innerText = `${data.wind.speed} m/s`;
}

// Obtener la ciudad desde el campo de entrada
export function getCity(): string {
    return (document.getElementById('weather-location-input') as HTMLInputElement).value || '';
}

function getDayOfWeek(): string {
    let day = new Date();
    return DayOfWeek[day.getDay()];
}

function getDate(): string {
    let date = new Date();
    return date.toLocaleDateString("es-ES");
}

function changeWeatherIcon(weatherImageRef: string) {
    const weatherMap = [weatherImageRef];
    validateImage(weatherMap);
    const mappedWeather = weatherMap.map(weather => WeatherIcon[weather])[0] ?? WeatherIcon["01d"];
    if (typeof mappedWeather === "string") {
        (WeatherIconPng as HTMLImageElement).src = mappedWeather;
    }
}

function validateImage(values: string[]): asserts values is WeatherIcontype[] {
    if (!values.every(isValidImage)) {
        throw Error('invalid image');
    }
}

function isValidImage(value: string): value is WeatherIcontype {
    return value in WeatherIcon;
}

export function showSpinner(): void {
    if (spinner && container) {
        spinner.style.display = 'block';
        container.style.display = 'none';
    }
}

export function hideSpinner(): void {
    if (spinner && container) {
        spinner.style.display = 'none';
        container.style.display = 'block';
    }
}

export function showSuccessMessage(message: string): void {
    new Toast({
        position: "top-right",
        toastMsg: message,
        autoCloseTime: 2000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "success",
        theme: "light"
      });
}

export function showErrorMessage(message: string): void {
    new Toast({
        position: "top-right",
        toastMsg: message,
        autoCloseTime: 2000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: "light"
      });
}
