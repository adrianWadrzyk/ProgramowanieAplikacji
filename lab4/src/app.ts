import  {Note} from './note';
import {AppStorage} from './AppStorage';
import {AppFirestorageStorage} from './firebaseApp';
import {local} from './config';
import {Interface} from './interface';
export class App {
    button: HTMLElement;
    AppStorage : AppStorage = AppStorage.getInstance();
    AppFirestorageStorage = AppFirestorageStorage.getInstance();
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
        if(local)
            this.saveToLocalStorage(note);
        else 
            this.saveToFireBase(note);

        this.checkLocalStorage();
        this.bindDelete(note);
        this.bindPin(note);
    }

    saveToLocalStorage(note : Note) { 
        this.AppStorage.saveData(note);
    }

    saveToFireBase(note: Note) { 
        this.AppFirestorageStorage.saveData(note);
    }

    checkLocalStorage() { 
        const conteiner = document.getElementById("conteiner");
        conteiner.innerHTML="";
        let data: Promise<Interface.INote[]>;
        if(local)
             data = this.AppStorage.getData();
        else 
             data = this.AppFirestorageStorage.getData();
        if(data) {
         data.then( res => 
            {
            res.forEach(note => {
             const noteFromAppStorage = new Note(note.title, note.description, note.id, note.colorBackground, note.colorText, note.isPined, note.idFromBase);
             noteFromAppStorage.createView();
             this.bindDelete(noteFromAppStorage);
             this.bindPin(noteFromAppStorage);
             if(local)
                this.id = note.id;
            })});
        }
    }

       bindDelete( note : Note) { 
        const deleteButtons = document.querySelectorAll(".deleteButton");
        deleteButtons.forEach(deleteButton => {
            console.log(deleteButton);
            deleteButton.addEventListener("click", (e) => { 
            if(local)
                this.AppStorage.removeFromLocalStorage(note.id);
            else 
                this.AppFirestorageStorage.removeFromLocalStorage(note.idFromBase)
            const conteiner = document.getElementById("conteiner");
            conteiner.innerHTML="";
            this.checkLocalStorage();
        })
        })
    }

    bindPin(note: Note) { 
        const pinButtons = document.querySelectorAll(".pinButton");
        pinButtons.forEach(pinButton => {
            pinButton.addEventListener("click", (e) => {
            note.isPined = true;
            this.AppStorage.removeFromLocalStorage(note.id);
            this.AppStorage.saveData(note);
            const conteiner = document.getElementById("conteiner");
            conteiner.innerHTML = "";
            this.checkLocalStorage();
        })
    });

    }
}

