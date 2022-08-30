import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/Modules/recipes/Interfaces/recipe';
import { RecipeService } from 'src/app/Modules/recipes/Services/recipe.service';
import { DataTransferService } from '../../Services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
searchForm!: FormGroup;
recipeTitle!: string;

  constructor(
    public recipeService: RecipeService,
    private dataTransfer: DataTransferService) {
      this.ngOnInit();
    }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      recipeTitle: new FormControl('',[Validators.minLength(1)])
    });
  }

  get f(){
    return this.searchForm.controls;
  }

  onSubmit(){
    console.log(this.searchForm.value);
  }

  sendData(){
    this.dataTransfer.sendUpdate(this.recipeTitle);
  }

}
