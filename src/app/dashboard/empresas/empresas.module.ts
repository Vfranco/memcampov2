import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { CultivosComponent } from './cultivos/cultivos.component';
import { FincasComponent } from './fincas/fincas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const empresaRoute : Routes = [
	{ path : 'dashboard/empresas/cultivos', component : CultivosComponent, canActivate: [AuthGuard] },
	{ path : 'dashboard/empresas/fincas', component : FincasComponent, canActivate: [AuthGuard] },
	{ path : 'dashboard/empresas/usuarios', component : UsuariosComponent, canActivate: [AuthGuard] }
]

@NgModule({
	declarations: [
		CultivosComponent,
		FincasComponent,
		UsuariosComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(empresaRoute)
	]
})
export class EmpresasModule { }
