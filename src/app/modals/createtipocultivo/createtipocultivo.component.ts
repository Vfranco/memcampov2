import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FileManagerService, TiposcultivoService } from '@app/core/services';
import { TipoCultivo } from '@app/core/interface/tipocultivo.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
	selector: 'app-createtipocultivo',
	templateUrl: './createtipocultivo.component.html',
	styleUrls: ['./createtipocultivo.component.css']
})
export class CreatetipocultivoComponent implements OnInit {

	@Output() create = new EventEmitter<TipoCultivo>();
	@Output() update = new EventEmitter<TipoCultivo>();
	@Output() clear = new EventEmitter<TipoCultivo>();
	@Output() closeModal = new EventEmitter<boolean>();
	@Input() id: string = "";
	tipo: TipoCultivo = {
		id: '',
		imgCultivo: '',
		pathCultivo: '',
		imgIcono: '',
		pathIcono: '',
		nombre: ''
	}
	public fileImg: File = null;
	public fileIcon: File = null;
	public base64Img: string;
	public base64Icon: string;


	constructor(
		private fileManage: FileManagerService,
		private firebaseSvc: TiposcultivoService
	) { }

	ngOnInit() {
		this.init();
	}

	init() {
		if (this.id != "" && this.id != undefined) {
			this.firebaseSvc.getTiposCultivo().subscribe((tipocultivo) => {
				let tipoAcutalizar = tipocultivo.tiposA.filter(tipoCultivo => this.id === tipoCultivo.id);
				this.tipo = tipoAcutalizar[0];
				console.log(this.tipo);
			})
		}
	}

	selectedFile(e) {
		if (e.target.files[0]) {
			this.fileImg = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.base64Img = e.target.result;
			}
			reader.readAsDataURL(this.fileImg);
		} else {
			this.fileImg = null;
			this.base64Img = "";
		}
	}

	selectedFileIcon(e) {
		if (e.target.files[0]) {
			this.fileIcon = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.base64Icon = e.target.result;
			}
			reader.readAsDataURL(this.fileIcon);
		} else {
			this.fileIcon = null;
			this.base64Icon = "";
		}
	}

	closeModalTipo() {
		this.clearData();
		this.closeModal.emit(false);
		this.clear.emit(this.tipo);
	}

	validation(type: number) {
		if (type == 1) {
			if (this.tipo.nombre != '' && this.fileImg != null && this.fileIcon != null) {
				return true;
			} else {
				return false;
			}
		}

		if (type == 2) {
			if (this.tipo.nombre != '') {
				return true;
			} else {
				return false;
			}
		}
	}

	clearData() {
		this.id = '';
		this.base64Img = "";
		this.base64Icon = "";
		this.tipo = {
			id: '',
			imgCultivo: '',
			pathCultivo: '',
			imgIcono: '',
			pathIcono: '',
			nombre: ''
		}
	}

	async saveData() {
		if (this.validation(1)) {
			this.tipo.pathCultivo = `Tipos de cultivos/${this.tipo.nombre}/${this.fileImg.name}`;
			await this.fileManage.upload(this.fileImg, this.tipo.pathCultivo);
			await this.fileManage.getUrlFileInfo(this.tipo.pathCultivo).toPromise().then(url => this.tipo.imgCultivo = url);

			this.tipo.pathIcono = `Tipos de cultivos/${this.tipo.nombre}/${this.fileIcon.name}`;
			await this.fileManage.upload(this.fileIcon, this.tipo.pathIcono)
			await this.fileManage.getUrlFileInfo(this.tipo.pathIcono).toPromise().then(url => this.tipo.imgIcono = url);
			this.create.emit(this.tipo);
			this.clearData()
		} else {
			Swal.fire("Upss", "Por favor llene todos los campos", "warning");
		}
	}

	async updateData() {
		Swal.fire({
			title: 'Advertencia',
			text: 'Deseas Actualizar el tipo de cultivo?',
			icon: 'info',
			showCancelButton: true,
			confirmButtonText: 'Si, Actualizar',
			cancelButtonText: 'Cancelar'
		}).then(async (result) => {
			if (result.value) {
				if (this.validation(2)) {
					if (this.fileImg != null) {
						await this.fileManage.deleteFilesFolder(this.tipo.pathCultivo);
						this.tipo.pathCultivo = `Tipos de cultivos/${this.tipo.nombre}/${this.fileImg.name}`;
						await this.fileManage.upload(this.fileImg, this.tipo.pathCultivo);
						await this.fileManage.getUrlFileInfo(this.tipo.pathCultivo).toPromise().then(url => this.tipo.imgCultivo = url);
					}

					if (this.fileIcon != null) {
						await this.fileManage.deleteFilesFolder(this.tipo.pathIcono);
						this.tipo.pathIcono = `Tipos de cultivos/${this.tipo.nombre}/${this.fileIcon.name}`;
						await this.fileManage.upload(this.fileIcon, this.tipo.pathIcono);
						await this.fileManage.getUrlFileInfo(this.tipo.pathIcono).toPromise().then(url => this.tipo.imgIcono = url);
					}
					this.update.emit(this.tipo);
					this.closeModalTipo();
				} else {
					Swal.fire("Upss", "Por favor llene todos los campos", "warning");
				}
			}
		});
	}
}
