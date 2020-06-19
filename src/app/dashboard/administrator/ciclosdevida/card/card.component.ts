import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Ciclo } from './../../../../interface/Ciclo.interface';

import { CiclosService } from './../../../../services/ciclos.service';

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
		private ciclosService: CiclosService) {

		activedRoute.parent.params.subscribe(data => this.uid = data.uid);
	}

	ngOnInit() {
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
		}).then(result => {
			if( result ){
				if (this.validationDelete()) { 
					this.ciclosService.deleteCiclo(id).then(() => {
						this.ciclosService.deleteImgCiclo(this.ciclo.nombreCicloVida, this.ciclo.nombreImagenCicloVida).toPromise()
							.then(() => { console.log(`Imagen ${this.ciclo.nombreImagenCicloVida} eliminada con exito.`); });
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
