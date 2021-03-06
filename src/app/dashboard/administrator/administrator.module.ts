import { ModalsModule } from 'src/app/modals/modals.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposcultivosComponent } from './tiposcultivos/tiposcultivos.component';

const adminRoutes: Routes = [
	{ path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
	{ path: 'tiposcultivo', component: TiposcultivosComponent, canActivate: [AuthGuard] },
	{ path: '', loadChildren: () => import('./ciclosdevida/ciclosdevida.module').then(m => m.CiclosdevidaModule) }
]

@NgModule({
	declarations: [
		UsuariosComponent,
		TiposcultivosComponent
	],
	imports: [
		CommonModule,
		ModalsModule,
		RouterModule.forChild(adminRoutes)
	]
})
export class AdministratorModule { }
