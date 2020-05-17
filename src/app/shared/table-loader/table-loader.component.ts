import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-loader',
  templateUrl: './table-loader.component.html',
  styleUrls: ['./table-loader.component.css']
})
export class TableLoaderComponent implements OnInit {

  @Input() showLoader: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
