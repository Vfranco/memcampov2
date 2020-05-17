import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

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
