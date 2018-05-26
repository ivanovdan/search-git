import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { GitUser } from '../models/users.model';
import { GitRepo } from '../models/repos.model';
import { GitGist } from '../models/gists.model';
import { HttpService } from '../shared/http.service';


@Injectable()
export class UsersService {

  constructor(private http: HttpService) { }

  /**
   * Gets Github users.
   *
   * @returns {Promise<GitUser>}
   */
  getUsers(user: GitUser): Promise<GitUser[]> {
    return this.http.get('search/users?q=' + user).toPromise()
      .then(res => res.json() as GitUser[])
      .catch(this.http.handleError);
  }

  /**
   * Gets Github user's repos.
   *
   * @returns {Promise<GitRepos>}
   */
  getRepos(user: GitRepo): Promise<GitRepo[]> {
    return this.http.get('users/' + user + '/repos').toPromise()
      .then(res => res.json() as GitRepo[])
      .catch(this.http.handleError);
  }

  /**
   * Gets Github user's gists.
   *
   * @returns {Promise<GitGists>}
   */
  getGists(user: GitGist): Promise<GitGist[]> {
    return this.http.get('users/' + user + '/gists').toPromise()
      .then(res => res.json() as GitGist[])
      .catch(this.http.handleError);
  }
}
