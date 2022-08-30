import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesCreationComponent } from '../recipes/Components/Recipe/recipes-creation/recipes-creation.component';
import { RecipesListComponent } from '../recipes/Components/Recipe/recipes-list/recipes-list.component';
import { UsersEditionComponent } from './Components/users-edition/users-edition.component';
import { UsersViewComponent } from './Components/users-view/users-view.component';

const routes: Routes = [
  {path: 'memberAccess/:memberId', component: UsersViewComponent},
  {path: 'memberAccess/:memberId/edit', component: UsersEditionComponent},
  {path: 'memberAccess/:memberId/recipes/:state', component: RecipesListComponent},
  {path: 'recipeCreation/:memberId', component:  RecipesCreationComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
