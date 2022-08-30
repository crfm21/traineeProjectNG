import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Modules/users/Interface/user';
import { UserService } from 'src/app/Modules/users/user.service';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';
import { Comment } from '../../../Interfaces/comment';
import { CommentService } from '../../../Services/Comments/comment.service';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-comments-creation',
  templateUrl: './comments-creation.component.html',
  styleUrls: ['./comments-creation.component.css']
})
export class CommentsCreationComponent implements OnInit, OnDestroy {
  recipeId!: number;
  loggedMember!: User //mocked
  // comments!: Comment[];
  newComment!: Comment;
  // newCommentText!: string;
  recipeSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    public commentService: CommentService,
    public recipeService: RecipeService,
    public memberService: UserService,
    public dataTransfertService: DataTransferService,
    private router: Router,
    private route: ActivatedRoute) {

    this.recipeSubscription = this.recipeService.selectedRecipeIdUpdate
      .subscribe(
        (selectedId: number) => {
          this.recipeId = selectedId;
        });

    this.userSubscription = this.dataTransfertService.getUserUpdate()
      .subscribe(
        (data) => {
          this.loggedMember = data.data;
        }
      );
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.recipeId = this.recipeService.selectedRecipeId;
    this.loggedMember = this.dataTransfertService.loggedMember;

    // this.commentService
    //   .getCreatorsCommentsByRecipe(this.recipeId, this.loggedMember.id)
    //   .subscribe(
    //     (data: Comment[]) => {
    //       this.comments = data;
    //     }
    //   );
  }

  onSubmit(newCommentText: string) {
    console.log(newCommentText)
    this.newComment = {
      recipeId: this.recipeId,
      memberId: this.loggedMember.id,
      commentText: newCommentText,
    };
    // this.comments.push(this.newComment);
    // console.log(this.comments)

    this.commentService.createAComment(this.newComment)
      .subscribe(
        (res: any) => {
          alert(res.value);
          // this.router.navigateByUrl('/details/' + this.recipeId + '/comments');
          this.reloadCurrentRoute();

        }
      );

  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
