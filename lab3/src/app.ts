export class App {
    opwApiKey = '50d53005c0fd5f556bb4ef15224c4209';
    constructor() {
        const button = document.getElementById("find");
        button.addEventListener("click", () => {
            const inputElement = (<HTMLInputElement>document.getElementById("city")).value;
            this.getCityInfo(inputElement);
        });

        let storage = this.getData();
        if(storage.length) 
            this.getCityInfo(storage);
    }

    async getCityInfo(city: string) {
        const weather = await this.getWeather(city);
        this.saveData(weather);
        this.generateWeatherView(weather);
    }

    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    generateWeatherView(data : any) { 
        let div = document.createElement("div");
        let spanWeatherStatus = document.createElement("span");
        let p = document.createElement("p");
        let spanTemp = document.createElement("span");
        div.classList.add("container");
        document.querySelector(".container-weather").appendChild(div);
        spanWeatherStatus.textContent = data.name;
        p.textContent = data.weather[0].description;
        spanTemp.textContent = Math.round(data.main.temp - 273).toString() + "°C";
        div.appendChild(spanWeatherStatus);
        div.appendChild(p);
        div.appendChild(spanTemp);
    }

    saveData(data: any) {
        localStorage.setItem('weatherData', JSON.stringify(data.name));
    }

    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }
}