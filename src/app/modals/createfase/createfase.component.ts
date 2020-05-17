import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-createfase',
	templateUrl: './createfase.component.html',
	styleUrls: ['./createfase.component.css']
})
export class CreatefaseComponent implements OnInit {

	buttomText: string = "";

	constructor() {
		this.init();
	}

	ngOnInit() {
	}

	init(data?) {
		if (data) {
			this.buttomText = "Editar fase";
		} else {
			this.buttomText = "Agregar fase";
		}
	}

}
