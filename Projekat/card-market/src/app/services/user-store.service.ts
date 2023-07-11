import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private _token: String | undefined;

  constructor() { }

  set token(token: String | undefined) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  isLoggedIn() {
    return this.token != undefined;
  }
}
