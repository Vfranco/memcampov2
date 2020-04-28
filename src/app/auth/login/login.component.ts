import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	statusLogin : boolean = true;
	buttonText : string = 'Iniciar Sesion';
	errorMessage : string = '';

	constructor() { }

	ngOnInit() {

	}

	initLogin(frmLogin: NgForm){
		console.log(frmLogin);
	}

}
