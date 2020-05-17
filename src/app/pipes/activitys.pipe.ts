import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'activitys',
	pure: false
})
export class ActivitysPipe implements PipeTransform {

	transform(value: any): any {
		if(value == undefined)
			return 0;

		return Object.keys(value).length;		
	}

}
