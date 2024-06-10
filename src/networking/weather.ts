import { API_CURRENT, API_KEY } from "../helpers/constants";
import { WeatherResponse } from "../model/weatherResponse";

export async function getWeatherData(city: string): Promise<WeatherResponse> {
    try{
       return await callApi(`${API_CURRENT}//weather?q=${city}&appid=${API_KEY}&units=metric`);  
    } catch(e:any){
        throw new Error(e.message);
    }
}

async function callApi(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error ('There was a problem with the fetch operation'); 
    }
}
