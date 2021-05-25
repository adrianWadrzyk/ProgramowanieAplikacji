import  {Note} from './note';
import {Notes} from './notes';
export class App {
    button: HTMLElement;
    Notes : Notes = new Notes;

    constructor() {
       this.button = document.getElementById("createNote");
       this.bindButton();
    }

    bindButton() { 
        this.button.addEventListener("click", this.createNote);
    }       

    // użycie funkcji strzałkowej ze względu na zmieniający się kontekst this ( w innym przypadku this wskazuje na button)
    createNote = () => { 
        const title = (<HTMLInputElement>document.getElementById("title")).value;
        const description =(<HTMLInputElement>document.getElementById("description")).value;
        const note = new Note(title, description);
        note.createView();
        this.addNoteToList(note);
    }

    addNoteToList(note: Note) { 
        this.Notes.addNote(note);
        this.Notes.listNote();
    }

   
}

