import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Photo {
  image: FormData;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly apiURL = "https://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      // "Content-Type":"image/*"
      "Content-Type": "image/*",
      'enctype': 'multipart/form-data'
    })
  }

  constructor(private httpClient: HttpClient) { }

  uploadUserPhoto(memberId: number, photo: File) {
    // var formData = new FormData()

    return this.httpClient.post(
      this.apiURL + "Photo/upload/userPhoto/" + memberId,
      photo,
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  uploadRecipePhoto(recipeId: number, photo: File) {
    const formData: FormData = new FormData();
    console.log(photo.name);
    console.log(photo);
    formData.append('image', photo);

    return this.httpClient.post(
      this.apiURL + "Photo/upload/recipePhoto/" + recipeId,
      formData
    )
      .pipe(catchError(this.errorHandler));
  }

  //as a blob to be able to pass it to an image
  getUserPhoto(memberId: number): Observable<Blob> {
    return this.httpClient.get(
      this.apiURL + "Photo/download/UserPhotos/" + memberId,
      { responseType: 'blob' }
    )
      .pipe(catchError(this.errorHandler));
  }

  getRecipePhoto(recipeId?: number): Observable<Blob> {
    return this.httpClient.get(
      this.apiURL + "Photo/download/RecipePhotos/" + recipeId,
      { responseType: 'blob' }
    )
      .pipe(catchError(this.errorHandler));
  }

  deleteUserPhoto(memberId: number) {
    this.httpClient.delete(
      this.apiURL + "/api/Photo/Deleting/UserPhoto/" + memberId
    )
      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: any) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent)//erro de um evento que aqui é ir obter dados
      errorMessage = error.error.message;
    else
      errorMessage = " Error code: " + error.status + "\nMessage: " + error.error;

    return throwError(() => errorMessage)
  }

}
