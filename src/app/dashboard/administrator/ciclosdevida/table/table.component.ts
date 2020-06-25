import { Ciclo } from './../../../../interface/Ciclo.interface';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { CiclosService } from './../../../../services/ciclos.service';

import { Fases } from './../../../../interface/fases.interface';
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
	@Input() id   : string;
	editar 		  : boolean = false;
	inicio		  : number  = 0;
	fin			  : number  = 0;
	habilitar	  : any;
	faseSelected: Fases = {
		nombre: "",
		detalles: "",
		habilitar: true,
		rango_dias: { inicio: 0, fin: 0 },
		rango_dias_literatura: "",
		sugerencias: ""
	}
	index         : number  = -1;

	constructor(
		private cicloService: CiclosService
	) { }

	ngOnInit() {
	}

	createFase() {
		this.faseSelected = {
			nombre: "",
			detalles: "",
			habilitar: true,
			rango_dias: { inicio: 0, fin: 0 },
			rango_dias_literatura: "",
			sugerencias: ""
		}
		this.habilitar = true;
		this.editar = false;
		this.inicio = 0;
		this.fin = 0;
	}

	updateFase(fase, i) {
		this.faseSelected = fase;
		this.habilitar = this.faseSelected.habilitar;
		this.inicio = this.faseSelected.rango_dias.inicio;
		this.fin = this.faseSelected.rango_dias.fin
		this.index = i;
		this.editar = true;
		$('#modalFase').modal('show');
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
