import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';

const ciclosRoutes: Routes = [
	{ path: 'ciclos', component: HomeComponent },
	{ path: 'details/:id', component: DetailsComponent },
]

@NgModule({
	declarations: [HomeComponent, DetailsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(ciclosRoutes)
	]
})
export class CiclosdevidaModule { }