import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-resumen',
	templateUrl: './resumen.component.html',
	styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

	@Input() showLoader : boolean = false;
	@Input() data: any;

	constructor() { }

	ngOnInit() {
	}
}
