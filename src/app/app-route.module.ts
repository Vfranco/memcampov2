import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';

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
		}),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule
	],
	exports : [RouterModule]
})
export class AppRouteModule { }
