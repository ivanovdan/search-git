import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpService {
    constructor(private http: Http) { }

    get(url: string): Observable<Response> {
      const gitUrl = 'https://api.github.com/';
        return this.http.get(gitUrl + url);
      }

    handleError(error: any): Promise<any> {
        return Promise.reject(error.json().message || error);
      }
}
