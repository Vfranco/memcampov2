import { Component, OnInit } from '@angular/core';

import { TiposcultivoService, CiclosService, FileManagerService } from '@app/core/services';
import { CultivosService } from '@app/core/services/cultivos.service';
import { TipoCultivo } from '@app/core/interface/tipocultivo.interface';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-tiposcultivos',
	templateUrl: './tiposcultivos.component.html',
	styleUrls: ['./tiposcultivos.component.css']
})
export class TiposcultivosComponent implements OnInit {

	public tiposCultivo: TipoCultivo[];
	public tipoObjecto: TipoCultivo;
	public tipo: TipoCultivo = {
		imgCultivo: '',
		pathCultivo: '',
		imgIcono: '',
		pathIcono: '',
		nombre: ''
	};
	public showModal: boolean = false;

	constructor(
		private tiposCultivosSvc: TiposcultivoService,
		private firebaseSvc: TiposcultivoService,
		private firebaseCultivosSvc: CultivosService,
		private firebaseCiclosSvc: CiclosService,
		private fileManager: FileManagerService,
	) { }

	ngOnInit() {
		this.getTiposCultivo();
	}

	getTiposCultivo() {
		this.tiposCultivosSvc.getTiposCultivo().subscribe((tipos) => {
			this.tiposCultivo = tipos.tiposA;
			this.tipoObjecto = tipos.tiposB;
			console.log({ tiposCultivo: this.tiposCultivo, tipoObjecto: this.tipoObjecto });
		});
	}

	setData(tipo) {
		this.tipo = tipo;
		this.showModal = true;
	}

	openModal() {
		this.showModal = true;
	}

	closeModalTipo(e) {
		this.showModal = e;
		$('#modalTipocultivo').modal('hide');
	}

	clearData(e) {
		this.tipo = e;
	}

	validationDeleteTipoCultivo(i) {
		Swal.fire({
			title: 'Advertencia',
			text: 'Deseas eliminar el tipo de cultivo? perderas toda la informacion almacenada ',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, Eliminar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
				this.deleteTipoCultivo(i);
			}
		});
	}

	saveTipoCultivo(tipoCultivo: TipoCultivo) {
		let i = Object.keys(this.tipoObjecto).length + 1;
		this.tipoObjecto[i] = tipoCultivo;

		let data = { tipos_cultivos: this.tipoObjecto };
		this.firebaseSvc.updateTipoCultivo(data).then(() => {
			$('#modalTipocultivo').modal('hide');
			Swal.fire("Bien Hecho!", "Datos almacenados correctamente", "success");
		}).catch(e => {
			console.error(e);
			Swal.fire("Upss!", "Error inesperado", "error");
		})
	}

	deleteTipoCultivo(i: number) {
		let cantidadCultivos: number = 0;
		let cantidadCiclos: number = 0;

		this.firebaseCultivosSvc.getCultivos().subscribe(cultivos => {
			cultivos.forEach(element => {
				if (element.id_tipo_cultivo == i) {
					cantidadCultivos += 1;
				}
			});
			this.firebaseCiclosSvc.getCiclos().subscribe(async (ciclos) => {
				ciclos.forEach((element: any) => {
					if (element.id_tipo_cultivo == i) {
						cantidadCiclos += 1;
					}
				});

				if (cantidadCiclos > 0 || cantidadCultivos > 0) {
					Swal.fire("Upss!", "No se puede eliminar el tipo de cultivo", "warning");
					return;
				} else {
					await this.fileManager.deleteFilesFolder(this.tipoObjecto[i].pathCultivo);
					await this.fileManager.deleteFilesFolder(this.tipoObjecto[i].pathIcono);

					let object = this.tipoObjecto;
					delete object[i];
					let data = { tipos_cultivos: object }
					this.firebaseSvc.updateTipoCultivo(data).then(() => {
						Swal.fire("Bien Hecho!", "Dato eliminado correctamente", "success");
					}).catch(e => {
						console.error(e);
						Swal.fire("Upss!", "Error inesperado", "warning");
					});
				}
			})
		})
	}

	updateTipoCultivo(tipo: TipoCultivo) {
		this.tipoObjecto[tipo.id] = tipo;
		let data = { tipos_cultivos: this.tipoObjecto };

		this.firebaseSvc.updateTipoCultivo(data).then(() => {
			$('#modalTipocultivo').modal('hide');
			$('#modalTipocultivo').modal('reset');
			Swal.fire("Bien Hecho!", "Datos actualizados correctamente", "success");
		}).catch(e => {
			console.error(e);
			Swal.fire("Upss!", "Error inesperado", "error");
		});
	}
}
