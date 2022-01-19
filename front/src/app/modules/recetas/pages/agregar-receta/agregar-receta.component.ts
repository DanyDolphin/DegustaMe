import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})

export class AgregarRecetaComponent implements OnInit {
  constructor() { }

  // Tipos de medición de cantidades para ingredientes.
  tiposDeMedicion=['piezas','gramos','kilos','onzas','manojos','cucharadas','mililitros','al gusto'];
  // Tipos de medición de cantidades que no requiere una cantidad numérica.
  tiposDeMedicionSinCantidad=['al gusto'];

  // Valores formulario del componente.
  formAgregaReceta = {
      nombre: "",
      imagen: "",
      ingredientes: new Array<any>(),
      pasos: new Array<string>(),
      categorias: ""
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
    var nuevoIngrediente = { nombre: "", tipo_medicion: this.tiposDeMedicion[0], cantidad: 1 }
    this.formAgregaReceta.ingredientes.push(nuevoIngrediente);
 }

  /* Elimina un campo de ingrediente del formulario de la receta según el índice recibido */
  eliminaIngrediente( index: number ){
    this.formAgregaReceta.ingredientes.splice(index,1);
  }

  /* Agrega un nuevo campo de ingrediente al formulario de la receta */
  agregaPaso() {
    var nuevoPaso = "";
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


}
