import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { CultivosComponent } from './cultivos/cultivos.component';
import { FincasComponent } from './fincas/fincas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const empresaRoute : Routes = [
	{ path : 'cultivos/empresa/:idempresa', component : CultivosComponent, canActivate: [AuthGuard] },
	{ path : 'fincas/empresa/:idempresa', component : FincasComponent, canActivate: [AuthGuard] },
	{ path : 'usuarios/empresa/:idempresa', component : UsuariosComponent, canActivate: [AuthGuard] }
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
