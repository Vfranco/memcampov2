import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FincasComponent } from './fincas/fincas.component';
import { CultivosComponent } from './cultivos/cultivos.component';

const agricultorRoute : Routes = [
	{ path: 'dashboard/cultivos/:uid', component: CultivosComponent },
	{ path: 'dashboard/fincas/:uid', component: FincasComponent }
]

@NgModule({
	declarations: [		
		CultivosComponent,
		FincasComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(agricultorRoute)
	]	
})
export class AgricultorModule { }
