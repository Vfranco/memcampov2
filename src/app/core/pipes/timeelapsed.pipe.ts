import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

@Pipe({
	name: 'timeelapsed'
})
export class TimeelapsedPipe implements PipeTransform {

	transform(value: any, ...args: any[]): any {
		let now = moment(value);
		return now.startOf('hour').fromNow();
	}

}
