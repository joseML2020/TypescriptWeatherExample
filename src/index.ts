// main.ts
import './styles/main.scss';
import { buttonClick, updateInterface, getCity, showSpinner, hideSpinner, showSuccessMessage, showErrorMessage } from './dom-manipulation/domManipulation';
import { getWeatherData } from './networking/weather';

export const displayWeather = async () => {
    const city = getCity();
    if (city) {
        showSpinner();
        try {
            const weather = await getWeatherData(city);
            updateInterface(weather);
            showSuccessMessage('Weather updated successfully');
        } catch (error) {
            console.error('Error fetching the weather data:', error);
            showErrorMessage('Error fetching the weather data');
        } finally {
            hideSpinner();
        }
    }
}

if (buttonClick) buttonClick.addEventListener("click", displayWeather);
