import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../../../shared/services/recetas.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-mis-recetas',
  templateUrl:'./mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.css']
})
export class MisRecetasComponent implements OnInit {
  loading=true

  misrecetas: any =[]

  constructor(
    private servicioReceta: RecetasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //obtengo el seguimiento de recetas del usuario
    this.loading = true
    this.servicioReceta.obtenMisRecetas().subscribe(
      response => {
        this.misrecetas = response.recetas
        console.log(this.misrecetas)
        this.loading = false
      },
      error => {
        this.loading = false
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer: 'Intenta de nuevo',
          iconColor: '#EC5569',
          confirmButtonColor: '#AA8DD8'
        })
      }

    )
  }

  formatea_desc( text: string){
    return text.substring(1,100) + "..."
  }


  seguroEliminarReceta(receta:any){
    Swal.fire({
      icon: 'warning',
      title: 'Seguro de que deseas eliminar la receta?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarReceta(receta)
      }
    })
  }

  eliminarReceta(receta:any){
    let id_receta = receta.receta_id
    this.servicioReceta.eliminarReceta(id_receta)
      .subscribe(
        data =>{
          this.misrecetas =  this.misrecetas.filter((e:any)=> {return e['receta_id'] != id_receta})
          this.misrecetas = [...this.misrecetas];
          Swal.fire(
            'Exito!',
            'Se ha eliminado la receta con éxito',
            'success'
          )
        },
        err =>{
          Swal.fire({
            title: '<b>OoPs...</b>',
            html: '<h3>Algo salio mal <br>Por favor intentelo más tarde </h3><br>',
            icon: 'error',
            iconColor: '#EC5569',
            confirmButtonColor: '#AA8DD8'
          })
        }
      )
  }

  agregarReceta(){
    this.router.navigate(['agregar']);
  }

}
