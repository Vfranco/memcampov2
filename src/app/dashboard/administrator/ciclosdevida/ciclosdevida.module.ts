import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModalsModule } from './../../../modals/modals.module';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CardComponent } from './card/card.component';

import { AuthGuard } from './../../../guards/auth.guard';
import { TableComponent } from './table/table.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardDetailsImageComponent } from './card-details-image/card-details-image.component';

const ciclosRoutes: Routes = [
	{ path: 'ciclos', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
]

@NgModule({
	declarations: [
		HomeComponent,
		DetailsComponent,
		CardComponent,
		TableComponent,
		CardDetailsComponent,
		CardDetailsImageComponent
	],
	imports: [
		CommonModule,
		ModalsModule,
		RouterModule.forChild(ciclosRoutes)
	]
})
export class CiclosdevidaModule { }