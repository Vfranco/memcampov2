import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { CiclosService } from './../../services/ciclos.service';

import { Ciclo } from './../../interface/Ciclo.interface';
import { Fases } from './../../interface/fases.interface';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-createfase',
	templateUrl: './createfase.component.html',
	styleUrls: ['./createfase.component.css']
})
export class CreatefaseComponent implements OnInit {

	buttomText: string   = "";
	ciclo: Ciclo;
	@Input() data: any   = {};
	@Input() fase: Fases = {
		nombre: "",
		detalles : "",
		habilitar : true,
		rango_dias: { inicio: 0, fin: 0 },
		rango_dias_literatura: "",
		sugerencias: ""
	}
	habilitar :string	 = "true";
	inicio	  :number	 = 0;
	fin		  :number	 = 0;


	constructor(
		private cicloService: CiclosService
	) {
		this.init();
	}

	ngOnInit() {
	}

	init(data?) {
		if (data) {
			this.buttomText = "Editar fase";
		} else {
			this.buttomText = "Agregar fase";
		}
	}

	validationHabilitar(){
		if (this.habilitar == 'true')
			this.fase.habilitar = true;
		if (this.habilitar == 'false')
			this.fase.habilitar = false;
	}

	validationForm(form: NgForm) {
		if (form.invalid) {
			Object.values(form.controls).forEach(control => {
				if (!control.touched)
					control.markAsTouched();
			});
			return false;
		} else {
			return true;
		}
	}

	clearVariables(form: NgForm) {
		form.resetForm();
		form.setValue({ nombre: '', habilitar: 'true', inicio: 0, fin: 0, libros: '', detalles: '', sugerencias: '' });
		$('#modalFase').modal('hide');
	}

	createFase(form: NgForm) {
		Swal.fire({
			title: '¡Advertencia!',
			text: '¿Deseas crear una nueva fase?',
			icon: 'info',
			confirmButtonText: 'Sí, Crear fase',
			confirmButtonColor: '#4CAF50',
			showCancelButton: true
		}).then((result) => {
			if(result.value){
				if (!this.validationForm(form)) {
				} else {
					this.fase.rango_dias.inicio  = this.inicio;
					this.fase.rango_dias.fin	 = this.fin;
					this.ciclo 					 = this.data.ciclo;
					this.validationHabilitar();
					this.ciclo.fases.push(this.fase);

					this.cicloService.updateCiclo(this.ciclo, this.data.id).then(() => {
						Swal.fire('¡Bien hecho!', 'Fase agregada', 'info');
						this.clearVariables(form);
					}).catch((err) => {
						Swal.fire('Upss', 'Error inesperado', 'warning');
						console.log(err);
					});

				}
			}
		})
	}
}
