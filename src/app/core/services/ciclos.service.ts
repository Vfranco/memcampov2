import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { collections } from './../constants/constants';
import { map } from 'rxjs/operators';

@Injectable()
export class CiclosService {

	constructor(
		private db: AngularFirestore,
		private storage: AngularFireStorage) { }

	getCiclos() {
		return this.db.collection(collections.CICLOS_DE_VIDA).snapshotChanges().pipe(map((data: any) => {
			let ciclos: string[] = [];
			data.forEach(element => {
				let data = element.payload.doc.data();
				data['id'] = element.payload.doc.id;
				ciclos.push(data);
			});
			return ciclos;
		}));
	}

	getCicloById(id: string) {
		return this.db.doc(`${collections.CICLOS_DE_VIDA}/${id}`).valueChanges();
	}

	createCiclo(formData: Object) {
		return this.db.collection(collections.CICLOS_DE_VIDA).add(formData);
	}

	deleteCiclo(id: string) {
		return this.db.collection(collections.CICLOS_DE_VIDA).doc(id).delete();
	}

	updateCiclo(formData: Object, id: string) {
		return this.db.collection(collections.CICLOS_DE_VIDA).doc(id).update(formData);
	}

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
