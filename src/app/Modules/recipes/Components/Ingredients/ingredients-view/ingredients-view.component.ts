import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientComposition, measurementUnits } from '../../../Interfaces/ingredient-composition';
import { Recipe } from '../../../Interfaces/recipe';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-ingredients-view',
  templateUrl: './ingredients-view.component.html',
  styleUrls: ['./ingredients-view.component.css']
})
export class IngredientsViewComponent implements OnInit, OnDestroy {
  recipeId!: number;
  recipe!: Recipe;
  ingredients!: IngredientComposition[];
  subscription!: Subscription;

  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute) {
      this.subscription = this.recipeService.selectedRecipeIdUpdate
      .subscribe(
        (selectedId: number) => {
          this.recipeId = selectedId;
          this.onLoad();
        });
  }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.recipeId = +params['id']
    //   }
    // );

    this.recipeId = this.recipeService.selectedRecipeId;

    this.onLoad();
  }

  onLoad(){
    this.recipeService.getById(this.recipeId)
    .subscribe(
      (data: Recipe) => {
        this.recipe = data;
        this.ingredients = data.ingredientCompoList;
        this.ingredients.forEach((ing)=> {
          ing.unitDescription = measurementUnits[ing.unit];
        });
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

