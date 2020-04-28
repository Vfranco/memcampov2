import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	statusRegister : boolean = false;
	statusMessagePassword :boolean = false;
	errorMessageRegister: string = '';
	colorStatus: string = '';
	btnRegisterUser: string = 'Registrar Usuario';
	password: string = '';
	confirm: string = '';

	constructor() { }

	ngOnInit() {
	}

	registerDataUser(userData: NgForm){
		console.log(userData);
	}
}
