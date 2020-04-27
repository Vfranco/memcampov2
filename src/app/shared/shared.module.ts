import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top/top.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [TopComponent, MenuComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
