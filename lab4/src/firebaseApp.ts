import firebase from 'firebase';
import {firebaseConfig} from './config';
import {Interface} from './interface';




class AppFirestorageStorage  implements Interface.IAppStorage{
    private static instance: Interface.IAppStorage;
    db: firebase.firestore.Firestore;
    
    private constructor() { 
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        this.db = firebaseApp.firestore();
    }

    public static getInstance(): Interface.IAppStorage {
        if (!AppFirestorageStorage.instance) {
            AppFirestorageStorage.instance = new AppFirestorageStorage();
        }

        return AppFirestorageStorage.instance;
    }

    saveData: (data: Interface.INote) => Promise<Interface.INote[]>;
    removeFromLocalStorage: (id: number) => Promise<Interface.INote[]>;
    getData: () => Promise<Interface.INote[]>;
    
}