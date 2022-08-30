import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../../../Interfaces/ingredient';
import { IngredientService } from '../../../Services/Ingredients/ingredient.service';

@Component({
  selector: 'app-ingredients-edition',
  templateUrl: './ingredients-edition.component.html',
  styleUrls: ['./ingredients-edition.component.css']
})
export class IngredientsEditionComponent implements OnInit {
ingredientId!: number;
currentIngredientName!: string;
editedName!: string;
editedIngredient!: Ingredient

  constructor(
    private router: Router,
    public ingredientService: IngredientService
  ) { }

  ngOnInit(): void {
    this.ingredientId = this.ingredientService.ingredientSelected;
    console.log(this.ingredientId);

    this.ingredientService.getIngredientById(this.ingredientId)
    .subscribe(
      (data: Ingredient) => {
        this.currentIngredientName = data.name;
      }
    )
  }

  //put zone.js:2680          PUT https://localhost:51234/api/Ingredient/edit5 405 (Method Not Allowed)
  save(){
    this.editedIngredient = {
      id: this.ingredientId,
      name: this.editedName
    }
    console.log(this.editedIngredient);
    this.ingredientService.editIngredient(this.ingredientId, this.editedIngredient)
    .subscribe(
      (res: any) => {
        alert(res.value);
        this.reloadCurrentRoute();
      }
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
