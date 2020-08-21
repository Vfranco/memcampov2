import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { CiclosService, FileManagerService } from '@app/core/services';
import { Ciclo } from '@app/core/interface/Ciclo.interface';

import Swal from 'sweetalert2';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	@Input() ciclo: Ciclo;
	uid: string = "";

	constructor(
		private activedRoute: ActivatedRoute,
		private router: Router,
		private fileMager: FileManagerService,
		private ciclosService: CiclosService) { }

	ngOnInit() {
		this.activedRoute.parent.params.subscribe(data => this.uid = data.uid);
	}

	validationDelete() {
		if (this.ciclo.fases.length > 0) {
			Swal.fire('¡Abvertencia!', 'Este ciclo de vida tiene fases asociadas', 'warning')
			return false;
		} else {
			return true;
		}
	}

	deleteCiclo(id: string) {
		Swal.fire({
			title: '¡Abvertencia!',
			text: `'¿Deseas eliminar el  ${this.ciclo.nombreCicloVida} ?`,
			icon: 'warning',
			confirmButtonText: 'Sí, eliminar',
			confirmButtonColor: '#dd3333',
			cancelButtonText: 'Cancelar',
			showCancelButton: true
		}).then(async (result) => {
			if (result.value) {
				if (this.validationDelete()) {
					await this.fileMager.deleteFilesFolder(this.ciclo.path);
					this.ciclosService.deleteCiclo(id).then(() => {
						Swal.fire('¡Bien!', 'Ciclo eliminado con exito.', 'success');
					});
				}
			}
		})
	}

	details() {
		this.router.navigate([`/dashboard/mc/${this.uid}/details/${this.ciclo.id}`]);
	}
}
