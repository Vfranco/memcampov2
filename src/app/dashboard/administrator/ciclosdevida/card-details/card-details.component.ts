import { Ciclo } from './../../../../interface/Ciclo.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  @Input() ciclo          : Ciclo;
  @Input() respaldo       : Ciclo;
  @Input() imagesRespaldo : string[];

  constructor() { }

  ngOnInit() {
  }

}
