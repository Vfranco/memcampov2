import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatecicloComponent } from './createciclo/createciclo.component';
import { CreatefaseComponent } from './createfase/createfase.component';
import { CreateculivoComponent } from './createculivo/createculivo.component';

@NgModule({
	declarations: [
		CreatecicloComponent,
		CreatefaseComponent,
		CreateculivoComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		CreatecicloComponent,
		CreatefaseComponent,
		CreateculivoComponent
	]
})
export class ModalsModule { }
