
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Modules/users/Interface/user';
import { UserService } from 'src/app/Modules/users/user.service';
import { DataTransferService } from 'src/app/Shared/Services/DataTransfer/data-transfer.service';

import { Comment } from '../../../Interfaces/comment';
import { Recipe } from '../../../Interfaces/recipe';
import { CommentService } from '../../../Services/Comments/comment.service';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit, OnDestroy {
  islogged!: boolean;
  isDisappeared!: boolean;
  comments!: Comment[];
  recipeId!: number;
  recipe!: Recipe;

  recipeSubscription!: Subscription;
  commentsSubscription!: Subscription;

  constructor(
    public recipeService: RecipeService,
    public commentService: CommentService,
    public dataTransfertService: DataTransferService,
    public memberService: UserService,
    private router: Router) {

    this.recipeSubscription = this.recipeService.selectedRecipeIdUpdate
      .subscribe(
        (selectedId: number) => {
          this.recipeId = selectedId;
          this.islogged = this.dataTransfertService.isLogged;
          this.onLoad();
        });

  }

  ngOnInit(): void {

    this.recipeId = this.recipeService.selectedRecipeId;

    this.islogged = this.dataTransfertService.isLogged;

    this.onLoad();

  }

  onLoad() {
    this.commentService.getRecipeComments(this.recipeId)
      .subscribe(
        (data: Comment[]) => {
          this.comments = data;
          this.comments.forEach(
            comm => {
              this.memberService.getAMember(comm.memberId)
                .subscribe(
                  m => {
                    comm.memberNickname = m.nickName;
                  }
                );
            }
          );
        }
      );
  };

  onDisaprove(comment: Comment, commId?: number){
    if(confirm("Are you sure you want to notify this comment?")){
      this.commentService.disaproving(comment, commId)
      .subscribe(
        (res: any) => {
          alert(res.value);
        }
      );//rever
    } else this.router.navigateByUrl('details/' + this.recipeId + '/comments');
  }

  onAdding(){
    this.isDisappeared = true;
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
    // this.commentsSubscription.unsubscribe();
  }

}
