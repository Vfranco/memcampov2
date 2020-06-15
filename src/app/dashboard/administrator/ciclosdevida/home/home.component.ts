import { CiclosService } from './../../../../services/ciclos.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	preloadData: boolean = false;
	ciclos: string[] = [];

	constructor(private ciclosService: CiclosService) {
		this.getCiclos();
	}

	ngOnInit() {
	}

	getCiclos() {
		this.preloadData = true;
		this.ciclosService.getCiclos().subscribe(data => {
			this.ciclos = data;
			this.preloadData = false;
		});
	}

}
