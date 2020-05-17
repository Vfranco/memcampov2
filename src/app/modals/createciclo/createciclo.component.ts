import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-createciclo',
	templateUrl: './createciclo.component.html',
	styleUrls: ['./createciclo.component.css']
})
export class CreatecicloComponent implements OnInit {

	id: string;
	buttomText: string = "";

	constructor(private activatedRouter: ActivatedRoute) {
		this.init();
	}

	ngOnInit() {
	}

	init() {
		this.activatedRouter.paramMap.subscribe(params => this.id = params.get('id'));

		if (this.id) {
			this.buttomText = "Editar ciclo";
		} else {
			this.buttomText = "Crear ciclo";
		}
	}
}
