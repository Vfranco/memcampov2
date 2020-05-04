import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { CiclodevidaComponent } from './ciclodevida/ciclodevida.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposcultivosComponent } from './tiposcultivos/tiposcultivos.component';

const adminRoutes : Routes = [
	{ path : 'ciclos', component: CiclodevidaComponent, canActivate: [AuthGuard] },
	{ path : 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
	{ path : 'tiposcultivo', component: TiposcultivosComponent, canActivate : [AuthGuard] }
]

@NgModule({
	declarations: [
		CiclodevidaComponent,
		UsuariosComponent,
		TiposcultivosComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(adminRoutes)
	]
})
export class AdministratorModule { }
