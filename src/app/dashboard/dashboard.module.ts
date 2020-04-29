import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

const profileRoute: Routes = [
	{ 
		path		: 'dashboard/mc/:uid', 
		component	: MainComponent,
		canActivate	: [AuthGuard],
		children 	: [
			{ 
				path 			: '',
				loadChildren 	: () => import('./agricultor/agricultor.module').then(m => m.AgricultorModule ),
				canActivate 	: [AuthGuard]
			},
			{
				path			: '',
				loadChildren	: () => import('./editor/editor.module').then(m => m.EditorModule),
				canActivate		: [AuthGuard]
			},
			{
				path			: '',
				loadChildren	: () => import('./empresas/empresas.module').then(m => m.EmpresasModule),
				canActivate		: [AuthGuard]
			},
			{
				path			: '',
				loadChildren	: () => import('./administrator/administrator.module').then(m => m.AdministratorModule),
				canActivate		: [AuthGuard]
			}
		]		
	}	
]

@NgModule({
	declarations: [
		ProfileComponent,
		MainComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(profileRoute)
	],
	exports: [
		ProfileComponent
	]
})
export class DashboardModule { }
