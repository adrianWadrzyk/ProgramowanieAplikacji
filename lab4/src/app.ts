import  {Note} from './note';

export class App {
    button: HTMLElement;
    constructor() {
       this.button = document.getElementById("createNote");
       this.bindButton();
    }

    bindButton() { 
        this.button.addEventListener("click", this.createNote);
    }       

    createNote() { 
        const title = (<HTMLInputElement>document.getElementById("title")).value;
        const description =(<HTMLInputElement>document.getElementById("description")).value;
        const note = new Note(title, description);
        note.log();
    }
}

