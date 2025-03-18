import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';


//Needs to be injected in app.config -> provideHttpClient
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if(error.error.errors) {    //error is containing object error and that object contains JSON string errors
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if(error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key])
                }
              }
              throw modalStateErrors.flat();
            } else {
              toastr.error(error.error, error.status)
            }
            break;
            
          case 401:
            toastr.error('Unauthorised', error.status);
            break;
          
          case 404:
            router.navigateByUrl('/not-found');
            break;
          
          case 500:
            //passing navigation extras to the router to use info when routed
            const navigationExtras: NavigationExtras = {state: error.error};
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong');
            break;
        }
      }
      throw error;
    })
  );
};
