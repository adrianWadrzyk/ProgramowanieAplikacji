import  {Note} from './note';
import {Notes} from './notes';
import {AppStorage} from './AppStorage';
export class App {
    button: HTMLElement;
    Notes : Notes = new Notes;
    AppStorage : AppStorage = AppStorage.getInstance();
    id : number = 0;

    constructor() {
       this.button = document.getElementById("createNote");
       this.bindButton();  
       this.checkLocalStorage();
    }

    bindButton() { 
        this.button.addEventListener("click", this.createNote);
    }       

    // użycie funkcji strzałkowej ze względu na zmieniający się kontekst this ( w innym przypadku this wskazuje na button)
    createNote = () => { 
        const title = (<HTMLInputElement>document.getElementById("title")).value;
        const description =(<HTMLInputElement>document.getElementById("description")).value;
        const colorBackground = (<HTMLInputElement>document.getElementById("colorBackground")).value;
        const colorText = (<HTMLInputElement>document.getElementById("colorText")).value;
        const note = new Note(title, description, ++this.id, colorBackground, colorText);
        note.createView();
        this.bindDelete(note);
        this.bindPin(note);
        this.addNoteToList(note);
        this.saveToLocalStorage(note);
    }

    addNoteToList(note: Note) { 
        this.Notes.addNote(note);
        this.Notes.listNote();
    }

    saveToLocalStorage(note : Note) { 
        this.AppStorage.saveData(note);
    }

    checkLocalStorage() { 
        const data = this.AppStorage.getData();
        if(data) 
        {
         data.forEach(note => {
             const noteFromAppStorage = new Note(note.title, note.description, note.id, note.colorBackground, note.colorText, note.isPined);
             this.bindDelete(noteFromAppStorage);
             this.bindPin(noteFromAppStorage);
             noteFromAppStorage.createView();
             this.id = note.id;
         });
        }
    }

       bindDelete( note : Note) { 
        note.deleteButton.addEventListener("click", () => { 
            this.AppStorage.removeFromLocalStorage(note.id);
            const conteiner = document.getElementById("conteiner");
            conteiner.innerHTML="";
            this.checkLocalStorage();
        })
    }

    bindPin(note: Note) { 
        note.pinButton.addEventListener("click", () => { 
            note.isPined = true;
            this.AppStorage.removeFromLocalStorage(note.id);
            this.AppStorage.saveData(note);
            const conteiner = document.getElementById("conteiner");
            conteiner.innerHTML = "";
            this.checkLocalStorage();
        })
    }
}

