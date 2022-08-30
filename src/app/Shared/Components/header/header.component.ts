import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/Modules/users/Interface/user';
import { DataTransferService } from '../../Services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged!: boolean;
  loggedUser!: User;
  subscription!: Subscription;

  constructor(
    public dataTransfert: DataTransferService,
    private router: Router) {

    this.subscription = this.dataTransfert.getUserUpdate()
    .subscribe(
      (data) => {
        this.loggedUser = data.data;
        this.isLogged = this.dataTransfert.isLogged;
      }
    );
    this.ngOnInit();
   }

  ngOnInit(): void {
  }

  logOut(){
    this.dataTransfert.isLogged = false;
    this.isLogged = this.dataTransfert.isLogged;
    this.router.navigateByUrl('home');
  }

  goToProfile() {
    if (this.loggedUser.profile == 0)
      this.router.navigateByUrl('adminAccess/' + this.loggedUser.id);
    else if (this.loggedUser.profile == 1)
      this.router.navigateByUrl('memberAccess/' + this.loggedUser.id);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
