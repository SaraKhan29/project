import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import {IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;

  constructor(
    private navControl: NavController
  ) { }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  ngOnInit() {
  }

  chatTest() {
    this.navControl.navigateForward('chat');
  }

}
