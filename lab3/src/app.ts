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
        console.log(data);
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        let h5 = document.createElement("h5");
        let spanTemp = document.createElement("span");
        document.querySelector("body").appendChild(div);
        h3.textContent = data.name;
        h5.textContent = data.weather[0].description;
        spanTemp.textContent = Math.round(data.main.temp - 273).toString();
        div.appendChild(h3);
        div.appendChild(h5);
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