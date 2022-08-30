import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { PhotoService } from 'src/app/Shared/Services/Photos/photo.service';
import { CustomValidators } from 'src/app/Shared/Utilities/customValidators';
import { Gender, User } from '../../Interface/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users-edition',
  templateUrl: './users-edition.component.html',
  styleUrls: ['./users-edition.component.css']
})
export class UsersEditionComponent implements OnInit {
  editUserForm!: FormGroup;
  rgx: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_.]).{8,}$";
  genders = Object.values(Gender).splice(0, (Object.values(Gender).length) / 2);

  loggedMemberId!: number;
  memberLogged!: User;
  userPhoto!: any;
  isPhotoloaded!: boolean;

  constructor(
    public dataService: DataTransferService,
    public photoService: PhotoService,
    public memberService: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.ngOnInit();
     }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (param: Params) => {
          this.loggedMemberId = param['memberId']
        });

    this.memberService.getAMember(this.loggedMemberId)
      .subscribe(
        (data: User) => {
          this.memberLogged = data;
          this.memberLogged.genderString = Gender[data.gender];
          this.editUserForm = new FormGroup(
            {
              firstName: new FormControl(this.memberLogged.firstName, [Validators.required]),
              lastName: new FormControl(this.memberLogged.lastName, [Validators.required]),
              nickName: new FormControl(this.memberLogged.nickName, [Validators.required]),
              email: new FormControl(this.memberLogged.email, [Validators.required, Validators.email]),
              password: new FormControl('', [Validators.pattern(this.rgx)]),
              // password: new FormControl(this.memberLogged.password, [Validators.required, Validators.pattern(this.rgx)]),
              passwordConfirmation: new FormControl(''),
              // passwordConfirmation: new FormControl('', [Validators.required]),
              birthDate: new FormControl(formatDate(this.memberLogged.birthDate, 'yyyy-MM-dd', 'en'), [Validators.required]),
              gender: new FormControl(this.memberLogged.gender, [Validators.required])
            },
            CustomValidators.passwordMatch('password', 'passwordConfirmation')
          );
        });

    this.getImageFromService();

  }

  get f(){
    return this.editUserForm.controls;
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.userPhoto = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.isPhotoloaded = true;
    this.photoService.getUserPhoto(this.loggedMemberId)
      .subscribe(
        (data) => {
          this.createImageFromBlob(data);
          this.isPhotoloaded = true;
        }, error => {
          this.isPhotoloaded = false;
          console.log(error);
        });
  }

  onSaving(){
    this.memberService.editMember(this.loggedMemberId, this.editUserForm.value)
    .subscribe(
      (res: any) => {
        alert(res.value);
        this.router.navigateByUrl('/memberAccess/' + this.loggedMemberId);
      }
      );
  }

  onDeletingAccount(){
    if(confirm("Are you sure you want to delete your account?")){
      this.memberService.softDeleteMember(this.loggedMemberId)
      .subscribe(
        (res:any) =>{
          alert(res.value);
        this.router.navigateByUrl('/home');
        }
      );
    }else {
      this.router.navigateByUrl('/memberAccess/' + this.loggedMemberId);
    };
  }
}
