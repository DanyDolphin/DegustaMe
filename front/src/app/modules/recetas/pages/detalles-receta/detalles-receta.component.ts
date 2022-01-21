import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecetasService } from 'src/app/shared/services/recetas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-receta',
  templateUrl: './detalles-receta.component.html',
  styleUrls: ['./detalles-receta.component.css']
})
export class DetallesRecetaComponent implements OnInit {

  receta: any

  constructor(
    private recetasService: RecetasService,
    private activatedRoute: ActivatedRoute
  ) { }

  get descripcion(): string {
    return this.receta?.descripcion?.replace(/\n/g, '<br/>')
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recetasService.obtenReceta(params['id'])
        .subscribe(receta => {
          this.receta = receta
          console.log(receta)
        })
    })
  }

  agregaFavorito(){
    console.log(this.receta)
  }

}
