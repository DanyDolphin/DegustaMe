import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetasRoutingModule } from './recetas-routing.module';
import { ListaRecetasComponent } from './pages/lista-recetas/lista-recetas.component';
import { DetallesRecetaComponent } from './pages/detalles-receta/detalles-receta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeguimientoRecetasComponent } from './pages/seguimiento-recetas/seguimiento-recetas.component';

@NgModule({
  declarations: [
    ListaRecetasComponent,
    DetallesRecetaComponent,
    SeguimientoRecetasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RecetasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecetasModule { }
