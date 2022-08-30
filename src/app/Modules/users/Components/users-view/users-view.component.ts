import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/Modules/recipes/Interfaces/recipe';
import { RecipeService } from 'src/app/Modules/recipes/Services/recipe.service';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { PhotoService } from 'src/app/Shared/Services/Photos/photo.service';
import { Gender, Profiles, User } from '../../Interface/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {
  loggedMemberId!: number;
  memberLogged!: User;

  userPhoto!: any;
  isPhotoloaded!: boolean;

  localUrl: any;
  isClicked!: boolean;
  photoToUpload!: File;

  memberAge!: number;
  // favRecipes: Recipe[] = [];
  // pubRecipes: Recipe[] = [];
  // recipesToReview: Recipe[] = [];
  favRecipes!: number;
  pubRecipes!: number;
  recipesToReview!: number;

  loggedAdminId!: number;
  memberIdSelected!: number;

  constructor(public userService: UserService,
    public photoService: PhotoService,
    public recipeService: RecipeService,
    public dataTransfer: DataTransferService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (param: Params) => {
          this.loggedMemberId = param['memberId'];
          this.loggedAdminId = param['adminId'];
        });

    this.userService.getAMember(this.loggedMemberId)
      .subscribe(
        (data: User) => {
          this.memberLogged = data;
          this.memberLogged.genderString = Gender[data.gender];
          // this.memberLogged.profileString = Profiles[data.profile];
        }
      );

    this.getImageFromService();
    this.getAge();
    this.countingFavorites();
    this.countingPublished();
    this.countingToReview();

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

  getAge() {
    this.userService.getMemberAge(this.loggedMemberId)
      .subscribe(
        (data) => {
          this.memberAge = data;
        }
      );
  }

  countingFavorites() {
    this.recipeService.countFavorites(this.loggedMemberId)
      .subscribe(
        (data) => {
          this.favRecipes = data;
        }
      );
  }

  countingToReview() {
    this.recipeService.countToReviewByCreator(this.loggedMemberId)
      .subscribe(
        (data) => {
          this.recipesToReview = data;
        }
      );
  }

  countingPublished() {
    this.recipeService.countPublishedByCreator(this.loggedMemberId)
      .subscribe(
        (data) => {
          this.pubRecipes = data;
        }
      );
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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // setRecipeState(state: string) {
  //   console.log(state);
  //   if (state == 'published')
  //     this.router.navigateByUrl('recipes/' + state);
  //   else if (state == 'toReview')
  //   this.router.navigateByUrl('recipe');
  //   else if (state == 'favorites')
  //     this.router.navigateByUrl('memberAccess/' + this.loggedMemberId + '/recipes/' + state);
  // }
  // // this.router.navigate(['/recipes/' + state], {relativeTo: this.route});

}
