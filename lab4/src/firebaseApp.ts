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

    async saveData (data : Interface.INote) { 
        const res = await this.db.collection('notes').add({...data});
        return Promise.resolve([]);
    }

    removeFromLocalStorage: (id: number) => Promise<Interface.INote[]>;

    async getData() {
        const res = await this.db.collection('notes').get().then(res => ({
            data: res.docs.map((res) => res.data())
        }));
        const data = res.data as Interface.INote[];
        return Promise.resolve(data);
    };

    async getAllTagsStorage() {
        const notes = await this.getData();
        const tags = notes.flatMap((v) => v.tags);

        return Promise.resolve(tags);
    }
}