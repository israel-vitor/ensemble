import {Injectable} from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonService} from "../common/common.service";
import {Group} from "../../interfaces/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  BASE_URL = `${environment.apiUrl}`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) {}  
  
  getAllGroupsUserMember(): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + '/group/user/member', this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  getAllGroupsUserAdministrator(): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + '/group/user/administrator', this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }
  
  getAllGroups(): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + '/group', this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }
}
