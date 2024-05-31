import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AseguradoListPage } from './asegurado-list.page';

const routes: Routes = [
  {
    path: '',
    component: AseguradoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AseguradoListPageRoutingModule {}
