import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

import { CustomValidators } from 'src/app/Shared/Utilities/customValidators';
import { Gender, User } from '../../Interface/user';
import { UserService } from '../../user.service';
// import { Photo, PhotoService } from 'src/app/Shared/Services/Photos/photo.service';


@Component({
  selector: 'app-users-creation',
  templateUrl: './users-creation.component.html',
  styleUrls: ['./users-creation.component.css'],
  providers: [DatePipe]
})
export class UsersCreationComponent implements OnInit {
  signupForm!: FormGroup;
  rgx: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  genders = Object.values(Gender).splice(0, (Object.values(Gender).length) / 2);
  user!: User;

  constructor(
    public memberService: UserService,
    private router: Router) {
  }

  //this.signupForm.value.birthDate = formatDate(this.signupForm.value.birthDate, 'yyyy/MM/dd', 'en');
  // datePiping = this.datePipe.transform(this.signupForm.get(['birthday']), 'YYYY-MM-DD');


  ngOnInit(): void {

    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        nickName: new FormControl('', [Validators.required]), //ver validaçao erro duplicados
        email: new FormControl('', [Validators.required, Validators.email]),//ver validaçao erro duplicados
        password: new FormControl('', [Validators.required, Validators.pattern(this.rgx)]),
        passwordConfirmation: new FormControl('', [Validators.required]),
        birthDate: new FormControl(new Date(), [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        profile: new FormControl(+1)
      },
      CustomValidators.passwordMatch('password', 'passwordConfirmation')
    ); //the error handler in this custom validator is "passwordMismatch" to use in the html
    // this.signupForm.value.birthday = formatDate(this.signupForm.value.birthday, 'YYYY-MM-dd', 'en');
  }

  get f() {
    return this.signupForm.controls;
  }

  onSigningUp() {
    console.log(this.signupForm.value);

    this.memberService.createMember(this.signupForm.value)
      .subscribe(
        (res: any) => {
          alert(res.value);
          this.router.navigateByUrl('login');
        }
      );
    //upload the photo
    //https://localcoder.org/rxjs-executing-3-observables-one-after-another-and-using-results-from-first-in
    //redirect to profile
  }

  clearForm() {
    this.signupForm.reset();
  }
}
