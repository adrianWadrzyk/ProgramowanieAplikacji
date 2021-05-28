import  {Note} from './note';
import {Notes} from './notes';
import {AppStorage} from './AppStorage';
export class App {
    button: HTMLElement;
    Notes : Notes = new Notes;
    AppStorage : AppStorage = new AppStorage;
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
        const note = new Note(title, description, ++this.id);
        note.createView();
        this.bindDelete(note);
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
             const noteFromAppStorage = new Note(note.title, note.description, note.id);
             this.bindDelete(noteFromAppStorage);
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
}

