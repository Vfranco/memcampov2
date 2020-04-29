import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoute: Routes = [
	{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },	
	{ path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule )},
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
