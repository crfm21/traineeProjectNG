import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './Components/Recipe/recipes-list/recipes-list.component';
import { RecipesCreationComponent } from './Components/Recipe/recipes-creation/recipes-creation.component';
import { RecipesEditionComponent } from './Components/Recipe/recipes-edition/recipes-edition.component';
import { RecipesViewComponent } from './Components/Recipe/recipes-view/recipes-view.component';
import { IngredientsCreationComponent } from './Components/Ingredients/ingredients-creation/ingredients-creation.component';
import { IngredientsEditionComponent } from './Components/Ingredients/ingredients-edition/ingredients-edition.component';
import { IngredientsViewComponent } from './Components/Ingredients/ingredients-view/ingredients-view.component';
import { CommentsCreationComponent } from './Components/Comments/comments-creation/comments-creation.component';
import { CommentsEditionComponent } from './Components/Comments/comments-edition/comments-edition.component';
import { CommentsListComponent } from './Components/Comments/comments-list/comments-list.component';
import { IngredientsListComponent } from './Components/Ingredients/ingredients-list/ingredients-list.component';

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipesCreationComponent,
    RecipesEditionComponent,
    RecipesViewComponent,
    IngredientsCreationComponent,
    IngredientsListComponent,
    IngredientsEditionComponent,
    IngredientsViewComponent,
    CommentsCreationComponent,
    CommentsEditionComponent,
    CommentsListComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports:[
    RecipesListComponent,
    RecipesCreationComponent,
    RecipesEditionComponent,
    RecipesViewComponent,
    IngredientsCreationComponent,
    IngredientsListComponent,
    IngredientsEditionComponent,
    IngredientsViewComponent,
    CommentsCreationComponent,
    CommentsEditionComponent,
    CommentsListComponent
  ]
})
export class RecipesModule { }
