import { Interface } from "./interface";
export class Notes implements Interface.INotes { 
    notesList: Array<Interface.INote> = [];

    addNote(note: Interface.INote) { 
        this.notesList.push(note);
    }

    deleteNotes(e : Event) { 
        console.log(e);
    }

    listNote() { 
        console.log(...this.notesList)
    }


}

