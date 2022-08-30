import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';

import { User } from './Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiURL = "https://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "*/*"
    })
  }

  //for url escaping characters
  fixedEncodeURIComponent(str: string) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  // memberIdSelected!: number;
  //from memberList
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/login/" + this.fixedEncodeURIComponent(email) + "/" + this.fixedEncodeURIComponent(password),
      this.httpOptions
    )
      .pipe(
        map((result) => result),
        catchError(this.errorHandler))
  }

  //https://stackoverflow.com/questions/25807515/encode-special-characters-to-pass-in-url-and-read-by-javascript

  getAllMembers(): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/all/members"
    ).pipe(catchError(this.errorHandler));
  }//for active members

  countAllMembers(): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/count/all/members"
    ).pipe(catchError(this.errorHandler));
  }

  getAllAdmins(): Observable<any> {
    return this.httpClient.get(this.apiURL + "Member/all/admins")
      .pipe(catchError(this.errorHandler));
  }

  getAMember(memberId?: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/byId/" + memberId
    ).pipe(catchError(this.errorHandler));
  }

  getByComment(commId: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/comment/" + commId
    ).pipe(catchError(this.errorHandler));
  }

  getBannedMembers(): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/banned"
    ).pipe(catchError(this.errorHandler));
  }

  countBannedMembers(): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/count/banned"
    ).pipe(catchError(this.errorHandler));
  }

  getMemberAge(memberId: number): Observable<any> {
    return this.httpClient.get(
      this.apiURL + "Member/Age/byId/" + memberId
    )
      .pipe(catchError(this.errorHandler));
  }

  createMember(member: User) {
    return this.httpClient.post(
      this.apiURL + "Member/New",
      JSON.stringify(member),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  editMember(memberId: number, member: User) {
    return this.httpClient.put(
      this.apiURL + "Member/update/byId/" + memberId,
      JSON.stringify(member),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  banningMember(member: User, memberId?: number) {
    return this.httpClient.put(
      this.apiURL + "Member/banning/byId/" + memberId,
      JSON.stringify(member),
      this.httpOptions
    )
      .pipe(catchError(this.errorHandler));
  }

  softDeleteMember(memberId: number) {
    return this.httpClient.delete(
      this.apiURL + "Member/deleteAccount/byId/" + memberId
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
