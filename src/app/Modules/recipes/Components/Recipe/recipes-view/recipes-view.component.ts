import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/Modules/users/Interface/user';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { Photo, PhotoService } from 'src/app/Shared/Services/Photos/photo.service';
import { Favorite } from '../../../Interfaces/favorite';

import { Categories, ExperienceLevel, Recipe } from '../../../Interfaces/recipe';
import { IngredientComposition, measurementUnits } from '../../../Interfaces/ingredient-composition';
import { FavoriteService } from '../../../Services/favorites/favorite.service';
import { RecipeService } from '../../../Services/recipe.service';
import { UserService } from 'src/app/Modules/users/user.service';

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.css']
})
export class RecipesViewComponent implements OnInit {
  id!: number;
  recipe!: Recipe;
  ingredients: IngredientComposition[] = [];
  favRecipe: Favorite = {};
  isLogged!: boolean;
  loggedMember!: User;//ir buscar ao browser storage

  recipePhoto!: any;
  isPhotoLoaded!: boolean;
  creatorsName!: string;

  rateNumbers: number[] = [1, 2, 3, 4, 5];

  constructor(
    public recipeService: RecipeService,
    public userService: UserService,
    public dataTransfertService: DataTransferService,
    public favRecipeService: FavoriteService,
    public photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router) { }

  //loading
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.favRecipe.recipeId = this.id;
        }
      );

    this.recipeService.getById(this.id)
      .subscribe(
        (data: Recipe) => {
          this.recipe = data;
          this.recipe.categoryString = Categories[data.category];
          this.recipe.difficultyString = ExperienceLevel[data.difficulty];
          this.ingredients = data.ingredientCompoList;
          this.ingredients.forEach((ing) => {
            ing.unitDescription = measurementUnits[ing.unit];
          });
          this.userService.getAMember(this.recipe.creatorMemberId)
            .subscribe(
              (member: User) => {
                this.creatorsName = member.firstName + " " + member.lastName;
              }
            );
        }
      );

    this.getImageFromService();


    if (this.dataTransfertService.isLogged !== undefined) {
      this.isLogged = this.dataTransfertService.isLogged;
      this.loggedMember = this.dataTransfertService.loggedMember;
      this.favRecipe.memberId = this.loggedMember.id;
    }

  }
  //endingLoad

  //Methods
  onSelect() {
    this.recipeService.selectedRecipeId = this.id;
    this.recipeService.selectedRecipeIdUpdate.next(this.id);
  }

  addToFav() {
    this.favRecipeService.addFavorite(this.favRecipe)
      .subscribe(
        (res: any) => {
          alert(res.value);
        });
  }

  deleteFromFav() {
    this.favRecipeService.deleteFromFavorites(this.id, this.loggedMember.id)
      .subscribe(
        (res: any) => {
          alert(res.value);
        }
      );
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
    this.isPhotoLoaded = true;
    this.photoService.getRecipePhoto(this.id)
      .subscribe(
        (data) => {
          this.createImageFromBlob(data);
          this.isPhotoLoaded = true;
        }, error => {
          this.isPhotoLoaded = false;
          console.log(error);
        });
  }
  //ending methods

  rating(rate: number) {
    if (confirm("You are rating this recipe " + rate + " stars.\n Are you sure?")) {
      this.recipeService.rateRecipe(this.recipe.id, rate, this.recipe)
        .subscribe(
          (res: any) => {
            alert(res.value);
            this.reloadCurrentRoute();
          }
        )
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}



