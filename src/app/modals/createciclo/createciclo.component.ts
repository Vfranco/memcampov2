import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';

import { collections } from './../../constants/constants';
import { TipoCultivo } from 'src/app/interface/tipocultivo.interface';
import { Ciclo } from './../../interface/Ciclo.interface';

import { CiclosService } from './../../services/ciclos.service';
import { TiposcultivoService } from './../../services/tiposcultivo.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-createciclo',
	templateUrl: './createciclo.component.html',
	styleUrls: ['./createciclo.component.css']
})
export class CreatecicloComponent implements OnInit {

	id: string 					= "";
	tiposCultivo: TipoCultivo;
	fileSeleted: File;
	nameFile: string 			= "";
	imagesSelected: string[]	= [];
	cicloVida: Ciclo = {
		descripcion: "",
		fases: [],
		id_tipo_cultivo: "",
		imgCultivo: "",
		nombreCicloVida: "",
		nombreImagenCicloVida: "",
		nombreTipoCultivo: "",
		url_ciclo_vida: ""
	};

	constructor(
		private activatedRouter: ActivatedRoute,
		private tiposService: TiposcultivoService,
		private ciclosService: CiclosService) {

		this.init();
		this.getTiposCultivo();
	}

	ngOnInit() {
	}

	init() {
		this.activatedRouter.paramMap.subscribe(params => this.id = params.get('id'));
	}

	getTiposCultivo() {
		this.tiposService.getTiposCultivo().subscribe((data) => {
			this.tiposCultivo = data;
		})
	}

	validationNameImages() {
		let i = this.imagesSelected.indexOf(this.nameFile);
		if (i == -1) {
			this.imagesSelected.push(this.nameFile);
		}
	}

	clearStorageImages() {
		this.imagesSelected.forEach((element, index) => {
			if (element != this.nameFile) {
				this.ciclosService.deleteImgCiclo(this.cicloVida.nombreCicloVida, element).toPromise()
					.then(() => {
						console.log(`Imagen ${element} eliminada.`);
					});
			}

			if (element == this.nameFile)
				this.imagesSelected = [this.imagesSelected[index]];
		});
	}

	selectedFile(event) {
		this.fileSeleted = event.target.files[0];
		if (this.fileSeleted) {
			this.nameFile = this.fileSeleted.name;
			this.ciclosService.setImgCiclo(this.cicloVida.nombreCicloVida, this.fileSeleted, this.nameFile)
				.then(() => {
					this.ciclosService.getUrlImage(this.cicloVida.nombreCicloVida, this.nameFile).subscribe(url => {
						this.cicloVida.url_ciclo_vida = url;
						this.validationNameImages();
						this.clearStorageImages();
					});
				});
		}
		else {
			this.nameFile = "";
			this.cicloVida.url_ciclo_vida = "";
			this.clearStorageImages();
		}
	}

	clearVariables(form) {
		form.resetForm();
		this.cicloVida = {
			descripcion: "",
			fases: [],
			id_tipo_cultivo: "",
			imgCultivo: "",
			nombreCicloVida: "",
			nombreImagenCicloVida: "",
			nombreTipoCultivo: "",
			url_ciclo_vida: ""
		};
		this.nameFile = "";
		$('#modalCreateCiclo').modal('hide');
	}

	createCiclo(form: NgForm) {
		Swal.fire({
			title: '¡Abvertencia!',
			text: '¿Deseas crear un ciclo de vida?',
			icon: 'info',
			showCancelButton: true,
			confirmButtonText: 'Sí, crear',
			confirmButtonColor: '#4CAF50',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
				if (form.invalid) {
					Object.values(form.controls).forEach(control => {
						if (!control.touched) {
							control.markAsTouched();
						}
					});
					return
				}

				this.cicloVida.nombreTipoCultivo	 = this.tiposCultivo[this.cicloVida.id_tipo_cultivo].nombre;
				this.cicloVida.imgCultivo			 = this.tiposCultivo[this.cicloVida.id_tipo_cultivo].imgCultivo;
				this.cicloVida.nombreImagenCicloVida = this.nameFile;

				this.ciclosService.createCiclo(collections.CICLOS_DE_VIDA, this.cicloVida)
					.then(() => {
						Swal.fire('¡Bien!', 'Hemos creado tu ciclo de vida', 'success');
						this.clearVariables(form);
					}).catch(err => {
						console.log(err);
					});
			}
		});
	}
}
