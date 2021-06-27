import  {Note} from './note';
import {AppStorage} from './AppStorage';
import {AppFirestorageStorage} from './firebaseApp';
import {local} from './config';
import {Interface} from './interface';
import { Touchscreen } from 'puppeteer';
export class App {
    button: HTMLElement;
    AppStorage : AppStorage = AppStorage.getInstance();
    AppFirestorageStorage = AppFirestorageStorage.getInstance();
    id : number = 0;

    constructor(editing : boolean , id ?  : number ) {
       this.button = document.getElementById("createNote");
       if(editing == false)
            {
                this.bindButton();  
            } 
       this.checkStorage();
    }

    bindButton() { 
        this.button.addEventListener("click", this.createNote);
    }       

    // użycie funkcji strzałkowej ze względu na zmieniający się kontekst this ( w innym przypadku this wskazuje na button)
     createNote = () => { 
        (<HTMLElement>document.querySelector(".optionWrapper")).style.display = "none";
        const title = (<HTMLInputElement>document.getElementById("title")).value;
        const description =(<HTMLInputElement>document.getElementById("description")).value;
        const colorBackground = (<HTMLInputElement>document.querySelector('input[name="note-color"]:checked')).value;
        const pinned = (<HTMLInputElement>document.querySelector('#pinned')).checked;
        const note = new Note(title, description, ++this.id, colorBackground, "#e7e7e7", pinned);
        console.log(note);
        if(local)
            this.saveToLocalStorage(note);
        else 
            this.saveToFireBase(note);
            
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
        const conteiner = document.getElementById("conteiner");
        const conteinerPinned = document.getElementById("conteinerPinned");
        conteinerPinned.innerHTML="";
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

       bindDelete( note : Note ) { 
        const deleteButtons = document.querySelectorAll(`[data-button-delete-id="${note.id}"]`);
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener("click",  async (e) => { 
                e.stopPropagation();
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
            pinButton.addEventListener("click",  async (e) => {
            e.stopPropagation();
            note.isPined = !note.isPined;
            console.log(note.isPined);
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

