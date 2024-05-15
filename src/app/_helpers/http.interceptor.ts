import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private spinner: NgxSpinnerService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.storageService.getUser();
    const options: any = {
      withCredentials: true
    }
    if (currentUser) {
      options.headers = req.headers.set('authorization', currentUser?.token)
    }

    req = req.clone(options);
    
    if(!req.url.includes('api/v1/notification/getCount')){
      this.spinner.show();
    }

    return next.handle(req).pipe(
      finalize(() => this.spinner.hide())
  );;
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];