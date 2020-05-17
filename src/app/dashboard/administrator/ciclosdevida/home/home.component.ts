import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	preloadData: boolean = false;

	constructor() {
		this.preloadData = true;
		setTimeout(() => {
			this.preloadData = false;
		}, 1000);
	}

	ngOnInit() {
	}

}
