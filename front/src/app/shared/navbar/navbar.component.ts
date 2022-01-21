import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn = false
  busqueda = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.isLoggedIn = !!token

    this.authService.isAuthenticated.subscribe(v => this.isLoggedIn = v)
  }

  onSearchSubmit(event: Event) {
    event.preventDefault()
    if (this.busqueda)
      this.router.navigate([`/busqueda/${encodeURIComponent(this.busqueda)}`])
  }

  cerrarSesion() {
    Swal.fire({
      title: 'Cerrar sesión',
      text: 'Quieres cerar sesión?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then(v => {
      if (v.isConfirmed) {
        localStorage.clear()
        this.authService.isAuthenticated.next(false)
        this.router.navigate(['/'])
      }
    })
  }

  getPerfil() {
    console.log('getPerfil')
    this.authService.obtenPerfil().subscribe(
      respuesta => {
      console.log(respuesta)
      Swal.fire({
        title: `<b>Mi Perfil</b>`,
        html: `<h3>Hola, ${respuesta.username } </h3><br>
              <h2>Esta es tu información:</h2>
              <br>
                <p>Edad: ${respuesta.edad} </p>
                <p>Peso: ${respuesta.peso}</p>
                <p>Estatura: ${respuesta.altura}</p>
                <p>Tipo de dieta: ${respuesta.dieta}</p>
              `,
        icon: 'info',
        iconColor: '#FFFFF',
        confirmButtonColor: '#AA8DD8'
      }) 
    },
    error => {
      console.error(error)
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

}
