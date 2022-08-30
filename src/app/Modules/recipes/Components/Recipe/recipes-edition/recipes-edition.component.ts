import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Modules/users/Interface/user';
import { UserService } from 'src/app/Modules/users/user.service';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { PhotoService } from 'src/app/Shared/Services/Photos/photo.service';
import { Ingredient } from '../../../Interfaces/ingredient';
import { IngredientComposition, measurementUnits } from '../../../Interfaces/ingredient-composition';
import { Categories, ExperienceLevel, Recipe } from '../../../Interfaces/recipe';
import { IngredientService } from '../../../Services/Ingredients/ingredient.service';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipes-edition',
  templateUrl: './recipes-edition.component.html',
  styleUrls: ['./recipes-edition.component.css']
})
export class RecipesEditionComponent implements OnInit {
  loggedMember!: User;
  loggedId!: number;
  recipeId!: number;
  recipeToEdit!: Recipe;
  recipeIngredients!: IngredientComposition[];
  creatorName!: string;

  recipeFormEdition!: FormGroup;
  recipePhoto!: any;
  isPhotoloaded!: boolean;
  ingredientList!: Ingredient[];//from BD name list
  categories = Object.values(Categories).splice(0, (Object.values(Categories).length) / 2);
  levels = Object.values(ExperienceLevel).splice(0, (Object.values(ExperienceLevel).length) / 2);
  units = Object.values(measurementUnits).splice(0, (Object.values(measurementUnits).length) / 2);

  selectedIngredientId!: number;//corresponding id of the selectedName

  subscription!: Subscription;

  constructor(
    public dataTransfertService: DataTransferService,
    public recipeService: RecipeService,
    public photoService: PhotoService,
    public userService: UserService,
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
        (params: Params) => {
          this.loggedId = params['adminId'];
          this.recipeId = params['id'];
        }
      );

    this.recipeService.getById(this.recipeId)
      .subscribe(
        (data: Recipe) => {
          this.recipeToEdit = data;
          this.recipeIngredients = data.ingredientCompoList;
          this.userService.getAMember(this.recipeToEdit.creatorMemberId)
            .subscribe(
              (member: User) => {
                this.creatorName = member.firstName + " " + member.lastName;
              }
            );
          this.ingredientService.getIngredientList()
            .subscribe(
              (list) => {
                this.ingredientList = list;
              }
            );
          this.recipeFormEdition = this.fb.group(
            {
              title: [this.recipeToEdit.title, [Validators.required, Validators.maxLength(30)]],
              category: [this.recipeToEdit.category, Validators.required],
              duration: [this.recipeToEdit.duration, Validators.required],
              servings: [this.recipeToEdit.servings, Validators.required],
              difficulty: [this.recipeToEdit.difficulty, Validators.required],
              description: [this.recipeToEdit.description, Validators.required],
              creatorMemberId: +this.recipeToEdit.creatorMemberId,
              ingredientCompoList: this.fb.array(this.recipeIngredients, Validators.required)

            }
          );
        }
      );



  }


  get f() {
    // console.log(this.recipeForm.controls);
    return this.recipeFormEdition.controls;
  }

  get ingredientCompoList() {
    return this.recipeFormEdition.controls["ingredientCompoList"] as FormArray;
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.recipePhoto = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.isPhotoloaded = true;
    this.photoService.getUserPhoto(this.loggedId)
      .subscribe(
        (data) => {
          this.createImageFromBlob(data);
          this.isPhotoloaded = true;
        }, error => {
          this.isPhotoloaded = false;
          console.log(error);
        });
  }

  editRecipe() {
    console.log(this.recipeFormEdition.value);
    // console.log(this.recipeForm.controls["ingredientCompoList"].value);

    if (confirm("Do you want to save the changes made?")) {
      this.recipeService.editRecipe(this.recipeId, this.recipeFormEdition.value)
        .subscribe(
          (res: any) => {
            alert(res.value);
            this.reloadCurrentRoute();
            // this.router.navigateByUrl('');
          }
        );
    }

  }

  clearForm() {
    if (confirm("Do you want to clear the changes made?"))
      this.reloadCurrentRoute();
  }

  validate() {

    console.log(this.recipeFormEdition.value);
    if (confirm("The recipe will be published. Continue?")) {
      this.recipeService.validateRecipe(this.recipeId, this.recipeFormEdition.value)
        .subscribe(
          (res: any) => {
            alert(res.value);
            this.router.navigateByUrl('adminAccess/' + this.loggedId + '/recipes/toReview');//goes to list of reviews
          }
        );
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
