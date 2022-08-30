import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientService } from '../../../Services/Ingredients/ingredient.service';

@Component({
  selector: 'app-ingredients-creation',
  templateUrl: './ingredients-creation.component.html',
  styleUrls: ['./ingredients-creation.component.css']
})
export class IngredientsCreationComponent implements OnInit {
ingredientForm!: FormGroup;

  constructor(
    public ingredientService: IngredientService,
    private router: Router) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
      }
    );
    // this.ingredientForm = new FormArray(
    //   [{
    //     name: new FormControl('')
    //   }
    //   ]);
}

get f(){
  return this.ingredientForm.controls;
}

save(){
  this.ingredientService.createIngredient(this.ingredientForm.value)
  .subscribe(
    (res: any) => {
      alert(res.value);
      this.reloadCurrentRoute();
    }
  );
};

reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
}
