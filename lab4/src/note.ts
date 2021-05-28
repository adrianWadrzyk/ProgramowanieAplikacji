import { Interface} from './interface'
export class Note implements Interface.INote{
    title: string;
    description: string;
    date : string;
    isPined : boolean;
    conteiner: HTMLElement = document.getElementById("conteiner");
    deleteButton: HTMLElement = document.createElement("button");
    id: number;

    constructor(title: string, descrpition: string, id:number) {
       this.title = title;
       this.description = descrpition;
       this.date = this.createDate();
       this.isPined = false;
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

        const title: HTMLElement = document.createElement("p");
        const description: HTMLElement = document.createElement("p");
        const date: HTMLElement = document.createElement("p");
        
        noteBlock.dataset.noteId = `${this.id}`;
        title.textContent = this.title;
        description.textContent = this.description;
        date.textContent = this.date;
        this.deleteButton.id = "deleteButton";
        this.deleteButton.textContent = "Delete this note";
        
        this.conteiner.appendChild(noteBlock);
        noteBlock.appendChild(title);
        noteBlock.appendChild(description);
        noteBlock.appendChild(date);
        noteBlock.appendChild(this.deleteButton);
    }

}

