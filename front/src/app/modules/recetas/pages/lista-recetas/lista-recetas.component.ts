import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/app/shared/services/recetas.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {

  recetas: any = null

  constructor(
    private recetasService: RecetasService
  ) { }

  ngOnInit(): void {
    this.recetasService.obtenRecetas()
      .subscribe(recetas => this.recetas = recetas)
  }

}
