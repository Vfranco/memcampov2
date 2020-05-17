import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-card-loader',
	templateUrl: './card-loader.component.html',
	styleUrls: ['./card-loader.component.css']
})
export class CardLoaderComponent implements OnInit {

	@Input() showLoader:boolean = false;

	constructor() { }

	ngOnInit() {
	}
}
