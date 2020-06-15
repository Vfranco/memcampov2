import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { collections } from './../constants/constants';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CiclosService {

	constructor(
		private db: AngularFirestore,
		private storage: AngularFireStorage) { }

	getCiclos() {
		return this.db.collection(collections.CICLOS_DE_VIDA).snapshotChanges().pipe(map((data: any) => {
			let ciclos: string[] = [];
			data.forEach(element => {
				ciclos.push(element.payload.doc.data());
			});
			return ciclos;
		}));
	}

	createCiclo(collection, formData) {
		return this.db.collection(collection).add(formData);
	}

	// Metodos para manejar el Storage.

	setImgCiclo(nombreCiclo: string, fileSelected: File, nameFile: string) {
		let ref = this.storage.ref(`ciclosvida/${nombreCiclo}`);
		return ref.child(nameFile).put(fileSelected);
	}

	getUrlImage(nombreCiclo: string, nameFile: string) {
		return this.storage.ref(`ciclosvida/${nombreCiclo}/${nameFile}`).getDownloadURL();
	}

	deleteImgCiclo(nombreCiclo: string, nameFile: string) {
		return this.storage.ref(`ciclosvida/${nombreCiclo}/${nameFile}`).delete();
	}
}
