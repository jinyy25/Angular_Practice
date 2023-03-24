import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

import { ApiResponse } from './models/api-response';
import { UtilService } from './util.service';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = `${environment.apiBaseUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilService,
  ) { }

  //Promise : login 이후 실행 
  login(userId:string ,password:string): Promise<any>{
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}`,{userId:userId, password:password})
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('token',response.data);
      })
      .catch(this.utilService.handleApiError);
  }

  me(): Promise<User>{
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response =>{
        localStorage.setItem('curruntUser',JSON.stringify(response.data));
        return response.data as User
      })
      .catch(response =>{
        this.logout();
        return this.utilService.handleApiError(response);
      });
  }

  refresh(): Promise<any> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                localStorage.setItem('token',response.data);
                if(!this.getCurruntUser()) return this.me();                
              })
              .catch(response =>{
                this.logout();
                return this.utilService.handleApiError(response);
              });
  }

  //token 할당
  getToken(): string{
    return localStorage.getItem('token')||'{}';
  }

  //현재 user
  getCurruntUser(): User{
    return JSON.parse(localStorage.getItem('currentUser') || '{}') as User;    
  }

  //login 되어있는 id
  isLoggedIn(): boolean {
    var token = localStorage.getItem('token');
    if(token) return true;
    else return false;
  }

  //logout
  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
