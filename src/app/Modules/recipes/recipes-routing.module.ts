import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsCreationComponent } from './Components/Comments/comments-creation/comments-creation.component';
import { CommentsEditionComponent } from './Components/Comments/comments-edition/comments-edition.component';
import { CommentsListComponent } from './Components/Comments/comments-list/comments-list.component';
import { RecipesViewComponent } from './Components/Recipe/recipes-view/recipes-view.component';

const routes: Routes = [
  {
    path: 'details/:id', component: RecipesViewComponent, children: [
      // { path: '', component: IngredientsViewComponent }, no caso de ser children. alteraçao: dentro da card
      {
        path: 'comments', component: CommentsListComponent, children: [
          { path: 'creation', component: CommentsCreationComponent },
          { path: ':commId/edit', component: CommentsEditionComponent },
        ]
      },
    ]
  },
  // { path: 'adminAccess/:adminId/reviewRecipe/:id', component: RecipesEditionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
