import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    var token = localStorage.getItem('token');
    var newHeader: HttpHeaders = req.headers;
    newHeader = newHeader.set('Content-Type','application/json');
    if(token) newHeader = newHeader.set('x-access-token',token);
    const newReq = req.clone({headers: newHeader});
    return next.handle(newReq);
  }
  constructor() { }
}
