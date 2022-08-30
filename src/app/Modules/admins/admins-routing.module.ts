import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsCreationComponent } from '../recipes/Components/Ingredients/ingredients-creation/ingredients-creation.component';
import { IngredientsListComponent } from '../recipes/Components/Ingredients/ingredients-list/ingredients-list.component';
import { RecipesEditionComponent } from '../recipes/Components/Recipe/recipes-edition/recipes-edition.component';
import { RecipesListComponent } from '../recipes/Components/Recipe/recipes-list/recipes-list.component';
import { UsersListComponent } from '../users/Components/users-list/users-list.component';
import { UsersViewComponent } from '../users/Components/users-view/users-view.component';
import { AdminEditionComponent } from './Components/admin-edition/admin-edition.component';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';

const routes: Routes = [
  { path: 'adminAccess/:adminId', component: AdminViewComponent },
  { path: 'adminAccess/:adminId/edit', component: AdminEditionComponent },
  { path: 'adminAccess/:adminId/recipes/:state', component: RecipesListComponent },
  // { path: 'adminAccess/:adminId/recipes/:state', component: RecipesListComponent },
  { path: 'adminAccess/:adminId/:memberStatus', component: UsersListComponent },
  { path: 'adminAccess/:adminId/:memberStatus/memberProfile/:memberId', component: UsersViewComponent },
  { path: 'adminAccess/:adminId/:memberStatus/memberProfile/:memberIdSelected/:state', component: RecipesListComponent },
  { path: 'adminAccess/:adminId/:memberStatus', component: UsersListComponent },
  // { path: 'adminAccess/:adminId/:memberStatus/memberProfile/:memberId', component: UsersViewComponent },
  { path: 'adminAccess/:adminId/reviewRecipe/:id', component: RecipesEditionComponent },
  // {path: 'adminAccess/:adminId/ingredientsList', component: IngredientsListComponent, children: [
  //   {path: 'add', component: IngredientsCreationComponent}
  // ]} NAO RENDERIZA, MAS OS OUTROS SIM ! COLOCADOS NOS EXPORT DO RECIPEMODULE! TIVE QUE COLOCAR NO APP-ROUTING

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
