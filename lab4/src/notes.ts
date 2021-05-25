import { Note } from "./note";

export class Notes { 
    notesList: Array<Note> = [];

    addNote(note: Note) { 
        this.notesList.push(note);
    }

    listNote() { 
        console.log(...this.notesList)
    }
}