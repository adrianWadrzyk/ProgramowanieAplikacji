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
       this.checkStorage();
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

        console.log(this.id);
        this.bindDelete(note);
        this.bindPin(note);
        this.checkStorage();
    }

    saveToLocalStorage(note : Note) { 
        this.AppStorage.saveData(note);
    }

    saveToFireBase(note: Note) { 
        this.AppFirestorageStorage.saveData(note);
    }

    checkStorage() { 
        console.log("Odświeżam...");
        const conteiner = document.getElementById("conteiner");
        conteiner.innerHTML="";
        let data: Promise<Interface.INote[]>;
        if(local){
            data =  this.AppStorage.getData();
        }
        else {
            data = this.AppFirestorageStorage.getData();
        }
        if(data) {
         data.then( res => {
            res.forEach(note => {
             note.id > this.id ? this.id = note.id : this.id;
             const noteFromAppStorage = new Note(note.title, note.description, note.id, note.colorBackground, note.colorText, note.isPined, note.idFromBase);
             noteFromAppStorage.createView();
             this.bindDelete(noteFromAppStorage);
             this.bindPin(noteFromAppStorage);
            })
        });
        }
    }

       bindDelete( note : Note) { 
        const deleteButtons = document.querySelectorAll(`[data-button-delete-id="${note.id}"]`);
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener("click",  async () => { 
            if(local)
                 await this.AppStorage.removeFromLocalStorage(note.id);
            else 
                await this.AppFirestorageStorage.removeFromLocalStorage(note.idFromBase)
          this.checkStorage();
        })
        })
    }

    bindPin(note: Note) { 
        const pinButtons = document.querySelectorAll(`[data-button-pin-id="${note.id}"]`);
        pinButtons.forEach(pinButton => {
            pinButton.addEventListener("click",  async () => {
            note.isPined = true;
            if(local){
                this.AppStorage.removeFromLocalStorage(note.id);
                this.AppStorage.saveData(note);
            }
             else {
                 await this.AppFirestorageStorage.removeFromLocalStorage(note.idFromBase)
                 await this.AppFirestorageStorage.saveData(note);
             }     

             this.checkStorage();
        })
    });
    }
}

