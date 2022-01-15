import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  padecimientos_val=['Diabetes','Hipertencion','Obesidad','Ninguno'];
  dieta_val=['Vegana','Normal','Vegetariana'];
  generos=['Masculino','Femenino','Otro'];
  accept=false;
  exform!: FormGroup;
  exform1!: FormGroup;
  loading=false;
  usernameDuplicado=false;
  correoDuplicado=false;

  constructor(
    private servicioAuth: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.exform = new FormGroup({
      'username' : new FormControl('', Validators.required),
      'correo' : new FormControl('', [Validators.required, Validators.email]),
      'contrasena' : new FormControl('',[Validators.required]),
      'contrasena_val' : new FormControl('', Validators.required),
      'genero' : new FormControl('', Validators.required),
        });


    this.exform1 = new FormGroup({
      'altura' : new FormControl('', Validators.required),
      'peso' : new FormControl('', Validators.required),
      'edad' : new FormControl('', Validators.required),
      'padecimientos' : new FormControl('', Validators.required),
      'dieta' : new FormControl('', Validators.required),
      'terminos' : new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.exform.get('username')!;
  }
  get correo() {
    return this.exform.get('correo')!;
  }

  get contrasena() {
    return this.exform.get('contrasena')!;
  }

  get contrasena_val() {
    return this.exform.get('contrasena_val')!;
  }

  get genero() {
    return this.exform.get('genero')!;
  }

  get altura() {
    return this.exform1.get('altura')!;
  }

  get peso() {
    return this.exform1.get('peso')!;
  } 

  get edad() {  
    return this.exform1.get('edad')!;
  } 
  
  get padecimientos() { 
    return this.exform1.get('padecimientos')!;
  }

  get dieta() { 
    return this.exform1.get('dieta')!;
  }
  
  get terminos() {
    return this.exform1.get('terminos')!;
  }

  acceptTerms(e:any){
    this.accept=e.target.checked;
  }


  creaUsuario(){
    return {
      "usuario":this.username.value,
      "correo":this.correo.value,
      "contrasena":this.contrasena.value,
      "genero":this.genero.value,
      "altura":this.altura.value,
      "peso":this.peso.value,
      "edad":this.edad.value,
      "padecimiento":this.padecimientos.value,
      "tipo_dieta":this.dieta.value        
     }
  }
    

  onSubmit() {

    let usuario=this.creaUsuario(); 
  
    if (this.exform.invalid || this.exform1.invalid ) {
      return;
    }

    this.loading = true;
    this.servicioAuth.registrarse(usuario)
      .subscribe(
          data => {
            this.loading=false
            Swal.fire({
              title: 'Exito',
              html: `<h3>Registro<b>Exitoso</b></h3><br>`,
              icon: 'success'
            }) 
            this.router.navigate(['/auth/login']);
          },
          err => {
            this.loading = false;
            if(err.status===400){
                err.error.includes("correo") ? this.correoDuplicado=true: this.usernameDuplicado=true
              }
            else{
              Swal.fire({
                title: '<b>OoPs...</b>',
                html: '<h3>Algo salio mal <br>Por favor intentalo mas tarde </h3><br>', 
                icon: 'error'
              }) 
            }

          });

  }
 




}
