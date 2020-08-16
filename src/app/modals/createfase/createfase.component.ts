import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
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

	buttomText      	   : string  = "";
	ciclo	        	   : Ciclo; 
	@Input() inicio	       : number;
	@Input() fin		   : number;
	@Input() indexSelected : number;
	@Input() editar        : boolean = false;
	@Input() data		   : any = {};
	@Input() fase: Fases;
	@Input() habilitarEstadoFase;

	constructor(
		private cicloService: CiclosService) {}

	ngOnInit() {
		this.init();
	}

	init() {
	}

	validationHabilitar(){
		if (this.habilitarEstadoFase == 'true')
			this.fase.habilitar = true;
		if (this.habilitarEstadoFase == 'false')
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

	upadteFase(form: NgForm) {
		Swal.fire({
			title: '¡Advertencia!',
			text: '¿Deseas actualizar la fase?',
			icon: 'info',
			confirmButtonText: 'Sí, actualizar fase',
			confirmButtonColor: '#4CAF50',
			showCancelButton: true
		}).then(result => {
			if(result.value){
				if (!this.validationForm(form)) {
				} else {
					this.fase.rango_dias.inicio = this.inicio;
					this.fase.rango_dias.fin 	= this.fin;
					this.ciclo 			   		= this.data.ciclo;
					this.validationHabilitar();

					this.cicloService.updateCiclo(this.ciclo, this.data.id).then(() => {
						Swal.fire('¡Bien hecho!', 'Fase actualizada', 'info');
						this.clearVariables(form);
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
