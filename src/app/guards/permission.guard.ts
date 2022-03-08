import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from "../services/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { roles = [] } = this.sessionService.getUser()
    const isAdmin = roles.includes('Admin')
    const isRestrictedSession = route.routeConfig?.path === 'admin/servicos'
    const canActivate = isAdmin ? isRestrictedSession : !isRestrictedSession
    if (!canActivate) {
      isAdmin ? this.router.navigate(['/admin/servicos']) : this.router.navigate(['/home'])
    }
    return canActivate
  }

}
