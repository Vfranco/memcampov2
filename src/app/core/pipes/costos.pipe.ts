import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'costos'
})
export class CostosPipe implements PipeTransform {

	transform(value: any): any {
		let costos = 0;

		if(value == undefined)
			return costos;		

		Object.keys(value).forEach(element => {
			let actividad = value[element];
			costos += actividad.costo_total;
		});

		return costos;
	}

}
