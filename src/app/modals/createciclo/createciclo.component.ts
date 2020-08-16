import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { TipoCultivo } from '@app/core/interface/tipocultivo.interface';
import { Ciclo } from '@app/core/interface/Ciclo.interface';
import { TiposcultivoService, CiclosService } from '@app/core/services';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-createciclo',
	templateUrl: './createciclo.component.html',
	styleUrls: ['./createciclo.component.css']
})
export class CreatecicloComponent implements OnInit {

	id: string = "";
	tiposCultivo: TipoCultivo;
	fileSeleted: File;
	imageSelectedUpdate: boolean = false;
	@Input() imagesSelected: string[] = [];
	@Input() nameFile: string = "";
	@Input() cicloVida: Ciclo = {
		descripcion: "",
		fases: [],
		id_tipo_cultivo: "",
		imgCultivo: "",
		nombreCicloVida: "",
		nombreImagenCicloVida: "",
		nombreTipoCultivo: "",
		url_ciclo_vida: ""
	};
	@Input() respaldo: Ciclo;

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
			console.log(this.imagesSelected);
		}
	}

	clearStorageImages(nombreCiclo: string, nameFile: string) {
		this.imagesSelected.forEach((element, index) => {
			if (element != nameFile) {
				this.ciclosService.deleteImgCiclo(nombreCiclo, element).toPromise()
					.then(() => {
						console.log(`Imagen ${element} eliminada.`);
					});
			}

			if (element == this.nameFile)
				this.imagesSelected = [this.imagesSelected[index]];
		});
	}

	setImgStorage() {
		this.ciclosService.setImgCiclo(this.cicloVida.nombreCicloVida, this.fileSeleted, this.nameFile)
			.then(() => {
				this.ciclosService.getUrlImage(this.cicloVida.nombreCicloVida, this.nameFile).subscribe(url => {
					this.cicloVida.url_ciclo_vida = url;
					this.validationNameImages();
				});
			});
	}

	selectedFile(event) {
		this.fileSeleted = event.target.files[0];
		if (this.fileSeleted) {
			this.nameFile = this.fileSeleted.name;
			this.imageSelectedUpdate = true;
			this.setImgStorage();
		}
		else {
			this.nameFile = "";
			this.cicloVida.url_ciclo_vida = "";
			this.imageSelectedUpdate = false;
			this.clearStorageImages(this.cicloVida.nombreCicloVida, this.nameFile);
		}
	}

	closeModalCreate(form: NgForm) {
		if (this.imagesSelected.length > 0) {
			this.ciclosService.deleteImgCiclo(this.cicloVida.nombreCicloVida, this.nameFile).toPromise()
				.then(() => {
					console.log(`Imagen ${this.nameFile} eliminada.`);
					this.imagesSelected = [];
					this.clearVariables(form);
				});
		} else {
			this.clearVariables(form);
		}
	}

	closeModalUpdate() {
		console.log(this.respaldo);
		this.clearStorageImages(this.cicloVida.nombreCicloVida, this.respaldo.nombreImagenCicloVida);
		this.cicloVida.url_ciclo_vida = this.respaldo.url_ciclo_vida;
		this.cicloVida.nombreCicloVida = this.respaldo.nombreCicloVida;
		this.cicloVida.id_tipo_cultivo = this.respaldo.id_tipo_cultivo;
		this.cicloVida.descripcion = this.respaldo.descripcion;
		this.imagesSelected = [this.respaldo.nombreImagenCicloVida];
		this.nameFile = this.respaldo.nombreImagenCicloVida;
		this.imageSelectedUpdate = false;
	}

	clearVariables(form) {
		form.reset();
		form.setValue({ nombreCicloVida: "", descripcion: "", id_tipo_cultivo: "", url_ciclo_vida: "" });
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

	validationForm(form: NgForm) {
		if (form.invalid) {
			Object.values(form.controls).forEach(control => {
				if (!control.touched) {
					control.markAsTouched();
				}
			});
			return false;
		}

		if (this.cicloVida.url_ciclo_vida.length == 0)
			return false;

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
		}).then((result) => {
			if (result.value) {
				if (!this.validationForm(form)) {
				} else {
					this.clearStorageImages(this.cicloVida.nombreCicloVida, this.nameFile);
					this.cicloVida.nombreTipoCultivo = this.tiposCultivo[this.cicloVida.id_tipo_cultivo].nombre;
					this.cicloVida.imgCultivo = this.tiposCultivo[this.cicloVida.id_tipo_cultivo].imgCultivo;
					this.cicloVida.nombreImagenCicloVida = this.nameFile;
					this.ciclosService.createCiclo(this.cicloVida)
						.then(() => {
							Swal.fire('¡Bien!', 'Hemos creado tu ciclo de vida', 'success');
							this.clearVariables(form);
						}).catch(err => {
							console.log(err);
						});
				}
			}
		});
	}

	validationUpdateStorage(form: NgForm) {
		if ((this.cicloVida.nombreCicloVida == this.respaldo.nombreCicloVida)) {
			return true;
		} else {
			if (!this.imageSelectedUpdate) {
				this.nameFile = "";
				this.cicloVida.url_ciclo_vida = "";
				this.imageSelectedUpdate = true;
				form.controls.url_ciclo_vida.markAsTouched();
				Swal.fire('Ha cambiado el nombre del ciclo', 'Es necesario elegir otra imagen', 'info');
				return false;
			} else {
				this.imagesSelected.pop();
				this.ciclosService.deleteImgCiclo(this.respaldo.nombreCicloVida, this.respaldo.nombreImagenCicloVida).toPromise()
					.then(() => {
						console.log(`La imagen ${this.respaldo.nombreImagenCicloVida} se ha eliminado con exito.`);
					});
				return true;
			}
		}
	}

	updateCiclo(form: NgForm) {
		Swal.fire({
			text: '¿Seguro de actualizar tu ciclo de vida?',
			icon: 'question',
			confirmButtonText: 'Sí, actualizar',
			confirmButtonColor: '#4CAF50',
			cancelButtonText: 'Cancelar',
			showCancelButton: true
		}).then((result) => {
			if (result.value) {
				if (!this.validationUpdateStorage(form)) {
				} else {
					if (!this.validationForm(form)) {
					} else {
						console.log(this.imagesSelected);
						this.clearStorageImages(this.cicloVida.nombreCicloVida, this.nameFile);
						this.cicloVida.nombreTipoCultivo = this.tiposCultivo[this.cicloVida.id_tipo_cultivo].nombre;
						this.cicloVida.imgCultivo = this.tiposCultivo[this.cicloVida.id_tipo_cultivo].imgCultivo;
						this.cicloVida.nombreImagenCicloVida = this.nameFile;

						this.ciclosService.updateCiclo(this.cicloVida, this.id).then(() => {
							Swal.fire('¡Bien!', 'Ciclo de vida actualizado con exito.', 'success');
							this.imageSelectedUpdate = false;
							$('#modalCreateCiclo').modal('hide');
						}).catch(err => {
							console.log(err);
						});
					}

				}
			}
		});
	}

	pruebaSwal() {
		Swal.mixin({
			input: 'file',
			inputValidator: result => !result && 'You need to select something!',
			confirmButtonText: 'Next &rarr;',
			progressSteps: ['1', '2', '3']
		}).queue([
			{
				title: 'Question 1',
				text: 'Chaining swal2 modals is easy'
			},
			'Question 2',
			'Question 3'
		]).then((result) => {
			if (result['value']) {
				const answers = JSON.stringify(result['value'])
				console.log(result);
				Swal.fire({
					title: 'All done!',
					text: 'Hola mundo',
					confirmButtonText: 'Lovely!'
				})
			}
		})
	}
}
