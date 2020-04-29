import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { FincasComponent } from './fincas/fincas.component';
import { CultivosComponent } from './cultivos/cultivos.component';

const agricultorRoute : Routes = [
	{ path: 'cultivos', component: CultivosComponent},
	{ path: 'fincas', component: FincasComponent}
]

@NgModule({
	declarations: [		
		CultivosComponent,
		FincasComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(agricultorRoute)
	]	
})
export class AgricultorModule { }
