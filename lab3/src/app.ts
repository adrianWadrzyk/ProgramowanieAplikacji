export class App {
    opwApiKey = '50d53005c0fd5f556bb4ef15224c4209';
    city : string = "";
    constructor() {
        const button = document.getElementById("find");
        let storage = this.getData();
        button.addEventListener("click", e => {
            e.preventDefault();
            const inputElement = (<HTMLInputElement>document.getElementById("city")).value;
            if(storage.findIndex((val: string) => val == inputElement) == -1)
                this.getCityInfo(inputElement, true);
        });

        if(storage.length) {
            storage.forEach((cityName : string) => {
                this.getCityInfo(cityName, false);
            });
        }
    }

    async getCityInfo(city: string, save: boolean) {
        const weather = await this.getWeather(city);
        this.city = city
        if(save)
            this.saveData(this.city);
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
        let pressure = document.createElement("span");
        let humidity = document.createElement("span");
        let img = document.createElement("img");
        img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        pressure.textContent = (`${data.main.pressure} Mph`);
        pressure.classList.add("pressure");
        humidity.textContent = (`Wilgotność ${data.main.humidity}`);
        div.classList.add("container");
        document.querySelector(".container-weather").appendChild(div);
        spanWeatherStatus.textContent = data.name;
        p.textContent = data.weather[0].description;
        spanTemp.textContent = Math.round(data.main.temp - 273).toString() + "°C";
        div.appendChild(spanWeatherStatus);
        div.appendChild(p);
        div.appendChild(pressure);
        div.appendChild(humidity);
        div.appendChild(img);
        div.appendChild(spanTemp);
    }

    saveData(data: string) {        
        const currentData = this.getData();
        const index = currentData.findIndex((val : string) => val == data);
            if(index == -1) { 
                currentData.push(data);
                localStorage.setItem('weatherData', JSON.stringify(currentData));
                return;
            } 
    }

    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } else {
            return []
        }
    }
}

