import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudioProfileGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Ensure user is authenticated and authorized
    return this.authService.isAuthenticated().pipe(
      take(1), // Take one value and complete
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Check if user has a studioId and if they have permission
          const userStudioId = sessionStorage.getItem('studioId');
          const routeStudioId = next.parent?.paramMap.get('id');

          if (userStudioId === routeStudioId) {
            return true;
          } else {
            // Redirect if not authorized
            this.router.navigate(['/unauthorized']);
            return false;
          }
        } else {
          // Redirect to login if not authenticated
          this.router.navigate(['auth-studio']);
          return false;
        }
      })
    );
  }
}
