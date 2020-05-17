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
					data['idDocument'] = document.payload.doc.id;

					return data;
				})
			})
		);
	}

	readCollectionByUserId(collection, uid) : Observable<any> {
		this.itemsCollection = this.firestore.collection(collection, ref => ref.where('id_usuario', '==', uid));

		return this.itemsCollection.snapshotChanges().pipe(
			map(col => {
				return col.map(document => {
					const data = document.payload.doc.data();
					data['idDocument'] = document.payload.doc.id;
					return data;
				});
			})
		);
	}

	readCollectionWhere(collection, field, expression, value) : Observable<any> {
		this.itemsCollection = this.firestore.collection(collection, ref => ref.where(field, expression, value));

		return this.itemsCollection.snapshotChanges().pipe(
			map(col => {
				return col.map(document => {
					const data = document.payload.doc.data();
					data['idDocument'] = document.payload.doc.id;
					return data;
				});
			})
		);
	}
}
