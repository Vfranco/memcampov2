import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	model: Login = new Login();

	statusLogin : boolean = true;
	buttonText : string = 'Iniciar Sesion';
	errorMessage : string = '';

	constructor(private route: Router, private firebase: AngularFireAuth) { }

	ngOnInit() {
		window.localStorage.setItem('auth', JSON.stringify({'auth' : true }));
	}

	initLogin(frmLogin: NgForm){
		this.buttonText = 'Espere ...';

		this.firebase.auth.signInWithEmailAndPassword(this.model.email, this.model.pass).then(result => {
			console.log(result);

			this.route.navigate(['dashboard/mc/123/cultivos']);
			this.buttonText = 'Iniciar Sesión';
		});
	}

}
