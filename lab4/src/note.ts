import { Interface} from './interface'
export class Note implements Interface.INote{
    title: string;
    description: string;
    date : string;
    isPined : boolean;
    colorBackground: string;
    colorText: string;
    id: number;
    idFromBase: string;

    constructor(title: string, descrpition: string, id:number, colorBackground: string, colorText:string, isPined: boolean = false, idFromBase ="null") {
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

    log() { 
        console.log(this.title);
        console.log(this.description);
        console.log(this.date);
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
        const deleteButton: HTMLElement = document.createElement("button");
        const pinButton: HTMLElement = document.createElement("button");

        noteBlock.dataset.noteId = `${this.id}`;
        noteBlock.dataset.idFromBase = `${this.idFromBase}`;
        title.textContent = this.title;
        description.textContent = this.description;
        date.textContent = this.date;

        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete this note";
        deleteButton.dataset.buttonDeleteId = `${this.id}`;
        pinButton.dataset.buttonPinId = `${this.id}`;

        pinButton.classList.add("pinButton");
        pinButton.textContent = "Pin this note";

        if(this.isPined)
        {
            conteiner.prepend(noteBlock);
        } else {
            conteiner.appendChild(noteBlock);
        }
        noteBlock.appendChild(title);
        noteBlock.appendChild(description);
        noteBlock.appendChild(date);
        noteBlock.appendChild(deleteButton);
        noteBlock.appendChild(pinButton);

    }

    

}

