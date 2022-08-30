import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { UsersCreationComponent } from './Components/users-creation/users-creation.component';
import { UsersEditionComponent } from './Components/users-edition/users-edition.component';
import { UsersViewComponent } from './Components/users-view/users-view.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersCreationComponent,
    UsersEditionComponent,
    UsersViewComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    UsersListComponent,
    UsersCreationComponent,
    UsersEditionComponent,
    UsersViewComponent
  ]
})
export class UsersModule { }
