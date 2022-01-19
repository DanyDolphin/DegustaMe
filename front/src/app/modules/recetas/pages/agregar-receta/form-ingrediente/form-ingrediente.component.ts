import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-ingrediente',
  templateUrl: './form-ingrediente.component.html',
  styleUrls: ['./form-ingrediente.component.css']
})
export class FormIngredienteComponent implements OnInit {

  // Tipos de medición de cantidades para ingredientes.
  measurements_types=['piezas','gramos','kilos','onzas','manojos','cucharadas','mililitros','al gusto'];
  // Tipos de medición de cantidades que no requiere una cantidad numérica.
  measurements_types_without_amount=['al gusto'];

  // Valores formulario del componente ( nombre, tipo de medición y cantidad del ingrediente en cuestión)
  ingredient = {
    name: "",
    measurement_type: this.measurements_types[0],
    amount: 0
  }

  constructor() { }

  ngOnInit(): void {
  }
  
  /* Verifica si el tipo de medición recibida requiere o no cantidad numérica */
  measurement_uses_amount( measurement: string ){
    return !(this.measurements_types_without_amount.includes(measurement))
  }

  /* Regresa el nombre del ingrediente */
  get_ingredient_name(){
    return this.ingredient.name;
  }

  /* Regresa la cantidad del ingrediente */
  get_ingredient_amount(){
    return this.ingredient.amount;
  }

  /* Regresa la el tipo de medición del ingrediente */
  get_ingredient_measurement_type(){
    return this.ingredient.measurement_type;
  }

  get datos (){
    return { "nombre" : this.get_ingredient_name(),
             "measurement_type": this.get_ingredient_measurement_type(),
             "amount": this.get_ingredient_amount()
            }
  }
}
