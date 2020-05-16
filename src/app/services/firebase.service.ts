import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { collections } from 'src/app/constants/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {

	items : Observable<any[]>;
	private itemsCollection: AngularFirestoreCollection<any>;

	constructor(private firestore: AngularFirestore) { }

	storeData(collection, data){
		let obj = JSON.parse(JSON.stringify(data));
		return this.firestore.collection(collection).add(obj);
	}

	readCollection(collection) : Observable<any>{
		this.itemsCollection = this.firestore.collection(collection);

		return this.itemsCollection.snapshotChanges().pipe(
			map(col => {
				return col.map(document => {
					const data = document.payload.doc.data();
					data['id'] = document.payload.doc.id;

					return data;
				})
			})
		);
	}
}
