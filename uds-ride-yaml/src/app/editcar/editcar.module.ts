import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcarPageRoutingModule } from './editcar-routing.module';

import { EditcarPage } from './editcar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcarPageRoutingModule
  ],
  declarations: [EditcarPage]
})
export class EditcarPageModule {}
