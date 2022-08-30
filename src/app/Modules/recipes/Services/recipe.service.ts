import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';

import { Recipe } from '../Interfaces/recipe';
import { Comment } from '../Interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly apiURL = "https://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  selectedRecipeIdUpdate = new Subject<number>();
  selectedRecipeId!: number;

  // commentsUpdate = new Subject<Comment[]>();
  // comments: Comment[] = [];

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/all")
      .pipe(catchError(this.errorHandler));
  }

  countPublished(): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Recipe/count/all")
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/byId/" + id)
      .pipe(catchError(this.errorHandler));
  }

  getByTitle(title: string): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/title/" + title)
      .pipe(catchError(this.errorHandler));
  }

  getByCategory(category: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/category/" + category)
      .pipe(catchError(this.errorHandler));
  }

  getByServings(servings: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/servings/" + servings)
      .pipe(catchError(this.errorHandler))
  }

  getByExperiencelevel(level: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/difficulty/" + level)
      .pipe(catchError(this.errorHandler));
  }

  countPublishedByCreator(creatorId: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Recipe/count/publishedByMember/" + creatorId)
      .pipe(catchError(this.errorHandler));
  }

  getPublishedByCreator(creatorId: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/publishedByMember/" + creatorId)
      .pipe(catchError(this.errorHandler));
  }

  countToReview(): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Recipe/count/toReview/")
      .pipe(catchError(this.errorHandler));
  }

  getToReview(): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/toReview")
      .pipe(catchError(this.errorHandler));
  }

  countToReviewByCreator(creatorId: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Recipe/count/toReview/" + creatorId)
      .pipe(catchError(this.errorHandler));
  }

  getToReviewByCreator(creatorId: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/toReview/" + creatorId)
      .pipe(catchError(this.errorHandler));
  }

  countFavorites(memberId: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Recipe/count/Favorites/" + memberId)
      .pipe(catchError(this.errorHandler));
  }

  getFavorites(memberId: number): Observable<any> {
    return this.httpClient.get(this.apiURL + "Recipe/Favorites/" + memberId)
      .pipe(catchError(this.errorHandler));
  }

  createNewRecipe(recipe: Recipe) {
    return this.httpClient.post(
      this.apiURL + "Recipe/New",
      JSON.stringify(recipe),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  editRecipe(recipeId: number, recipe: Recipe) {
    return this.httpClient.put(
      this.apiURL + "Recipe/edit/" + recipeId,
      JSON.stringify(recipe),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  validateRecipe(recipeId: number, recipe: Recipe) {
    return this.httpClient.put(
      this.apiURL + "Recipe/validate/" + recipeId,
      JSON.stringify(recipe),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  rateRecipe(recipeId: number, rating: number, recipe: Recipe) {
    return this.httpClient.put(
      this.apiURL + "Recipe/Rate/" + recipeId + "/" + rating,
      JSON.stringify(recipe),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  softDelete(recipeId: number, recipe: Recipe) {
    this.httpClient.put(
      this.apiURL + "Recipe/sDelete/" + recipeId,
      JSON.stringify(recipe),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent)//erro de um evento que aqui é ir obter dados
      return error.message;
    else
      errorMessage = " Error code: " + error.status + "\nMessage: " + error.error;

    return throwError(() => errorMessage)
  }
  // errorHandler(error: any) {
  //   let errorMessage = "";

  //   if (error.error instanceof ErrorEvent)//erro de um evento que aqui é ir obter dados
  //     errorMessage = error.error.message;
  //   else
  //     errorMessage = " Error code: " + error.status + "\nMessage: " + error.message;

  //   return throwError(() => error)
  // }
}
