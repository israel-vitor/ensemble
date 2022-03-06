import { Injectable } from '@angular/core';
import {throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  handleError(error: any) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage)
    return throwError(() => {
      return errorMessage;
    });
  }

  public getImageUrl(imageName: string, type: string) {
    return `${environment.apiUrl}/images/${type}/${imageName}`
  }
}
