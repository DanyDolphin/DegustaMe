import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecetasService } from 'src/app/shared/services/recetas.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {

  recetas: any = null
  categorias: string[] = []
  filtro = ''
  titulo = ''

  constructor(
    private recetasService: RecetasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get recetasFiltradas() {
    if (!this.recetas) return []
    return this.recetas.filter((receta: any)=> receta.tipo.includes(this.filtro))
  }

  ngOnInit(): void {
    this.cargarRecetas()
    
    this.recetasService.obtenCategorias()
      .subscribe((categorias: string[]) => this.categorias = categorias)
  }

  cargarRecetas() {
    console.log(this.router.url)
    switch(this.router.url) {
      case '/':
        this.titulo = 'Todas las recetas'
        this.recetasService.obtenRecetas()
          .subscribe(recetas => this.recetas = recetas)
        break;
      case '/recomendaciones':
        this.titulo = 'Estas son tus recomendaciones'
        this.recetasService.obtenRecomendaciones()
          .subscribe(recetas => this.recetas = recetas)
        break;
      default:
        this.activatedRoute.params.subscribe((params: Params) => {
          this.recetasService.buscarRecetas(decodeURIComponent(params['query']))
            .subscribe((recetas: any[]) => {
              this.titulo = `${recetas.length} resultados para "${decodeURIComponent(params['query'])}"`
              this.recetas = recetas
              console.log(recetas)
            })
        })
    }
    
  }

}
