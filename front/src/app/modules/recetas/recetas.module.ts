import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetasRoutingModule } from './recetas-routing.module';
import { ListaRecetasComponent } from './pages/lista-recetas/lista-recetas.component';
import { DetallesRecetaComponent } from './pages/detalles-receta/detalles-receta.component';


@NgModule({
  declarations: [
    ListaRecetasComponent,
    DetallesRecetaComponent
  ],
  imports: [
    CommonModule,
    RecetasRoutingModule
  ]
})
export class RecetasModule { }
