import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatecicloComponent } from './createciclo/createciclo.component';
import { CreatefaseComponent } from './createfase/createfase.component';

@NgModule({
	declarations: [
		CreatecicloComponent,
		CreatefaseComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		CreatecicloComponent,
		CreatefaseComponent
	]
})
export class ModalsModule { }
