import { App } from './app';
import { Controler } from './viewContoller';
import './main.scss';

let app = new App(false);
let controller = new Controler();
controller.bindButtons();
