import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AseguradoEditPageRoutingModule } from './asegurado-edit-routing.module';

import { AseguradoEditPage } from './asegurado-edit.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AseguradoEditPageRoutingModule
  ],
  declarations: [AseguradoEditPage]
})
export class AseguradoEditPageModule {}
