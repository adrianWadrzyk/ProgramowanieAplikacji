import { App } from './app';
import { Controler } from './viewContoller';
import './main.scss';

let app = new App();
let controller = new Controler();
controller.bindButtons();
