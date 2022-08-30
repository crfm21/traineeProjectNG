import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Favorite } from '../../Interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly apiURL = "https://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private httpClient: HttpClient) { }

  addFavorite(favRecipe: Favorite) {
    return this.httpClient.post(
      this.apiURL + "Favorites/AddToFavorites",
      JSON.stringify(favRecipe),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  deleteFromFavorites(recipeId: number, memberId?: number) {
    return this.httpClient.delete(
      this.apiURL + "Favorites/delete/" + recipeId + "/" + memberId,
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
