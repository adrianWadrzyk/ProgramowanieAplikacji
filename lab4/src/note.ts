import { Interface} from './interface'
export class Note implements Interface.INote{
    title: string;
    description: string;
    date : string;
    isPined : boolean;
    colorBackground: string;
    colorText: string;
    id: number;
    conteiner: HTMLElement = document.getElementById("conteiner");
    deleteButton: HTMLElement = document.createElement("button");
    pinButton: HTMLElement = document.createElement("button");

    constructor(title: string, descrpition: string, id:number, colorBackground: string, colorText:string, isPined?: boolean) {
       this.title = title;
       this.description = descrpition;
       this.date = this.createDate();
       this.isPined = isPined;
       this.colorBackground = colorBackground;
       this.colorText = colorText;
       this.id = id;
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

        noteBlock.dataset.noteId = `${this.id}`;
        title.textContent = this.title;
        description.textContent = this.description;
        date.textContent = this.date;

        this.pinButton.classList.add("deleteButton");
        this.deleteButton.textContent = "Delete this note";

        this.pinButton.classList.add("pinButton");
        this.pinButton.textContent = "Pin this note";

        if(this.isPined)
        {
            this.conteiner.prepend(noteBlock);
        } else {
            this.conteiner.appendChild(noteBlock);
        }
        noteBlock.appendChild(title);
        noteBlock.appendChild(description);
        noteBlock.appendChild(date);
        noteBlock.appendChild(this.deleteButton);
        noteBlock.appendChild(this.pinButton);

    }

    

}

