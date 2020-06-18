import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-details-image',
  templateUrl: './card-details-image.component.html',
  styleUrls: ['./card-details-image.component.css']
})
export class CardDetailsImageComponent implements OnInit {

  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
