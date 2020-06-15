import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

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
		QuicklinkModule,		
		RouterModule.forRoot(appRoute, {
			enableTracing : false,
			preloadingStrategy : QuicklinkStrategy
		}),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
		AngularFireStorageModule
	],
	exports : [RouterModule]
})
export class AppRouteModule { }
