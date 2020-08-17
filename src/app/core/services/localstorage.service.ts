import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

	constructor() { }

	create(prop, data){
		return localStorage.setItem(prop, JSON.stringify(data));
	}

	read(prop: string){
		return JSON.parse(localStorage.getItem(prop));
	}

	remove(prop){
		return localStorage.removeItem(prop);
	}
}
