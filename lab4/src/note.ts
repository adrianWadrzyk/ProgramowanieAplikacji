import { Interface} from './interface'
import { AppFirestorageStorage } from './firebaseApp';
import { AppStorage } from './AppStorage';
import { local } from './config';
import { App } from './app';
export class Note implements Interface.INote{
    title: string;
    description: string;
    date : string;
    isPined : boolean;
    colorBackground: string;
    colorText: string;
    id: number;
    idFromBase: string;

    constructor(title: string, descrpition: string, id:number, colorBackground: string, colorText:string, isPined: boolean, idFromBase ="null") {
       this.title = title;
       this.description = descrpition;
       this.date = this.createDate();
       this.isPined = isPined;
       this.colorBackground = colorBackground;
       this.colorText = colorText;
       this.id = id;
       this.idFromBase = idFromBase;
    }
    
    createDate() : string { 
        const date = new Date();
        const now:string = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
        return now;
    }

    pinNote() : void { 
        this.isPined = true;
    }

    createView(): void { 
        const noteBlock: HTMLElement = document.createElement("div");

        noteBlock.style.backgroundColor = this.colorBackground;
        noteBlock.style.color = this.colorText;
        noteBlock.classList.add("noteBlock");
        
        const title: HTMLElement = document.createElement("p");
        const description: HTMLElement = document.createElement("p");
        const date: HTMLElement = document.createElement("p");
        const conteiner: HTMLElement = document.getElementById("conteiner");
        const conteinerPinned: HTMLElement = document.getElementById("conteinerPinned");
        const deleteButton: HTMLElement = document.createElement("button");
        const pinButton: HTMLElement = document.createElement("button");

        const imageDelete: HTMLImageElement = document.createElement("img");
        imageDelete.src = "icons/trash.svg";
        imageDelete.alt = "trashIcon";

        const imagePin: HTMLImageElement = document.createElement("img");
        imagePin.src = "icons/office-push-pin.svg";
        imagePin.alt = "pinIcon";
        

        noteBlock.dataset.noteId = `${this.id}`;
        noteBlock.dataset.idFromBase = `${this.idFromBase}`;

        title.textContent = this.title;

        description.textContent = this.description;
        description.classList.add("noteDescription");

        date.textContent = this.date;
        date.classList.add("date");

        deleteButton.dataset.buttonDeleteId = `${this.id}`;
        deleteButton.classList.add("deleteButton");

        pinButton.dataset.buttonPinId = `${this.id}`;
        pinButton.classList.add("pinButton");

        if(this.isPined)
        {
            conteinerPinned.prepend(noteBlock);
        } else {
            conteiner.appendChild(noteBlock);
        }
        noteBlock.appendChild(title);
        noteBlock.appendChild(description);
        noteBlock.appendChild(date);
        noteBlock.appendChild(deleteButton);
        deleteButton.appendChild(imageDelete);
        noteBlock.appendChild(pinButton);
        pinButton.appendChild(imagePin);
        noteBlock.addEventListener("click", (e) => {this.editNote(this, e )});
    }

    // Funkcje stworzone na potrzeby testów JEST.
    checkTitle(title: string) : string{ 
        if(title.length == 0) 
            return "Nie może być pusty";
    }

    editNote(note : Interface.INote, e : Event) {
        let editing = true;
        const app = new App(true, note.id);
        const optionWrapper : HTMLElement= document.querySelector(".optionWrapper");
        optionWrapper.style.display = "flex";   
        const textInput = document.querySelector("#title")
        textInput.textContent = note.title;
        const desc = document.querySelector("#description")
        desc.textContent = note.description;
        const pinn = <HTMLInputElement> document.querySelector("#pinned");
        pinn.checked = note.isPined ? true : false;
        const color = <HTMLInputElement> document.querySelector(`input[value="${note.colorBackground}"]`);
        color.checked = true;
        
        const buttonCreate = document.getElementById("createNote");
        buttonCreate.style.display = "none";

        const buttonEdit = document.getElementById("editNote");
        buttonEdit.style.display = "block";

        const colorBackground = (<HTMLInputElement>document.querySelector('input[name="note-color"]:checked')).value;
        const cancelButton = document.querySelector("#cancel");

        cancelButton.addEventListener("click" , ()=> {
            buttonCreate.style.display = "block"; 
        })

        const afterEditing  = () =>  { 
            buttonCreate.style.display = "block";
            buttonEdit.style.display = "none";
            optionWrapper.style.display = "none";
            app.createNote();
        }

        buttonEdit.addEventListener("click", () => { 
            if(editing) {
                if(local) { 
                    const AppStor : AppStorage = AppStorage.getInstance();
                    AppStor.removeFromLocalStorage(note.id);
                    afterEditing()
                } else { 
                    const AppStor  = AppFirestorageStorage.getInstance();
                    AppStor.removeFromLocalStorage(note.idFromBase);
                    afterEditing()
                }
            }
        })



    }

    
}

