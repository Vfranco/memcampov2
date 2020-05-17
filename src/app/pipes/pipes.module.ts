import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitysPipe } from './activitys.pipe';

@NgModule({
	declarations: [ActivitysPipe],
	imports: [
		CommonModule
	],
	exports: [ActivitysPipe]
})
export class PipesModule { }
