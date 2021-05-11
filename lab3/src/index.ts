import { App } from './app';
import './main.scss';

const waetherConteiner = document.querySelector(".container-weather");
let app = new App();

setInterval( () => { 
    waetherConteiner.innerHTML = "";
    app = new App();
}, 120000)