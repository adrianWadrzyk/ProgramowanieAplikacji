import { Note } from "../../src/note";
import {AppStorage} from '../../src/AppStorage';

describe('Note', () => {
    it('noTitle', () => {
       const note = new Note("", "",1,"red","black",false);
       const res = note.checkTitle(note.title);
       expect(res).toBe("Nie może być pusty");
    });
})

describe('FullNote', ()=> { 
    let storage : AppStorage = AppStorage.getInstance();
    const note = new Note("First", "Second", 1, "red", "black", false);
    it("createNote", () => { 
        expect.objectContaining({
            id: 1,
            title: "First", 
            description: "Second",
            colorBackground :"red",
            colorText : "black",
            isPined: false
        });
    });

    it("add Note", () => { 
    storage.saveData(note).then(() => {
        const localItems = JSON.parse(localStorage.getItem('notesList'));
        expect(localItems).toHaveLength(3);
    })
    })

    it("remove Note", () => { 
        storage.removeFromLocalStorage(note).then(() => {
            const localItems = JSON.parse(localStorage.getItem('notesList'));
            expect(localItems).toHaveLength(2);
        })
    })

     it("check listsNote", () => { 
            storage.getData().then((res) => {
                expect(res).toHaveLength(2);
        })
    })    
});

