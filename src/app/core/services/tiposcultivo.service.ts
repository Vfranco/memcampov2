import { collections } from './../constants/constants';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class TiposcultivoService {

	constructor(private db: AngularFirestore) { }

	getTiposCultivo() {
		return this.db.collection(collections.TIPOS_DE_CULTIVO).get().pipe(map((data => {
			let tipos;
			data.docs.forEach(element => {
				tipos = element.data().tipos_cultivos;
			});
			return tipos;
		})));
	}
}
