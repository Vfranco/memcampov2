import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { CiclodevidaComponent } from './ciclodevida/ciclodevida.component';

const adminRoutes : Routes = [
	{ path : 'dashboard/administrator/ciclodevida', component: CiclodevidaComponent, canActivate: [AuthGuard] }
]

@NgModule({
	declarations: [
		CiclodevidaComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(adminRoutes)
	]
})
export class AdministratorModule { }
