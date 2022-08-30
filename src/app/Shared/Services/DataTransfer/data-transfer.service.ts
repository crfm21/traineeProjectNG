import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/Modules/users/Interface/user';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private subjectName = new Subject<any>(); //need to create a subject
  // public loggedMemberIdUpdate = new Subject<any>();
  public refreshUser = new Subject<any>();
  public loggedMember!: User;
  public isLogged!: boolean;

  constructor() { }

  sendUpdate(newData: any) { //the component that wants to update something, calls this fn
      this.subjectName.next({data: newData}); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function
      return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  sendUserUpdate(newData: any){
    this.refreshUser.next({data: newData});
    this.loggedMember = newData;
  }

  getUserUpdate(): Observable<any> { //the receiver component calls this function
    return this.refreshUser.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
}

}
