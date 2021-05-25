export class Note {
    title: string;
    description: string;
    date : string;
    isPined : boolean;
    conteiner: HTMLElement = document.getElementById("conteiner");
    constructor(title: string, descrpition: string) {
       this.title = title;
       this.description = descrpition;
       this.date = this.createDate();
       this.isPined = false;
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
        const title: HTMLElement = document.createElement("p");
        const description: HTMLElement = document.createElement("p");
        const date: HTMLElement = document.createElement("p");

        title.textContent = this.title;
        description.textContent = this.description;
        date.textContent = this.date;

        this.conteiner.appendChild(title);
        this.conteiner.appendChild(description);
        this.conteiner.appendChild(date);
    }
}
