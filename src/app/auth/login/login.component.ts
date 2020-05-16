import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { firebaseErrors } from 'src/app/constants/firebase.errors';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	model: Login;

	statusLogin: boolean = false;
	buttonText: string = 'Iniciar Sesion';
	errorMessage: string = 'algo';

	constructor(private route: Router, private auth: AuthService, private localstorage: LocalstorageService) {
		this.model = { email: "", pass: "" };
	}

	ngOnInit() {
		this.checkAuthUser();
	}

	checkAuthUser() {
		let auth = this.localstorage.read('authUser');

		if (auth != null || auth == undefined)
			return false;

		this.auth.setRouteUser(auth.rol, auth.uid);
	}

	initLogin(frmLogin: Login) {
		this.buttonText = 'Espere ...';

		this.auth.login(frmLogin.email, frmLogin.pass).then(response => {
			if (response) {
				this.auth.getRolByUser(frmLogin.email).get().subscribe(document => {
					if (document.empty) {
						this.statusLogin = true;
						this.errorMessage = 'No tienes una cuenta Activa';
					}
					else {
						document.forEach(element => {
							this.auth.routeByRol(element.data());
							this.buttonText = 'Iniciar Sesion';
						});
					}
				});
			}

		}).catch(error => {
			this.statusLogin = true;
			this.errorMessage = firebaseErrors[error.code] || error.message;
			this.buttonText = 'Iniciar Sesion';
			this.removeErrorMessage();
		});
	}

	removeErrorMessage() {
		setTimeout(() => {
			this.statusLogin = false;
		}, 3000)
	}
}
