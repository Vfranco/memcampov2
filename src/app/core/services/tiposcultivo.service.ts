import { TipoCultivo } from '@app/core/interface/tipocultivo.interface';
import { collections } from './../constants/constants';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class TiposcultivoService {

	private itemsCollection: AngularFirestoreCollection<any>;

	constructor(private db: AngularFirestore) { }

	getTiposCultivo() {
		return this.db.collection(collections.TIPOS_DE_CULTIVO).snapshotChanges().pipe(map((data => {
			console.log(data);
			let tipos: TipoCultivo[] = [];
			let objeto: any;
			data.forEach(element => {
				objeto = element.payload.doc.data();
				let keys = Object.keys(objeto.tipos_cultivos);
				Object.values(objeto.tipos_cultivos).forEach((element, i) => {
					element['id'] = keys[i];
					tipos.push(element);
				})
			});
			return { tiposA: tipos, tiposB: objeto.tipos_cultivos };
		})));
	}

	async getTiposCultivoPromesa() {
		let tipos: Array<TipoCultivo> = [];
		let tipo: any = {};
		var data = await this.db.collection(collections.TIPOS_DE_CULTIVO).get().toPromise();
		data.forEach(info => {
			tipo = info.data();
			tipo['id'] = info.id;
			let keys = Object.keys(tipo.tipos_cultivos);
			Object.values(tipo.tipos_cultivos).forEach((element, i) => {
				element['id'] = keys[i];
				tipos.push(element);
			})
		});
		return { tiposA: tipos, tiposB: tipo.tipos_cultivos };
	}

	updateTipoCultivo(formData) {
		this.itemsCollection = this.db.collection<any>(collections.TIPOS_DE_CULTIVO);
		return this.itemsCollection.doc('xWa6O0JlM2b9VbinhMgD').update(formData);
	}
}
