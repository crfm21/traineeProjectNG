import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/Modules/users/Interface/user';
import { UserService } from 'src/app/Modules/users/user.service';
import { DataTransferService } from '../../Services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  authForm!: FormGroup;
  // rgx: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  user!: User;

  constructor(
    public memberService: UserService,
    private router: Router,
    public dataTransfertService: DataTransferService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup(
      {
        // email: new FormControl('', [Validators.required, Validators.email]),
        // password: new FormControl('', [Validators.required]),
        email: new FormControl(''),
        password: new FormControl('')
      }
    )
  }

  get f() {
    return this.authForm.controls;
  }

  submit() {
    this.memberService.login(this.authForm.value.email, this.authForm.value.password)
      .subscribe(
        (res: User) => {
          this.user = res;
          this.dataTransfertService.isLogged = true;
          this.dataTransfertService.sendUserUpdate(this.user);
          console.log(res.profile);

          if (this.user.profile == 0) {
            this.router.navigateByUrl('adminAccess/' + this.user.id);
          }
          else if (this.user.profile == 1) {
            this.router.navigateByUrl('memberAccess/' + this.user.id);
          }
        }
      );
  }
}
/*
, (error) => {
  alert(error.body);
}
*/
