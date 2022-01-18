import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesRecetaComponent } from './pages/detalles-receta/detalles-receta.component';
import { ListaRecetasComponent } from './pages/lista-recetas/lista-recetas.component';
import  { SeguimientoRecetasComponent } from './pages/seguimiento-recetas/seguimiento-recetas.component';
const routes: Routes = [
  {
    path: '',
    component: ListaRecetasComponent
  },{
    path: 'seguimiento', 
    component: SeguimientoRecetasComponent
  },{
    path: 'recomendaciones',
    component: ListaRecetasComponent
  },{
    path: 'busqueda/:query',
    component: ListaRecetasComponent
  },{
    path: ':receta',
    component: DetallesRecetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetasRoutingModule { }
