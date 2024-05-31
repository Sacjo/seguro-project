import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AseguradoEditPage } from './asegurado-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AseguradoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AseguradoEditPageRoutingModule {}
