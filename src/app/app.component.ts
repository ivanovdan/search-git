import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from './services/get-users.service';
import { GitUser } from './models/users.model';
import { GitRepo } from './models/repos.model';
import { GitGist } from './models/gists.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private usersService: UsersService) {
  }

  title = 'Github Search';
  showRepos = false;
  avatar = '';
  user = '';
  userUrl = '';
  isError = false;
  noGists = false;
  @Input() gitUsers: GitUser[];
  @Input() gitRepos: GitRepo[];
  @Input() gitGists: GitGist[];
  @Input() gist: string;

  ngOnInit() {
    this.showRepos = true;
  }

  private isEmpty(e) {
    switch (e) {
      case '':
      case 0:
      case '0':
      case null:
      case false:
      case typeof this === 'undefined':
        this.isError = true;
        return true;
      default:
        this.isError = false;
        return false;
    }
  }

  search(value) {
    if (!this.isEmpty(value)) {
      // clear search result
      this.gitUsers = null;
      this.showRepos = true;
      // get the list of users
      this.usersService.getUsers(value)
        .then(users => {
          this.gitUsers = users.items;
        });
    }
  }

  getRepos(user) {
    this.usersService.getRepos(user)
      .then(repos => {
        if (repos.length > 0) {
          this.gitRepos = repos;
          this.userUrl = 'https://github.com/' + user;
          this.avatar = repos[0].owner.avatar_url;
          this.user = repos[0].owner;
          this.getGists(user);
          this.showRepos = !this.showRepos;
          this.gitUsers = null;
        }
      });
  }

  getGists(user) {
    this.usersService.getGists(user)
      .then(gists => {
        this.gitGists = gists;
        if (gists.length < 1) {
          this.noGists = true;
        }
      });
  }
}
