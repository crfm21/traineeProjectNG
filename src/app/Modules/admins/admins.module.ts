import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminsRoutingModule } from './admins-routing.module';

import { AdminViewComponent } from './Components/admin-view/admin-view.component';
import { AdminEditionComponent } from './Components/admin-edition/admin-edition.component';


@NgModule({
  declarations: [
    AdminViewComponent,
    AdminEditionComponent,
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminViewComponent,
    AdminEditionComponent
  ]
})
export class AdminsModule { }
