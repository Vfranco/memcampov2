import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ciclo } from '@app/core/interface/Ciclo.interface';
import { Fases } from '@app/core/interface/fases.interface';
import { CiclosService } from '@app/core/services';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-createfase',
	templateUrl: './createfase.component.html',
	styleUrls: ['./createfase.component.css']
})
export class CreatefaseComponent implements OnInit {

	@Input() index: any;
	@Input() ciclo: Ciclo;
	fase: Fases = {
		detalles: '',
		habilitar: 'true',
		nombre: '',
		rango_dias: {
			fin: 0,
			inicio: 0
		},
		rango_dias_literatura: '',
		sugerencias: ''
	};
	@Output() i = new EventEmitter<any>();
	@Output() show = new EventEmitter<boolean>();

	constructor(
		private cicloService: CiclosService) { }

	ngOnInit() {
		console.log("init");
		if (this.index != undefined)
			this.uploadData();
	}

	async uploadData() {
		this.ciclo = await this.cicloService.getCicloByIdPromesa(this.ciclo.id);
		this.fase = this.ciclo.fases[this.index];
	}

	closeModal() {
		this.show.emit(false);
		this.i.emit(this.index = undefined);
	}

	validationHabilitar() {
		if (this.fase.habilitar == 'true')
			this.fase.habilitar = true;
		if (this.fase.habilitar == 'false')
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

	createFase(form: NgForm) {
		Swal.fire({
			title: '¡Advertencia!',
			text: '¿Deseas crear una nueva fase?',
			icon: 'info',
			confirmButtonText: 'Sí, Crear fase',
			confirmButtonColor: '#4CAF50',
			showCancelButton: true
		}).then((result) => {
			if (result.value) {
				if (!this.validationForm(form)) {
				} else {
					this.ciclo = this.ciclo;
					this.validationHabilitar();
					this.ciclo.fases.push(this.fase);
					this.cicloService.updateCiclo(this.ciclo, this.ciclo.id).then(() => {
						Swal.fire('¡Bien hecho!', 'Fase agregada', 'info');
						this.show.emit(false);
						$('#modalFase').modal('hide');
					}).catch((err) => {
						Swal.fire('Upss', 'Error inesperado', 'warning');
						console.log(err);
					});
				}
			}
		})
	}

	upadteFase(form: NgForm) {
		Swal.fire({
			title: '¡Advertencia!',
			text: '¿Deseas actualizar la fase?',
			icon: 'info',
			confirmButtonText: 'Sí, actualizar fase',
			confirmButtonColor: '#4CAF50',
			showCancelButton: true
		}).then(result => {
			if (result.value) {
				if (!this.validationForm(form)) {
				} else {
					this.validationHabilitar();
					this.ciclo.fases[this.index] = this.fase;
					this.cicloService.updateCiclo(this.ciclo, this.ciclo.id).then(() => {
						Swal.fire('¡Bien hecho!', 'Fase actualizada', 'info');
						this.show.emit(false);
						this.i.emit(this.index = undefined);
						$('#modalFase').modal('hide');
					}).catch((err) => {
						Swal.fire('Upss', 'Error inesperado', 'warning');
						console.log(err);
					});
				}
			}
		})

	}
}
