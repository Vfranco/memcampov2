import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-details-image-loader',
  templateUrl: './card-details-image-loader.component.html',
  styleUrls: ['./card-details-image-loader.component.css']
})
export class CardDetailsImageLoaderComponent implements OnInit {

  @Input() showLoader: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
