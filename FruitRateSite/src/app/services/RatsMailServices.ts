import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class RatsMailServices {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  callMailBatch(payload) {
    const data: any = {
      ...payload
    };
    const requestUrl = 'http://jsonplaceholder.typicode.com/users';
    // const requestUrl = environment.apiUrl + config.api.ratsMailPath;
    const response: any = this.http.get(requestUrl);
    return response;
  }
}