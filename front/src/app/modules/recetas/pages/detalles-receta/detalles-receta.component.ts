import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecetasService } from 'src/app/shared/services/recetas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-receta',
  templateUrl: './detalles-receta.component.html',
  styleUrls: ['./detalles-receta.component.css']
})
export class DetallesRecetaComponent implements OnInit {

  receta: any

  favorito = false;
  loadingFav = false;

  constructor(
    private recetasService: RecetasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get descripcion(): string {
    if (!this.receta) return ''
    return this.receta.descripcion
      .split(/•/g)
      .filter((paso: string) => !!paso)
      .map((paso: string) => `<li>${paso}</li>`)
      .join('')
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

  actualizaFavorito(){
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/login'])
      return
    }
      
    this.loadingFav = true;
    this.recetasService.verificaSeguimientoReceta(this.receta.receta_id).subscribe(
      respuesta => {
        this.favorito = respuesta.valor;
        });
    if(this.favorito)
      this.eliminaFavorito()
    else
      this.agregaFavorito()
  }

  agregaFavorito(){
    console.log("Haciendo peticion para agregar a seguimiento <" + this.receta.receta_id + ">")
    this.recetasService.agregarSeguimientoReceta(this.receta.receta_id).subscribe(
      respuesta => {
        this.loadingFav = false;
        this.favorito = true;
          Swal.fire({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            title: 'Exito',
            html: `<h3>La receta se ha agregado a tu lista de seguimiento</h3><br>`,
            icon: 'success'
          }) 
        },
      error => {
          this.loadingFav = false;
          console.error(error)
          Swal.fire('Error del servidor', 'Favor de intentarlo de nuevo', 'error')
        }
  );
  }

  eliminaFavorito(){
    console.log("Haciendo peticion para eliminar de seguimiento <" + this.receta.receta_id + ">")
    this.recetasService.eliminarSeguimientoReceta(this.receta.receta_id).subscribe(
      respuesta => {
          this.favorito = false;
          this.loadingFav = false;
          Swal.fire({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            title: 'Exito',
            html: `<h3>La receta se ha eliminado de tu lista de seguimiento</h3><br>`,
            icon: 'success'
          }) 
        },
      error => {
        this.loadingFav = false;
          console.error(error)
          Swal.fire('Error del servidor', 'Favor de intentarlo de nuevo', 'error')
        }
  );
  }

}
