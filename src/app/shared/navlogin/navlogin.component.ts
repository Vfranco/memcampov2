import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navlogin',
	templateUrl: './navlogin.component.html',
	styleUrls: ['./navlogin.component.css']
})
export class NavloginComponent implements OnInit {

	titleNameApp :string = 'AgroSabanas | Memoria de Campo';

	constructor() { }

	ngOnInit() {
	}

}
