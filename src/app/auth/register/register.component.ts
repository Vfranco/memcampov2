import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountRegister } from 'src/app/models/registro.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { collections } from 'src/app/constants/constants';
import { firebaseErrors } from 'src/app/constants/firebase.errors';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	modelRegistroUsuarios: AccountRegister = new AccountRegister;

	statusRegister: boolean = false;
	statusMessagePassword: boolean = false;
	errorMessageRegister: string = '';
	colorStatus: string = '';
	btnRegisterUser: string = 'Registrar Usuario';

	constructor(private auth: AuthService, private firestore: FirebaseService) { }

	ngOnInit() {
	}

	registerDataUser(userData: AccountRegister, formData: NgForm) {
		this.btnRegisterUser = 'Registrando ...';

		this.auth.createAccountFirebase(userData).then(response => {
			if (response)
			{
				this.firestore.storeData(collections.USUARIOS, userData).then(response => {
					if(response)
					{
						this.statusRegister = true;
						this.errorMessageRegister = 'Usuario registrado exitosamente';
						this.colorStatus = 'success';
					}
				}).catch(error => {
					this.statusRegister = true;
					this.errorMessageRegister = firebaseErrors[error.code] || error.message;
				});
			}

			this.btnRegisterUser = 'Registrar Usuario';
			formData.resetForm(new AccountRegister);
		}).catch(error => {
			this.statusRegister = true;
			this.colorStatus = 'danger';
			this.btnRegisterUser = 'Registrar Usuario';
			this.errorMessageRegister = firebaseErrors[error.code] || error.message;
		});
	}
}
