import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { TiposcultivoService, CiclosService, FileManagerService, UniqueService } from '@app/core/services';
import { TipoCultivo } from '@app/core/interface/tipocultivo.interface';
import { Ciclo } from '@app/core/interface/Ciclo.interface';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-createciclo',
	templateUrl: './createciclo.component.html',
	styleUrls: ['./createciclo.component.css']
})
export class CreatecicloComponent implements OnInit {

	@Output() show = new EventEmitter<boolean>();
	cicloVida: Ciclo = {
		idunique: "",
		descripcion: "",
		fases: [],
		id_tipo_cultivo: "",
		imgCultivo: "",
		nombreCicloVida: "",
		nombreImagenCicloVida: "",
		nombreTipoCultivo: "",
		url_ciclo_vida: ""
	};
	id: string = "";
	tiposCultivo: TipoCultivo[];
	nameFile: string = "";
	file: File = null;
	base64: string;
	nombreUpload: string;

	constructor(
		private activatedRouter: ActivatedRoute,
		private tiposService: TiposcultivoService,
		private ciclosService: CiclosService,
		private fileManager: FileManagerService,
		private uniqueId: UniqueService) { }

	ngOnInit() {
		this.init();
	}

	init() {
		this.getTiposCultivo();
		this.activatedRouter.paramMap.subscribe(params => {
			this.id = params.get('id')
			if (this.id) {
				console.log("Update");
				this.uploadData();
			} else {
				console.log("Create");
			}
		});
	}

	async getTiposCultivo() {
		let data = await this.tiposService.getTiposCultivoPromesa();
		this.tiposCultivo = data.tiposA;
		this.tiposCultivo.unshift({
			id: "",
			imgCultivo: "",
			pathCultivo: "",
			imgIcono: "",
			pathIcono: "",
			nombre: "Seleccionar tipo cultivo",
			nombreImagenes: []
		});
		this.cicloVida.id_tipo_cultivo = this.tiposCultivo[0];
	}

	uploadData() {
		setTimeout(async () => {
			this.cicloVida = await this.ciclosService.getCicloByIdPromesa(this.id);
			this.nombreUpload = this.cicloVida.nombreCicloVida;
			this.nameFile = this.cicloVida.nombreImagenCicloVida
			let data = this.tiposCultivo.filter(tipo => tipo.id === this.cicloVida.id_tipo_cultivo)
			this.cicloVida.id_tipo_cultivo = data[0];
		}, 500);
	}

	closeModal() {
		this.show.emit(false);
	}

	fileSelected(e) {
		if (e.target.files[0]) {
			this.file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.base64 = (e.target.result);
			}
			reader.readAsDataURL(this.file);
		} else {
			this.file = null;
			this.base64 = "";
		}
	}

	validationForm(form: NgForm, type?) {
		if (form.invalid) {
			Object.values(form.controls).forEach(control => {
				if (!control.touched) {
					control.markAsTouched();
				}
			});
			return false;
		}
		if (type == 'update') {
			return true;
		} else {
			if (this.file == null)
				return false;
		}
		return true;
	}

	createCiclo(form: NgForm) {
		Swal.fire({
			text: '¿Deseas crear un ciclo de vida?',
			icon: 'question',
			confirmButtonText: 'Sí, crear',
			confirmButtonColor: '#4CAF50',
			cancelButtonText: 'Cancelar',
			showCancelButton: true
		}).then(async (result) => {
			if (result.value) {
				if (!this.validationForm(form)) {
				} else {
					this.cicloVida.idunique = this.uniqueId.uniqueId();
					this.cicloVida.nombreTipoCultivo = this.cicloVida.id_tipo_cultivo['nombre'];
					this.cicloVida.imgCultivo = this.cicloVida.id_tipo_cultivo['imgCultivo'];
					this.cicloVida.id_tipo_cultivo = this.cicloVida.id_tipo_cultivo['id'];
					this.cicloVida.nombreImagenCicloVida = this.file.name;
					this.cicloVida.path = `ciclosvida/${this.cicloVida.idunique}/${this.file.name}`;
					await this.fileManager.upload(this.file, this.cicloVida.path);
					await this.fileManager.getUrlFileInfo(this.cicloVida.path).toPromise().then(url => this.cicloVida.url_ciclo_vida = url);
					console.log(this.cicloVida);
					this.ciclosService.createCiclo(this.cicloVida).then(() => {
						Swal.fire('¡Bien!', 'Hemos creado tu ciclo de vida', 'success');
						this.show.emit(false);
						$('#modalCreateCiclo').modal('hide');
					}).catch(err => {
						console.log(err);
					});
				}
			}
		});
	}

	updateCiclo(form: NgForm) {
		Swal.fire({
			text: '¿Seguro de actualizar tu ciclo de vida?',
			icon: 'question',
			confirmButtonText: 'Sí, actualizar',
			confirmButtonColor: '#4CAF50',
			cancelButtonText: 'Cancelar',
			showCancelButton: true
		}).then(async (result) => {
			if (result.value) {
				if (!this.validationForm(form, 'update')) {
				} else {
					if (this.file != null) {
						await this.fileManager.deleteFilesFolder(this.cicloVida.path);
						this.cicloVida.path = `ciclosvida/${this.cicloVida.idunique}/${this.file.name}`;
						await this.fileManager.upload(this.file, this.cicloVida.path);
						await this.fileManager.getUrlFileInfo(this.cicloVida.path).toPromise().then(url => this.cicloVida.url_ciclo_vida = url);
					}
					this.cicloVida.nombreTipoCultivo = this.cicloVida.id_tipo_cultivo['nombre'];
					this.cicloVida.imgCultivo = this.cicloVida.id_tipo_cultivo['imgCultivo'];
					this.cicloVida.id_tipo_cultivo = this.cicloVida.id_tipo_cultivo['id'];
					this.ciclosService.updateCiclo(this.cicloVida, this.id).then(() => {
						Swal.fire('¡Bien!', 'Ciclo de vida actualizado con exito.', 'success');
						this.show.emit(false);
						$('#modalCreateCiclo').modal('hide');
					}).catch(err => {
						console.log(err);
					});
				}
			}
		});
	}
}
