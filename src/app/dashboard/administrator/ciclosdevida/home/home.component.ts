import { Component, OnInit } from '@angular/core';
import { CiclosService } from '@app/core/services';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	preloadData: boolean = false;
	ciclos: string[] = [];
	showModal: boolean = false;

	constructor(private ciclosService: CiclosService) { }

	ngOnInit() {
		this.getCiclos();
	}

	async getCiclos() {
		this.preloadData = true;
		this.ciclosService.getCiclos().subscribe(ciclo => {
			this.ciclos = ciclo
			this.preloadData = false;
		});

	}

	closeModal(e) {
		this.showModal = e;
	}
}
