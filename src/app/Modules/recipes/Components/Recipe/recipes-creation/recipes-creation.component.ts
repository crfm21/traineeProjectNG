import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Modules/users/Interface/user';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { Ingredient } from '../../../Interfaces/ingredient';
import { IngredientComposition, measurementUnits } from '../../../Interfaces/ingredient-composition';
import { Categories, ExperienceLevel } from '../../../Interfaces/recipe';
import { IngredientService } from '../../../Services/Ingredients/ingredient.service';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipes-creation',
  templateUrl: './recipes-creation.component.html',
  styleUrls: ['./recipes-creation.component.css']
})
export class RecipesCreationComponent implements OnInit, OnDestroy {
  loggedMember!: User;
  loggedId!: number;
  // rgx: string = "^([0-5]?[0-9]):[0-5][0-9]$";
  // ingredientsAdded!: IngredientComposition[];
  // counter = [1];
  subscription!: Subscription;

  recipeForm!: FormGroup;
  selectedIngredientId!: number;//corresponding id of the selectedName

  ingredientList!: Ingredient[];//from BD name list
  categories = Object.values(Categories).splice(0, (Object.values(Categories).length) / 2);
  levels = Object.values(ExperienceLevel).splice(0, (Object.values(ExperienceLevel).length) / 2);
  units = Object.values(measurementUnits).splice(0, (Object.values(measurementUnits).length) / 2);

  constructor(
    public dataTransfertService: DataTransferService,
    public recipeService: RecipeService,
    public ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.subscription = this.dataTransfertService.getUserUpdate()
      .subscribe(
        (data) => {
          this.loggedMember = data.data;
          console.log(this.loggedMember);
        }
      );

  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (data: Params) => {
          this.loggedId = data['memberId']
        }
      )

    this.ingredientService.getIngredientList()
      .subscribe(
        (data) => {
          this.ingredientList = data;
        }
      )

    // this.ingredientsForm = new FormGroup(
    //   {
    //     name: new FormControl('', [Validators.required]),
    //     quantity: new FormControl('', [Validators.required]),
    //     unit: new FormControl('', [Validators.required]),
    //     ingredientId: new FormControl('', [Validators.required])
    //   }
    // );

    //dentro no ngOnInit senão o id do membro não é carregado
    this.recipeForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(30)]],
        category: ['', Validators.required],
        duration: ['', Validators.required],
        servings: ['', Validators.required],
        difficulty: ['', Validators.required],
        description: ['', Validators.required],
        creatorMemberId: +this.loggedId,
        ingredientCompoList: this.fb.array([], Validators.required)

      }
    );
    //registar alteração em tempo real
    // this.recipeForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log('value changes', value);
    //   }
    // )

  }

  //accessing the array //colocar dentro do form getf() ?
  get ingredientCompoList() {
    return this.recipeForm.controls["ingredientCompoList"] as FormArray;
  }
  //trating the values of the array
  addIngredientCompo() {
    //definição do grupo IngredientComposition, objeto que será repetido no array IngredientCompoList
    const ingredientCompoForm = this.fb.group(
      {
        quantity: '',
        unit: '',
        ingredientId: ''
      }
    )
    this.ingredientCompoList.push(ingredientCompoForm);
  }

  deleteIngredientCompo(i: number) {
    this.ingredientCompoList.removeAt(i);
  }

  get f() {
    // console.log(this.recipeForm.controls);
    return this.recipeForm.controls;
  }

  // getValueOfIngredientCompoNameControl() {

  // }
  createRecipe() {
    console.log(this.recipeForm.value);
    // console.log(this.recipeForm.controls["ingredientCompoList"].value);

    this.recipeService.createNewRecipe(this.recipeForm.value)
      .subscribe(
        (res: any) => {
          alert(res.value);
          this.router.navigateByUrl('memberAcces/' + this.loggedId);
        }
      )
  }

  //tentativa para : criaçao de um form abaixo de outro : criaçao do array ingredientsAdded, e passando essa variavel no form geral
  // addIngredient(ingredient: IngredientComposition) {
  //   this.ingredientsAdded.push(ingredient);
  //   this.counter.push(1);
  // }

  clearForm() {
    this.recipeForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
