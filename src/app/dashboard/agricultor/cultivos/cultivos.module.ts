import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { ModalsModule } from 'src/app/modals/modals.module';

import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';

const cultivosRoute : Routes = [
	{ path : 'cultivos', component : HomeComponent }
]

@NgModule({
	declarations: [HomeComponent, ResumenComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(cultivosRoute),
		SharedModule,
		CoreModule,
		ModalsModule
	]
})
export class CultivosModule { }
