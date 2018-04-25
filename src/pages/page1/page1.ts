import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  @ViewChild('menuToggleButton')
  menuToggleButton: HTMLButtonElement;

  constructor() {

  }

}
