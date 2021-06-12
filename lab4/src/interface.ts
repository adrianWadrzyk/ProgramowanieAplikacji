export module Interface{

    export interface INote{ 
        title: string;
        description: string;
        date : string;
        colorBackground: string;
        colorText: string;
        isPined : boolean;
        id: any;
        idFromBase?:string;
    }

    export interface INotes { 
        notesList: Array<INote>;
    }

    export interface IAppStorage {
        saveData: (data: INote) => Promise<INote[]>;
        removeFromLocalStorage: (id: INote['id']) => Promise<void>,
        getData: () => Promise<INote[]>
    }
}