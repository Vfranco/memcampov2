
import { Component, OnInit, Input } from '@angular/core';
import { Ciclo } from '@app/core/interface/Ciclo.interface';

@Component({
	selector: 'app-card-details',
	templateUrl: './card-details.component.html',
	styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

	@Input() ciclo: Ciclo;
	@Input() respaldo: Ciclo;
	@Input() imagesRespaldo: string[];

	showModal: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	openModal() {
		this.showModal = true;
	}

	closeModal(e) {
		this.showModal = e;
	}

}
