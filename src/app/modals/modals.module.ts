import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreatecicloComponent } from './createciclo/createciclo.component';
import { CreatefaseComponent } from './createfase/createfase.component';
import { CreateculivoComponent } from './createculivo/createculivo.component';
import { CreatetipocultivoComponent } from './createtipocultivo/createtipocultivo.component';

@NgModule({
	declarations: [
		CreatecicloComponent,
		CreatefaseComponent,
		CreateculivoComponent,
		CreatetipocultivoComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [
		CreatecicloComponent,
		CreatefaseComponent,
		CreateculivoComponent,
		CreatetipocultivoComponent
	]
})
export class ModalsModule { }
