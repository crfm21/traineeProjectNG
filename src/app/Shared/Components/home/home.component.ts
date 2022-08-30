import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/Modules/recipes/Interfaces/recipe';
import { RecipeService } from 'src/app/Modules/recipes/Services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

categories = Object.values(Categories).splice(0, (Object.values(Categories).length)/2);


  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {

  }

}
