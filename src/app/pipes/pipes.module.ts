import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitysPipe } from './activitys.pipe';
import { CostosPipe } from './costos.pipe';
import { TimeelapsedPipe } from './timeelapsed.pipe';

@NgModule({
	declarations: [ActivitysPipe, CostosPipe, TimeelapsedPipe],
	imports: [
		CommonModule
	],
	exports: [ActivitysPipe, CostosPipe, TimeelapsedPipe]
})
export class PipesModule { }
