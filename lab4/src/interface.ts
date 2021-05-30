export module Interface{

    export interface INote{ 
        title: string;
        description: string;
        date : string;
        colorBackground: string;
        colorText: string;
        isPined : boolean;
        id: number;
    }

    export interface INotes { 
        notesList: Array<INote>;
    }

    export interface IAppStorage {
        saveData: (data: INote) => Promise<INote[]>;
        removeFromLocalStorage: (id: INote['id']) => Promise<INote[]>,
        getData: () => Promise<INote[]>
    }
}