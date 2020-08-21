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

	constructor(
		private ciclosService: CiclosService,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.init();
	}

	init() {
		this.preloadData = true;
		this.activatedRoute.paramMap.subscribe(async (params) => {
			this.ciclosService.getCicloById(params.get('id')).subscribe(ciclo => {
				this.ciclo = ciclo;
				this.preloadData = false;
			});
		});
	}
}
