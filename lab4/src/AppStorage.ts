import { Interface } from "./interface";

export class AppStorage implements Interface.IAppStorage {
  private static instance: AppStorage;

  private constructor() { }

  public static getInstance(): AppStorage {
    if (!AppStorage.instance) {
      AppStorage.instance = new AppStorage();
    }

    return AppStorage.instance;
  }

  async saveData(data: Interface.INote) {
    const currentData = JSON.parse(
      localStorage.getItem("notesList")
    ) as Interface.INote[] ?? [];
      currentData.push(data);
      localStorage.setItem("notesList", JSON.stringify(currentData));
      return Promise.resolve(currentData);
  }

  async getData() {
    const notes = JSON.parse(
      localStorage.getItem("notesList")
    ) as Interface.INote[];
    return Promise.resolve(notes);
  }

  async removeFromLocalStorage(id: Interface.INote["id"]) {
    const notes = JSON.parse(
      localStorage.getItem("notesList")
    ) as Interface.INote[];
    notes.splice(
      notes.findIndex((e) => e.id === id, 1),
      1);
    console.log(notes);
    localStorage.setItem("notesList", JSON.stringify(notes));

    return Promise.resolve();
  }
}
