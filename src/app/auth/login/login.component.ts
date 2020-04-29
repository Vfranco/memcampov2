import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	statusLogin : boolean = true;
	buttonText : string = 'Iniciar Sesion';
	errorMessage : string = '';

	constructor(private route: Router) { }

	ngOnInit() {
		window.localStorage.setItem('auth', JSON.stringify({'auth' : true }));
	}

	initLogin(frmLogin: NgForm){
		console.log(frmLogin.value);
		this.route.navigate(['/dashboard/mc/123/cultivos']);
	}

}
