import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from '../../../Interfaces/ingredient';
import { IngredientService } from '../../../Services/Ingredients/ingredient.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
ingredients!: Ingredient[];
addClick!: boolean;
selectedId!: number;

  constructor(
    public ingredientService: IngredientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ingredientService.getIngredientList()
    .subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
  }

  onEditClick(ingredientId: any){
    // this.editIndex = i + 1;
    this.selectedId = ingredientId;
    this.ingredientService.ingredientSelected = ingredientId;
  }


  onAddClick(){
    this.addClick = true;
  }

}
