import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Registrate } from 'src/app/models/registro.model';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	modelRegistroUsuarios : Registrate = new Registrate;

	statusRegister : boolean = false;
	statusMessagePassword :boolean = false;
	errorMessageRegister: string = '';
	colorStatus: string = '';
	btnRegisterUser: string = 'Registrar Usuario';

	constructor() { }

	ngOnInit() {
	}

	registerDataUser(userData: Registrate){
		console.log(userData);
	}
}
