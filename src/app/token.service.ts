import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { sessionExpired } from './util/commonFn';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private aRoute: ActivatedRoute) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')==null){}
    else{
    request = request.clone({
      setHeaders: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      }
    })}
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        // localStorage.clear();
        sessionExpired();
        this.router.navigate(['login']);
      } 
      // else {
      //   localStorage.clear()
      //   // this.router.navigate(['login'], { queryParams: { timeout: 'true' } })
      //   this.router.navigate(['/somethingwrong'], { relativeTo: this.aRoute });
      // }
      return throwError(error);
    }))
  }
}
