import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exform!: FormGroup;
  loading=false;


  constructor(
    private servicioAuth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.exform = new FormGroup({
      'usuario' : new FormControl('', [Validators.required]),
      'contrasena' : new FormControl('', [Validators.required]),
    });
  }

  get usuario() {
    return this.exform.get('usuario')!;
  }

  get contrasena() {
    return this.exform.get('contrasena')!;
  }

  creaUsuario(){
    return {
      "usuario":this.usuario.value,
      "contrasena":this.contrasena.value,       
     }
  }

  onSubmit() {
    let usuario=this.creaUsuario();
    console.log(usuario);
    if (this.exform.invalid) {
      return;
    }
    this.loading=true;
    this.servicioAuth.iniciarSesion(usuario).subscribe(
      respuesta => {
        this.loading = false
        localStorage.setItem("token", respuesta.token)
        this.servicioAuth.isAuthenticated.next(true)
        console.log('entreeee')
        this.router.navigate(['/'])
      },
      error => {
        this.loading = false
        console.error(error)
        if (error.status === 401)
          Swal.fire('Lo siento', 'Usuario o contraseña incorrectos', 'error')
        else
          Swal.fire('Error del servidor', 'Por favor, intentalo mas tarde', 'error')
      }
    )
  }

}
