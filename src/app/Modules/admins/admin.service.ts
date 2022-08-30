import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

import { Admin } from './Interface/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiURL = "http://localhost:51234/api/"
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  }
  constructor(private httpClient: HttpClient) { }
}
