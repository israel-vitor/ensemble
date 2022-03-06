import {Injectable} from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonService} from "../common/common.service";
import {Group} from "../../interfaces/group";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

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

  getAllGroups(): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + '/group', this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }
}
