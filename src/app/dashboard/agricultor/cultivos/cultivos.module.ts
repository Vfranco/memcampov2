import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

const cultivosRoute : Routes = [
	{ path : 'cultivos', component : HomeComponent }
]

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(cultivosRoute),
		SharedModule
	]
})
export class CultivosModule { }
