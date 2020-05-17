import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-loader',
  templateUrl: './toolbar-loader.component.html',
  styleUrls: ['./toolbar-loader.component.css']
})
export class ToolbarLoaderComponent implements OnInit {

  @Input() rol:string = '';

  constructor() { }

  ngOnInit() {
  }

}
