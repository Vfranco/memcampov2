import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	menuOptions: any = [];
	userrol:number;

	constructor() { }

	ngOnInit() {
	}

	rol(event){
		this.userrol = event;
	}
}
