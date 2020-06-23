import { Ciclo } from './../../../../interface/Ciclo.interface';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { CiclosService } from './../../../../services/ciclos.service';

import { Fases } from './../../../../interface/fases.interface';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	@Input() ciclo: Ciclo;
	@Input() fases: Fases[];
	@Input() id   : string;

	constructor(
		private cicloService: CiclosService
	) { }

	ngOnInit() {
		console.log(this.id);
		console.log(this.ciclo);
		console.log(this.fases);
	}

	deleteFase(index) {
		Swal.fire({
			title: '¡Advertencia!',
			text: '¿Seguro que quieres eliminar la fase?',
			icon: 'warning',
			confirmButtonText: 'Sí, eliminar',
			confirmButtonColor: '#dd3333',
			showCancelButton: true,
		}).then(result => {
			if (result.value) {
				this.fases.splice(index, 1);
				this.cicloService.updateCiclo(this.ciclo, this.id).then(() => {
					Swal.fire('¡Hecho!', 'Se ha eliminado la fase', 'info');
				}).catch((err) => {
					Swal.fire('Upss', 'Error inesperado', 'warning');
					console.log(err);
				});
			}
		});
	}

}
