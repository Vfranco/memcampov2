import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ciclo } from '@app/core/interface/Ciclo.interface';
import { CiclosService } from '@app/core/services';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

	preloadData: boolean = false;
	ciclo: Ciclo;
	repaldo: Ciclo;
	imagesRespaldo: string[] = [];

	constructor(private ciclosService: CiclosService, private activatedRoute: ActivatedRoute) {
		this.init();
	}

	ngOnInit() {
	}

	init() {
		this.preloadData = true;
		this.activatedRoute.paramMap.subscribe(params => {
			this.ciclosService.getCicloById(params.get('id')).subscribe(data => {
				this.ciclo = data;
				this.repaldo = {
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
