import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

	password: string = '';
	confirm: string = '';

	constructor() { }

	ngOnInit() {
	}

	resetPassword(frmrReset: NgForm){

	}

}
