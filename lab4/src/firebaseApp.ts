import firebase from 'firebase';
import {firebaseConfig} from './config';
import {Interface} from './interface';
export class AppFirestorageStorage  implements Interface.IAppStorage{
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

   async removeFromLocalStorage(id: string) { 
        await this.db.collection('notes').doc(id).delete();
        return Promise.resolve();
    };

    async getData() {
           const res = await this.db.collection('notes').get().then(res => ({
            data: res.docs.map((res) => ({
                data: res.data(),
                id: res.id
            }))
        }));

        // assign firebase ID to use in front-end
        console.log(res);
        const data = res.data.map((note) => ({
            ...note.data,
            idFromBase: note.id,
        }));
        
        return Promise.resolve(data as Interface.INote[]);
    };

}