import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsCreationComponent } from './Modules/recipes/Components/Ingredients/ingredients-creation/ingredients-creation.component';
import { IngredientsEditionComponent } from './Modules/recipes/Components/Ingredients/ingredients-edition/ingredients-edition.component';
import { IngredientsListComponent } from './Modules/recipes/Components/Ingredients/ingredients-list/ingredients-list.component';
import { RecipesEditionComponent } from './Modules/recipes/Components/Recipe/recipes-edition/recipes-edition.component';
import { RecipesListComponent } from './Modules/recipes/Components/Recipe/recipes-list/recipes-list.component';
import { UsersCreationComponent } from './Modules/users/Components/users-creation/users-creation.component';
import { AdvancedSearchComponent } from './Shared/Components/advanced-search/advanced-search.component';
import { AuthenticationComponent } from './Shared/Components/authentication/authentication.component';
import { HomeComponent } from './Shared/Components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'signup', component: UsersCreationComponent},
  {path: 'searching', component: RecipesListComponent},
  {path: 'searching/category/:category', component: RecipesListComponent},
  {path: 'advancedSearch', component: AdvancedSearchComponent},
  {path: 'adminAccess/:adminId/ingredientsList', component: IngredientsListComponent},
  {path: 'adminAccess/:adminId/ingredientsList/edit/:id', component: IngredientsEditionComponent}//NAO DEU COLOCANDO NO ROUTING DO ADMIN COMO FEITO PARQA OS OUTROS...
  // { path: 'adminAccess/:adminId/reviewRecipe/:id', component: RecipesEditionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
