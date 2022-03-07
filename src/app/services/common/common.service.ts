import { Injectable } from '@angular/core';
import {throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  handleError(error: any) {
    const errorMessage = error.error.message;
    return throwError(() => {
      return errorMessage;
    });
  }

  public getImageUrl(imageName: string, type: string) {
    return `${environment.apiUrl}/images/${type}/${imageName}`
  }
}
