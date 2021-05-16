export class Note {
    title: string;
    description: string;

    constructor(title: string, descrpition: string) {
       this.title = title;
       this.description = descrpition;
    }
    
    log() { 
        console.log(this.title);
    }
}
