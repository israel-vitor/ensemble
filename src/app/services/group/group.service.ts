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

  createGroup(group: Group): Promise<any> {
    return this.http
      .post<any>(this.BASE_URL + '/group', JSON.stringify(group), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  getGroupById(id: string): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + `/group/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  requestGroup(id: string): Promise<any> {
    return this.http
      .post<any>(this.BASE_URL + `/request`, JSON.stringify({group: id}), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  getRequestGroup(id: string): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + `/request/group/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  acceptRequest(id: string): Promise<any> {
    return this.http
      .patch<any>(this.BASE_URL + `/request/${id}`, JSON.stringify({status: "A"}), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  recuseRequest(id: string): Promise<any> {
    return this.http
      .patch<any>(this.BASE_URL + `/request/${id}`, JSON.stringify({status: "R"}), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }
}
