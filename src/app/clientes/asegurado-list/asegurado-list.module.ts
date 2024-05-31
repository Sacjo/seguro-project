import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AseguradoListPageRoutingModule } from './asegurado-list-routing.module';

import { AseguradoListPage } from './asegurado-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AseguradoListPageRoutingModule
  ],
  declarations: [AseguradoListPage]
})
export class AseguradoListPageModule {}
