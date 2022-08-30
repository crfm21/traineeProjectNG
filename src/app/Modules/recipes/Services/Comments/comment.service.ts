import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, throwError } from 'rxjs';

import { Comment } from '../../Interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiURL = "https://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  // commentsListUpdate = new Subject<Comment[]>();

  constructor(private httpClient: HttpClient) { }

  getRecipeComments(recipeId: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Comment/Recipe/" + recipeId)
      .pipe(catchError(this.errorHandler));
  }

  getCreatorsCommentsByRecipe(recipeId: number, creatorId?: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Comment/Creator/" + creatorId + "/Recipe/" + recipeId
    )
      .pipe(catchError(this.errorHandler))
  }

  createAComment(comment: Comment) {
    return this.httpClient.post(
      this.apiURL + "Comment/New",
      JSON.stringify(comment),
      this.httpOptions
    ).pipe(catchError(this.errorHandler));
  }

  disaproving(comment: Comment, commId?: number) {
    return this.httpClient.put(
      this.apiURL + "Comment/disapprove/" + commId,
      JSON.stringify(comment),
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

  // errorHandler(error: any){
  //   let errorMessage = "";

  //   if(error.error instanceof ErrorEvent)//erro de um evento que aqui é ir obter dados
  //     errorMessage = error.error.message;
  //   else
  //     errorMessage = " Error code: " + error.status + "\nMessage: " + error.message;

  //   return throwError(() => error)
  // }
}
