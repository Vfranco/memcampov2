import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposcultivosComponent } from './tiposcultivos/tiposcultivos.component';

const adminRoutes: Routes = [
	{ path: '', loadChildren: () => import('./ciclosdevida/ciclosdevida.module').then(m => m.CiclosdevidaModule) },
	{ path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
	{ path: 'tiposcultivo', component: TiposcultivosComponent, canActivate: [AuthGuard] }
]

@NgModule({
	declarations: [
		UsuariosComponent,
		TiposcultivosComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(adminRoutes)
	]
})
export class AdministratorModule { }
