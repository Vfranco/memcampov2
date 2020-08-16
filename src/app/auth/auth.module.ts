import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetComponent } from './reset/reset.component';
import { CoreModule } from '@app/core/core.module';

const authRoute: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'recovery', component: RecoveryComponent },
	{ path: 'reset', component: ResetComponent }
]

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		RecoveryComponent,
		ResetComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(authRoute),
		SharedModule,
		CoreModule
	],
	exports: [ResetComponent]
})
export class AuthModule { }
