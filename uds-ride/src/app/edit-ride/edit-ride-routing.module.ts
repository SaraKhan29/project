import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRidePage } from './edit-ride.page';

const routes: Routes = [
  {
    path: '',
    component: EditRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRidePageRoutingModule {}
