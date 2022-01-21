import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../../../shared/services/recetas.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-seguimiento-recetas',
  templateUrl: './seguimiento-recetas.component.html',
  styleUrls: ['./seguimiento-recetas.component.css']
})
export class SeguimientoRecetasComponent implements OnInit {
  loading=true

  seguimiento: any =[]
  constructor(private servicioReceta: RecetasService) { }

  ngOnInit(): void {
    //obtengo el seguimiento de recetas del usuario
    this.loading = true
   this.servicioReceta.obtenSeguimientoRecetas().subscribe(
      seguimientos => {
        this.seguimiento = seguimientos.recetas
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

  eliminarseguimientoReceta(id:any){
    this.servicioReceta.eliminarSeguimientoReceta(id)
      .subscribe(
        data =>{
          //actualizo el renderizado de la pagina
          this.seguimiento =  this.seguimiento.filter((e:any)=> {return e['receta_id'] != id})
          this.seguimiento = [...this.seguimiento];
          Swal.fire(
            'Exito!',
            'Se ha eliminado el seguimiento de la receta',
            'success'
          )
        },
        err =>{
          Swal.fire({
            title: '<b>OoPs...</b>',
            html: '<h3>Algo salio mal <br>Por favor intentalo mas tarde </h3><br>',
            icon: 'error',
            iconColor: '#EC5569',
            confirmButtonColor: '#AA8DD8'
          })
        }
      )
  }

  eliminaSeguimiento(receta:any){
    console.log(receta)
    Swal.fire({
      title: 'Estas seguro que quieres eliminar este seguimiento?',
      icon: 'warning',
      iconColor: '#AA8DD8',
      showCancelButton: true,
      confirmButtonColor: '#AA8DD8',
      cancelButtonColor: '#EC5569',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarseguimientoReceta(receta.receta_id)
      }
    })
  }
}
