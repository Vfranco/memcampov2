import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';

const authRoute : Routes = [
	{ path : '', component : LoginComponent },
	{ path : 'register', component : RegisterComponent },
	{ path : 'recovery', component : RecoveryComponent }
]

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		RecoveryComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(authRoute)
	]
})
export class AuthModule { }
