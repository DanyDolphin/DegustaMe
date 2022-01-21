import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from 'src/app/shared/services/recetas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})

export class AgregarRecetaComponent implements OnInit {
  constructor(
    private servicioReceta: RecetasService,
    private router: Router
  ){}

  // Tipos de medición de cantidades para ingredientes.
  tiposDeMedicion=['piezas','gramos','kilos','onzas','manojos','cucharadas','mililitros','al gusto'];
  // Tipos de medición de cantidades que no requiere una cantidad numérica.
  tiposDeMedicionSinCantidad=['al gusto'];

  // Variable que nos dice si existen datos inválidos ingresados al formulario.
  invalido = false;

  // Valores formulario del componente.
  formAgregaReceta = {
      nombre: "",
      imagen: "",
      tiempo: 0,
      ingredientes: new Array<any>(),
      pasos: new Array<any>(),
      categorias: ""
  }

  formErrores = {
      nombre: "",
      imagen: "",
      tiempo: "",
      ingredientes: "",
      pasos: "",
      categorias: "",
      terminos: ""
  }

  aceptaTerminos = false;


  ngOnInit(): void {
    
  }


  /* Verifica si el tipo de medición recibida requiere o no cantidad numérica */
  medicionUsaCantidad( tipoMedicion: string ){
    return !(this.tiposDeMedicionSinCantidad.includes(tipoMedicion))
  }

  /* Agrega un nuevo campo de ingrediente al formulario de la receta */
  agregaIngrediente() {
    let nuevoIngrediente = { nombre: "", medida: this.tiposDeMedicion[0], cantidad: 1 }
    this.formAgregaReceta.ingredientes.push(nuevoIngrediente);
 }

  /* Elimina un campo de ingrediente del formulario de la receta según el índice recibido */
  eliminaIngrediente( index: number ){
    this.formAgregaReceta.ingredientes.splice(index,1);
  }

  /* Agrega un nuevo campo de ingrediente al formulario de la receta */
  agregaPaso() {
    let nuevoPaso = { descripcion:"" };
    this.formAgregaReceta.pasos.push(nuevoPaso);
 }

  /* Agrega un nuevo campo de ingrediente al formulario de la receta */
  eliminaPaso() {
    this.formAgregaReceta.pasos.pop();
 }

  // Carga la imagen que el usuario selecciona en la ventana de archivos
  // y la agrega localmente a los datos de imagen del formulario.
  cargaImagen(event: any) {
    let imagen = event.target.files[0];
    if (imagen) {
      let reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload = (e: any) => { this.formAgregaReceta.imagen = e.target.result; }
    }
  }

  /* Agrega un nuevo campo de ingrediente al formulario de la receta */
  eliminaImagen() {
    this.formAgregaReceta.imagen = "";
 }

  /* Verifica que el nombre de la receta sea válido */
  valida_campo_nombre(){
    if( this.formAgregaReceta.nombre.trim() == "" ) {
      this.formErrores.nombre = "Debes otorgarle un nombre a tu receta."
      return false;
    }
    if (this.formAgregaReceta.nombre.length >= 100 ){
      this.formErrores.nombre = "El nombre de tu receta es muy largo."
      return false;
    }
    this.formErrores.nombre = "";
    return true;
  }

  /* Verifica que los datos de los ingredientes de la receta sean válidos */
  valida_campo_ingredientes(){

    if(this.formAgregaReceta.ingredientes.length == 0){
      this.formErrores.ingredientes = "Debes agregar al menos un ingrediente."
      return false;
    }
    let err_ingrediente = false;
    this.formAgregaReceta.ingredientes.forEach( ingrediente => {
      if(ingrediente.nombre.trim() == ""){
        err_ingrediente = true;
        this.formErrores.ingredientes = "Verifica que todos tus ingredientes tengan nombre."
      }
      if(ingrediente.cantidad <= 0 ){
        err_ingrediente = true;
        this.formErrores.ingredientes = "Verifica que tus ingredientes tengan cantidades válidas"
      }

    })
    if( !err_ingrediente){
      this.formErrores.ingredientes = "";
    }
    return !err_ingrediente;
  }


  /* Verifica que los datos de los pasos de la receta sean válidos */
  valida_campo_pasos(){

    if(this.formAgregaReceta.pasos.length == 0){
      this.formErrores.pasos = "Debes agregar al menos un paso a la receta."
      return false;
    }
    let err_paso = false;
    this.formAgregaReceta.pasos.forEach( paso => {
      if(paso.descripcion.trim() == ""){
        err_paso = true;
        this.formErrores.pasos = "Verifica que ninguno de tus pasos esté vacío."
      }
    })
    if( !err_paso){
      this.formErrores.pasos = "";
    }
    return !err_paso;
  }

  /* Verifica que las categorias de la receta sean válidas */
  valida_campo_categorias(){
    if( this.formAgregaReceta.categorias.trim() == "" ) {
      this.formErrores.categorias = "Debes otorgarle al menos una categoría a tu receta."
      return false;
    }
    if (this.formAgregaReceta.nombre.length >= 100 ){
      this.formErrores.categorias = "Debes elegir menos categorias"
      return false;
    }
    this.formErrores.categorias = "";
    return true;
  }

    /* Verifica que las categorias de la receta sean válidas */
    valida_campo_imagen(){
      if( this.formAgregaReceta.imagen.trim() == "" ) {
        this.formErrores.imagen = "Debes subir una imagen a tu receta."
        return false;
      }
      this.formErrores.imagen = "";
      return true;
    }

    /* Verifica que las categorias de la receta sean válidas */
    valida_campo_tiempo(){
      if( this.formAgregaReceta.tiempo <= 0 ||  this.formAgregaReceta.tiempo > 200 ) {
        this.formErrores.tiempo = "Verifica que el tiempo necesario sea un número entero entre 1 y 200"
        return false;
      }
      this.formErrores.tiempo = "";
      return true;
    }

    redondea_tiempo(){
      this.formAgregaReceta.tiempo = Math.round(this.formAgregaReceta.tiempo);
    }

    /* Verifica que los terminos y condiciones estén aceptados */
    valida_campo_terminos(){
    if( !this.aceptaTerminos ) {
      this.formErrores.terminos = "Debes aceptar los términos y condiciones"
      return false;
    }
    this.formErrores.terminos = "";
    return true;
  }
  


  subirReceta() {

    console.log(this.formAgregaReceta)

    let valido = true;
    valido = this.valida_campo_nombre() && valido;
    valido = this.valida_campo_ingredientes() && valido;
    valido = this.valida_campo_pasos() && valido;
    valido = this.valida_campo_categorias() && valido;
    valido = this.valida_campo_imagen() && valido;
    valido = this.valida_campo_tiempo() && valido;
    valido = this.valida_campo_terminos() && valido;
    
    if (!valido){
      console.log("Los datos del formulario están incompletos o son inválidos")
      console.log(this.formErrores)
      return;
    }

    this.servicioReceta.agregaReceta(this.formAgregaReceta).subscribe(
        respuesta => {
            Swal.fire({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
              title: 'Exito',
              html: `<h3>La receta se ha <br><b>registrado exitosamente</b></h3><br>`,
              icon: 'success'
            }) 
            this.router.navigate(['']);
          },
        error => {
            console.error(error)
            Swal.fire('Error del servidor', 'Favor de intentarlo de nuevo', 'error')
          }
    );
  }


}
