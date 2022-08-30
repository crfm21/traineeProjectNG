import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


import { AdminsModule } from './Modules/admins/admins.module';
import { RecipesModule } from './Modules/recipes/recipes.module';
import { UsersModule } from './Modules/users/users.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HomeComponent } from './Shared/Components/home/home.component';
import { AdvancedSearchComponent } from './Shared/Components/advanced-search/advanced-search.component';
import { AuthenticationComponent } from './Shared/Components/authentication/authentication.component';
import { PhotoService } from './Shared/Services/Photos/photo.service';
import { DataTransferService } from './Shared/Services/DataTransfer/data-transfer.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdvancedSearchComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminsModule,
    RecipesModule,
    UsersModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  providers: [DataTransfer, PhotoService, DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
