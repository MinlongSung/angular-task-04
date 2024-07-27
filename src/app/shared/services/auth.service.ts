import { Injectable } from '@angular/core';
import {
  CredentialsInterface,
  UserInterface,
} from '../interfaces/auth.interfaces';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: BehaviorSubject<UserInterface>;
  user$: Observable<UserInterface>;

  constructor() {
    const retrievedUser = localStorage.getItem('user');

    let defaultUser = retrievedUser
      ? JSON.parse(retrievedUser)
      : this.initUserData();

    this.user = new BehaviorSubject<UserInterface>(defaultUser);
    this.user$ = this.user.asObservable();
  }

  private initUserData() {
    return {
      username: '',
      isLoggedIn: false,
    };
  }

  login(credentials: CredentialsInterface): Observable<boolean> {
    const { username, password } = credentials;
    const {
      sample_user: { username: valid_username, password: valid_pwd },
      sample_request_time: time,
    } = environment;

    const authenticated = username === valid_username && password === valid_pwd;

    if (authenticated) {
      setTimeout(() => {
        this.user.next({
          username,
          isLoggedIn: true,
        });
        localStorage.setItem('user', JSON.stringify(this.user.value));
      }, time);
    }

    return of(authenticated).pipe(delay(time));
  }

  logout(): void {
    this.user.next(this.initUserData());
    localStorage.removeItem('user');
  }

  isLogged(): boolean {
    return this.user.value.isLoggedIn;
  }

  getUsername(): string {
    return this.user.value.username;
  }
}
