import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICES } from './services';
import { PipesModule } from './pipes/pipes.module';
import { GUARDS } from './guards';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		PipesModule
	],
	providers: [
		...SERVICES,
		...GUARDS
	],
	exports : [PipesModule]
})
export class CoreModule { }
