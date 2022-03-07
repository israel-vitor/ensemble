import { Injectable } from '@angular/core';
import {catchError, retry} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonService} from "../common/common.service";
import { Service } from 'src/app/interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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

  getServices(): Promise<any> {
    return this.http
      .get<any>(this.BASE_URL + '/service', this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  create(service: any): Promise<any> {
    return this.http
      .post<any>(this.BASE_URL + '/service', service, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  addImage(image: any, serviceId?: number): Promise<any> {
    const payload = new FormData()
    payload.set('thumbnail', image)
    return this.http
      .post<any>(this.BASE_URL + '/service/thumbnail/' + serviceId, payload)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  delete(serviceId?: number): Promise<any> {
    return this.http
      .delete<any>(this.BASE_URL + '/service/'+ serviceId, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  update(service: any, serviceId?: number): Promise<any> {
    return this.http
      .patch<any>(this.BASE_URL + '/service/' + serviceId, service, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }
}
