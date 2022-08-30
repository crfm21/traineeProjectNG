import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/Modules/recipes/Services/recipe.service';
import { Gender, User } from 'src/app/Modules/users/Interface/user';
import { UserService } from 'src/app/Modules/users/user.service';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { PhotoService } from 'src/app/Shared/Services/Photos/photo.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  loggedMemberId!: number;
  memberLogged!: User;

  userPhoto!: any;
  isPhotoloaded!: boolean;

  localUrl: any;
  isClicked!: boolean;
  photoToUpload!: File;

  adminAge!: number;

  pubRecipes!: number;
  recipesToReview!: number;
  activeMembers!: number
  bannedMembers!: number;

  constructor(
    public userService: UserService,
    public photoService: PhotoService,
    public recipeService: RecipeService,
    public dataTransfer: DataTransferService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (param: Params) => {
          this.loggedMemberId = param['adminId']
        });

    this.userService.getAMember(this.loggedMemberId)
      .subscribe(
        (data: User) => {
          this.memberLogged = data;
          this.memberLogged.genderString = Gender[data.gender];
          // this.memberLogged.profileString = Profiles[data.profile];
        });

    this.getImageFromService();
    this.getAge();
    this.activeMemberCounter();
    this.bannedMemberCounter();
    this.pubRecipesCounter();
    this.toReviewRecipesCounter();
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

  selectPhoto(event: any) {
    this.photoToUpload = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    };
  }

  uploadPhoto() {
    if (this.photoToUpload !== undefined) {
      this.photoService.uploadUserPhoto(this.loggedMemberId, this.photoToUpload)
        .subscribe(
          (data) => {
            console.log(data);
            alert("Upload was successful");
            this.reloadCurrentRoute();
          }
        );
    }
    else {
      alert("You have to choose an image first.")
    };
  }

  getAge() {
    this.userService.getMemberAge(this.loggedMemberId)
      .subscribe(
        (data) => {
          this.adminAge = data;
        }
      );}

  activeMemberCounter(){
    this.userService.countAllMembers()
    .subscribe(
      (data) => {
        this.activeMembers = data;
      }
    );
  }

  bannedMemberCounter(){
    this.userService.countBannedMembers()
    .subscribe(
      (data) => {
        this.bannedMembers = data;
      }
    );
  }

  pubRecipesCounter(){
    this.recipeService.countPublished()
    .subscribe(
      (data) => {
        this.pubRecipes = data;
      }
    );
  }

  toReviewRecipesCounter(){
    this.recipeService.countToReview()
    .subscribe(
      (data) => {
        this.recipesToReview = data;
      }
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
