import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoute: Routes = [
	{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
	{ path: '', loadChildren: () => import('./dashboard/agricultor/agricultor.module').then(m => m.AgricultorModule )},
	{ path: '', loadChildren: () => import('./dashboard/editor/editor.module').then(m => m.EditorModule )},
	{ path: '', loadChildren: () => import('./dashboard/empresas/empresas.module').then(m => m.EmpresasModule )},
	{ path: '', loadChildren: () => import('./dashboard/administrator/administrator.module').then(m => m.AdministratorModule )},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forRoot(appRoute, {
			enableTracing : false,
			preloadingStrategy : PreloadAllModules
		})
	],
	exports : [RouterModule]
})
export class AppRouteModule { }
