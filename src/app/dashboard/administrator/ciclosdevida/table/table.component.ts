import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Fases } from '@app/core/interface/fases.interface';
import { Ciclo } from '@app/core/interface/Ciclo.interface';
import { CiclosService } from '@app/core/services';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	@Input() ciclo: Ciclo;
	@Input() fases: Fases[];
	editar: boolean = false;
	faseSelected: Fases = {
		nombre: "",
		detalles: "",
		habilitar: true,
		rango_dias: { inicio: 0, fin: 0 },
		rango_dias_literatura: "",
		sugerencias: ""
	}
	i: number;
	showModal: boolean = false;

	constructor(
		private cicloService: CiclosService
	) { }

	ngOnInit() {
	}

	closeModal(e) {
		this.showModal = e;
	}

	indexClear(e) {
		console.log(e);
		this.i = e;
	}

	updateFase(i) {
		this.showModal = true;
		this.i = i;
		console.log(this.i);
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
				this.cicloService.updateCiclo(this.ciclo, this.ciclo.id).then(() => {
					Swal.fire('¡Hecho!', 'Se ha eliminado la fase', 'info');
				}).catch((err) => {
					Swal.fire('Upss', 'Error inesperado', 'warning');
					console.log(err);
				});
			}
		});
	}

}
