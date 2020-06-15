import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Ciclo } from './../../../../interface/Ciclo.interface';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	@Input() ciclo: Ciclo;
	uid: string = "";
	id: string  = "1";
	
	constructor(private activedRoute: ActivatedRoute, private router: Router) {
		activedRoute.parent.params.subscribe(data => this.uid = data.uid);
	}

	ngOnInit() {
	}

	details() {
		this.router.navigate([`/dashboard/mc/${this.uid}/details/${this.id}`])
	}

}
