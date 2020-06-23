import { Ciclo } from './../../../../interface/Ciclo.interface';
import { CreatefaseComponent } from './../../../../modals/createfase/createfase.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Fases } from './../../../../interface/fases.interface';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	@Input() ciclo: Ciclo;
	@Input() fases: Fases[];
	@Input() id   : string;
	@ViewChild('createFase', { static: true }) createFase: CreatefaseComponent

	constructor() { }

	ngOnInit() {
		console.log(this.id);
		console.log(this.ciclo);
		console.log(this.fases);
	}

	openModal(){
		this.createFase.init();
	}

}
