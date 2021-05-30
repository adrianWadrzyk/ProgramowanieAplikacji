import {Interface} from './interface';

export class AppStorage implements Interface.IAppStorage{
  private static instance: AppStorage;

  private constructor(){};

  public static getInstance(): AppStorage { 
    if (!AppStorage.instance) {
      AppStorage.instance = new AppStorage();
    }

    return AppStorage.instance;
  }
  
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
    console.log(notes);
    notes.splice(notes.findIndex((e) => e.id === id, 1),1);
    localStorage.setItem('notesList', JSON.stringify(notes));
  }
  
}
