import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { FincasComponent } from './fincas/fincas.component';

const agricultorRoute : Routes = [
	{ path: '', loadChildren : () => import('./cultivos/cultivos.module').then(m => m.CultivosModule), data : { preload : false }},
	{ path: 'fincas', component: FincasComponent }
]

@NgModule({
	declarations: [		
		
		FincasComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(agricultorRoute),
		NgxSkeletonLoaderModule
	]	
})
export class AgricultorModule { }
