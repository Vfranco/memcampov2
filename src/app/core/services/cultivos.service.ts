import { collections } from '@app/core/constants/constants';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class CultivosService {

	private itemsCollection: AngularFirestoreCollection<any>;

	constructor(private db: AngularFirestore) { }

	getCultivos() {
		return this.db.collection(collections.CULTIVOS).snapshotChanges().pipe(map((data => {
			let cultivos: any[] = [];
			let objeto: any;
			data.forEach(element => {
				objeto = element.payload.doc.data();
				cultivos.push(objeto);
			});
			return cultivos;
		})));
	}
}
