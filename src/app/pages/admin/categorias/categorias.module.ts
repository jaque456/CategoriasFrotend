import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { MaterialModule } from '@app/material.modules';


@NgModule({
  declarations: [
    CategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    MaterialModule
  ]
})
export class CategoriasModule { }
