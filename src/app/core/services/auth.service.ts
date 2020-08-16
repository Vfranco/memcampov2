import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { collections } from '../constants/constants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { AccountRegister } from '../models/registro.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private firestore: AngularFirestore,
		private firebase: AngularFireAuth,
		private route: Router,
		private localstorage: LocalstorageService) { }

	login(email, password): Promise<any> {
		return this.firebase.auth.signInWithEmailAndPassword(email, password);
	}

	createAccountFirebase(userData:AccountRegister): Promise<any> {
		let obj = JSON.parse(JSON.stringify(userData));
		return this.firebase.auth.createUserWithEmailAndPassword(obj.email, obj.password);
	}

	recoveryPassword(email, urlrecovery) : Promise<any> {
		return this.firebase.auth.sendPasswordResetEmail(email, urlrecovery);
	}

	getRolByUser(email: string) {
		return this.firestore.collection(collections.USUARIOS, ref => ref.where('email', '==', email).limit(1));
	}

	routeByRol(userData) {
		this.firebase.authState.subscribe(user => {
			this.setRouteUser(userData.id_rol, user.uid);
			this.localstorage.create('authUser', { uid: user.uid, rol: userData.id_rol });
		});
	}

	setRouteUser(rol, uid) {
		if (rol == null || uid == null)
			return false;

		switch (rol) {
			case '0':
				this.route.navigate([`/dashboard/mc/${uid}/cultivos`]);
				break;

			case '2':
				this.route.navigate([`/dashboard/mc/${uid}/cultivos`]);
				break;

			case '3':
				this.route.navigate([`/dashboard/mc/${uid}/documentos`])
				break;
		}
	}
}
