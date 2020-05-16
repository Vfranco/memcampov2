import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { firebaseErrors } from 'src/app/constants/firebase.errors';

@Component({
	selector: 'app-recovery',
	templateUrl: './recovery.component.html',
	styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

	correo:string = '';
	showMessage:boolean = false;
	errorMessage:string = '';
	errorStyle:string = '';

	constructor(private auth: AuthService) { }

	ngOnInit() {
	}

	recovery(frmRecovery: NgForm){
		this.auth.recoveryPassword(frmRecovery.value.correo, {url : environment.RESET_PASSWORD }).then(() => {
			this.showMessage = true;
			this.errorStyle = 'success';
			this.errorMessage = 'Instrucciones enviadas al correo';
			frmRecovery.resetForm({});
		}).catch(error => {
			this.showMessage = true;
			this.errorStyle = 'danger';
			this.errorMessage = firebaseErrors[error.code] || error.message;
		});
	}
}
