import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { PhotoService } from 'src/app/Shared/Services/Photos/photo.service';

import { Recipe } from '../../../Interfaces/recipe';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  title!: string;
  categorySelected!: number;
  recipes!: Recipe[];
  recipeStateSelected!: string;
  selectedRecipedId!: number;
  // selectedUser!: number;

  recipePhoto!: any;
  allRecipePhotos!: any[];
  isPhotoloaded!: boolean;

  loggedMemberId!: number;
  loggedAdminId!: number;

  constructor(
    public recipeService: RecipeService,
    private dataTransfer: DataTransferService,
    private photoService: PhotoService,
    private route: ActivatedRoute) {

    this.subscription = this.dataTransfer.getUpdate()
      .subscribe(
        (data) => {
          this.title = data.data;
          this.loadComponentAll();
        }
      );
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
        (qparams: Params) => {
          this.title = qparams['recipeTitle'];
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.categorySelected = params['category'];
          this.recipeStateSelected = params['state'];
          this.loggedMemberId = params['memberId'];
          this.loggedAdminId = params['adminId'];
          // this.selectedUser = params['memberIdSelected']//see this issue
        }
      );

    //ULTRA CONDICIONAL: lista irá devolver resultados segundo o URL que é definido por:
    //pessoa não logada, membro ou admin

    //TESTE:
    //TITULO?
    if (this.title !== undefined) this.loadComponentAll();
    else {
      //category?
      if (this.categorySelected !== undefined) {
        this.recipeService.getByCategory(this.categorySelected)
          .subscribe(
            (recipes: Recipe[]) => {
              this.recipes = recipes;
              this.recipes.forEach(
                r => {
                  this.getImageFromService(r.id);
                }
              );
            }
          );
      }
      else {
        //if no title AND no category: state?
        if (this.recipeStateSelected == undefined) this.loadComponentAll(); //NO TITLE, NO CATEGORY NO STATE
        else {
          //if state true: member?
          if (this.loggedMemberId !== undefined) {
            switch (this.recipeStateSelected) {
              case 'published': {
                this.recipeService.getPublishedByCreator(this.loggedMemberId)
                  .subscribe(
                    (data) => {
                      this.recipes = data;
                      this.recipes.forEach(
                        r => {
                          this.getImageFromService(r.id);
                        }
                      );
                    }
                  );
                break;
              }
              case 'toReview': {
                this.recipeService.getToReviewByCreator(this.loggedMemberId)
                  .subscribe(
                    (data) => {
                      this.recipes = data;
                      this.recipes.forEach(
                        r => {
                          this.getImageFromService(r.id);
                        }
                      );
                    }
                  );
                break;
              }
              case 'favorites': {
                this.recipeService.getFavorites(this.loggedMemberId)
                  .subscribe(
                    (data) => {
                      this.recipes = data;
                      this.recipes.forEach(
                        r => {
                          this.getImageFromService(r.id);
                        }
                      );
                    }
                  );
                break;
              }
            }
          }
          else {
            //NO member: obrigatoriamente admin! pois state TRUE
            switch (this.recipeStateSelected) {
              case 'published': {
                this.recipeService.getAll()
                  .subscribe(
                    (data) => {
                      this.recipes = data;
                      this.recipes.forEach(
                        r => {
                          this.getImageFromService(r.id);
                        }
                      );
                    }
                  );
                break;
              }
              case 'toReview': {
                this.recipeService.getToReview()
                  .subscribe(
                    (data) => {
                      this.recipes = data;
                      this.recipes.forEach(
                        r => {
                          this.getImageFromService(r.id);
                        }
                      );
                    }
                  );
                break;
              }
            }
          }
        }
      }
    }

  }

  //methods for searching thru title
  loadComponentAll(): void {
    if (this.title) {
      this.recipeService.getByTitle(this.title)
        .subscribe(
          (data: Recipe[]) => {
            this.recipes = data;
            this.recipes.forEach(
              r => {
                this.getImageFromService(r.id);
              }
            );
          });
    } else {
      this.recipeService.getAll()
        .subscribe(
          (data: Recipe[]) => {
            this.recipes = data;
            this.recipes.forEach(
              r => {
                this.getImageFromService(r.id);
              }
            );
          });
    }
  }

  //image
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.recipePhoto = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(recipeId: number) {
    this.isPhotoloaded = true;
    this.photoService.getRecipePhoto(recipeId)
      .subscribe(
        (data) => {
          this.createImageFromBlob(data);
          this.isPhotoloaded = true;
        }, error => {
          this.isPhotoloaded = false;
          console.log(error);
        });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
