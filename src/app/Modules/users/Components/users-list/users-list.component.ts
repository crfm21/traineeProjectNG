import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../Interface/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  // private subscription!: Subscription;
  // loggedAmdin!: User;

  users!: User[];
  loggedAdminId!: number;
  memberStatus!: string;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.subscription = this.dataTransfer.getUserUpdate()
    // .subscribe((data) => {
    //   this.loggedAmdin = data.data;
    // });
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (data: Params) => {
          this.loggedAdminId = data['adminId'];
          this.memberStatus = data['memberStatus'];
        }
      );

    if (this.loggedAdminId !== undefined) {
      if (this.memberStatus == 'activeMembers') {
        this.userService.getAllMembers()
          .subscribe(
            (data: User[]) => {
              this.users = data;
            }
          );
      }
      else if (this.memberStatus == 'bannedMembers') {
        this.userService.getBannedMembers()
          .subscribe(
            (data: User[]) => {
              this.users = data;
            }
          );
      }
    }

  }

  onBanning(user: User, userId?: number,) {
    if (confirm("Are you sure you want to ban this user from the website community?")) {
      this.userService.banningMember(user, userId)
        .subscribe(
          (res: any) => {
            alert(res.value);
            this.reloadCurrentRoute();
          }
        );
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
