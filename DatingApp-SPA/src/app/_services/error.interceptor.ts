import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorIntererceptor implements HttpInterceptor {
    intercept(req: import('@angular/common/http').HttpRequest<any>,
              next: import('@angular/common/http').HttpHandler): import('rxjs')
              .Observable<import('@angular/common/http').HttpEvent<any>> {
                   return next.handle(req).pipe(
                      catchError(error => {
                          if (error.status  === 401) {
                              return throwError(error.statusText);
                          }
                          if (error instanceof HttpErrorResponse) {
                              const applicationError = error.headers.get('Application-Error');
                          //    console.log('err 1');
                              if (applicationError) {
                                  return throwError(applicationError);
                              }
                              
                          //    console.log('err 2');
                              const serverError = error.error;
                              let modalStateErrors = '';
                              if (serverError.errors && typeof serverError.errors === 'object') {
                                  for (const key in serverError.errors) {
                                      
                                 //     console.log('err 000', key);
                                  //    console.log('text', serverError.errors[key]); 
                                      if (serverError.errors[key] ) {
                                          modalStateErrors += serverError.errors[key] + '\n';
                                      }
                                   //   console.log('bigger',modalStateErrors);
                                  }
                              }

                              return throwError(modalStateErrors || serverError || 'Server Error');
                          }
                      })
                  );
              }
}


export const ErrorIntererceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntererceptor,
    multi: true
};
 