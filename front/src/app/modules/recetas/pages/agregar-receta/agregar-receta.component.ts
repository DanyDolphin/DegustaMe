import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})

export class AgregarRecetaComponent implements OnInit {
  ingredientes:any= []
  constructor() { }
  addRecipeForm!: FormGroup;


  ngOnInit(): void {
    this.ingredientes=[]
    this.addRecipeForm = new FormGroup({
      'recipe_name'        : new FormControl('', Validators.required),
      'recipe_img'         : new FormControl('', [Validators.required]),
      'recipe_ingredients' : new FormArray([]),
      'recipe_steps'       : new FormArray([]),
      'recipe_categories'  : new FormControl('', Validators.required),
      });
  }

  /* Regresa el objeto FormControl correspondiente al nombre el ingrediente */
  get name_get() {
    return this.addRecipeForm.get('recipe_name')!;
  }

  get img_get() {
    return this.addRecipeForm.get('recipe_img')!;
  }

  get get_ingredients_form(){
    return this.addRecipeForm.get('recipe_ingredients') as FormArray;
  }

  agregaIngrediente() {
    let longitud = this.ingredientes.length
    this.ingredientes.push(2);
 }
}
