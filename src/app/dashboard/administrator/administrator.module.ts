import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiclodevidaComponent } from './ciclodevida/ciclodevida.component';
import { RouterModule, Routes } from '@angular/router';

const adminRoutes : Routes = [
	{ path : 'dashboard/administrator/ciclodevida', component: CiclodevidaComponent }
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
