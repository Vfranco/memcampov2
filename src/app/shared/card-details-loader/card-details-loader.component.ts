import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-details-loader',
  templateUrl: './card-details-loader.component.html',
  styleUrls: ['./card-details-loader.component.css']
})
export class CardDetailsLoaderComponent implements OnInit {

  @Input() showLoader: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
