import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesRecetaComponent } from './pages/detalles-receta/detalles-receta.component';
import { ListaRecetasComponent } from './pages/lista-recetas/lista-recetas.component';
import { AgregarRecetaComponent } from './pages/agregar-receta/agregar-receta.component';

const routes: Routes = [
  {
    path: '',
    component: ListaRecetasComponent
  },
  {
    path: 'agregar',
    component: AgregarRecetaComponent
  },
  { 
    path: ':receta',
    component: DetallesRecetaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetasRoutingModule { }
