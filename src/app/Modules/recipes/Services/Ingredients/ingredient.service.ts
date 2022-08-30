import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, Subject } from 'rxjs';
import { Ingredient } from '../../Interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private readonly apiURL = "https://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  ingredientSelected!: number;
  ingredientSelectedUpdate = new Subject<Ingredient>();

  constructor(private httpClient: HttpClient) { }

  getIngredientList(): Observable<any> {
    return this.httpClient.get(this.apiURL + "Ingredient/all")
      .pipe(catchError(this.errorHandler));
  }

  getIngredientById(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Ingredient/" + id)
      .pipe(catchError(this.errorHandler));
  }

  createIngredient(ingredient: Ingredient) {
    return this.httpClient.post(
      this.apiURL + "Ingredient/New",
      JSON.stringify(ingredient),
      this.httpOptions
    ).pipe(catchError(this.errorHandler));
  }

  editIngredient(id: number, ingredient: Ingredient) {
    return this.httpClient.put(
      this.apiURL + "Ingredient/edit/" + id,
      JSON.stringify(ingredient),
      this.httpOptions
    ).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent)//erro de um evento que aqui é ir obter dados
      return error.message;
    else
      errorMessage = " Error code: " + error.status + "\nMessage: " + error.error;

    return throwError(() => errorMessage)
  }

  // errorHandler(error: any){
  //   let errorMessage = "";

  //   if(error.error instanceof ErrorEvent)//erro de um evento que aqui é ir obter dados
  //     errorMessage = error.error.message;
  //   else
  //     errorMessage = " Error code: " + error.status + "\nMessage: " + error.message;

  //   return throwError(() => error)
  // }
}
