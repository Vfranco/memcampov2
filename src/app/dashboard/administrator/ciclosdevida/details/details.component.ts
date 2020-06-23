import { Ciclo } from './../../../../interface/Ciclo.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CiclosService } from './../../../../services/ciclos.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	preloadData	   : boolean  = false;
	ciclo		   : Ciclo;
	repaldo        : Ciclo   ;
	imagesRespaldo : string[] = [];
	id			   : string;

	constructor(
		private ciclosService: CiclosService,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.init();
	}

	init() {
		this.preloadData = true;
		this.activatedRoute.paramMap.subscribe(params => {
			this.id = params.get('id');
			this.ciclosService.getCicloById(this.id).subscribe(data => {
				this.ciclo 		 = data;
				this.repaldo     = {
					nombreCicloVida: data['nombreCicloVida'],
					url_ciclo_vida: data['url_ciclo_vida'],
					nombreImagenCicloVida: data['nombreImagenCicloVida'],
					nombreTipoCultivo: data['nombreTipoCultivo'],
					descripcion: data['descripcion'],
					id_tipo_cultivo: data['id_tipo_cultivo']
				}
				this.preloadData = false;
				this.imagesRespaldo.push(this.repaldo.nombreImagenCicloVida);
			});
		});
	}

}
