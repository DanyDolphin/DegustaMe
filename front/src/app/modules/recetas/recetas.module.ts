import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetasRoutingModule } from './recetas-routing.module';
import { ListaRecetasComponent } from './pages/lista-recetas/lista-recetas.component';
import { DetallesRecetaComponent } from './pages/detalles-receta/detalles-receta.component';
import { AgregarRecetaComponent } from './pages/agregar-receta/agregar-receta.component';
import { FormIngredienteComponent } from './pages/agregar-receta/form-ingrediente/form-ingrediente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaRecetasComponent,
    AgregarRecetaComponent,
    DetallesRecetaComponent,
    FormIngredienteComponent
    
  ],
  imports: [
    CommonModule,
    RecetasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecetasModule { }
