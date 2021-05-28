export module Interface{

    export interface INote{ 
        title: string;
        description: string;
        date : string;
        isPined : boolean;
        id: number;
    }

    export interface INotes { 
        notesList: Array<INote>;
    }

}