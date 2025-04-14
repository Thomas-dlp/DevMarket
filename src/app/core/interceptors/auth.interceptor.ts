import { HttpEvent, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
