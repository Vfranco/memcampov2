import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

const cultivosRoute : Routes = [
	{ path : 'cultivos', component : HomeComponent }
]

@NgModule({
	declarations: [HomeComponent, LoaderComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(cultivosRoute),
		NgxSkeletonLoaderModule
	]
})
export class CultivosModule { }
