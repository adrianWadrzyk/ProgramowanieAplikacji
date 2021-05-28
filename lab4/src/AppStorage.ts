import {Interface} from './interface';

export class AppStorage {

  saveData(data: Interface.INote) {
    const currentData = this.getData();
    console.log(currentData);
    if (currentData != null) {
        currentData.push(data);
        localStorage.setItem('notesList', JSON.stringify(currentData));
        this.getData()
        return;
    }

    currentData.push(data);
    localStorage.setItem('notesList', JSON.stringify(currentData));
    this.getData()
}

  getData() {
    const notes = JSON.parse(localStorage.getItem('notesList')) as Array<Interface.INote>;
    if(notes)
      return notes;
    else 
      return [];
  }

  removeFromLocalStorage(id : Interface.INote['id']) { 
    const notes = this.getData();
    notes.splice(notes.findIndex((e) => e.id === id, 1),1);
    localStorage.setItem('notesList', JSON.stringify(notes));
  }
  
}
