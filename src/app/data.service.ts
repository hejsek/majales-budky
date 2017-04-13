import { Injectable } from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class DataService {

  constructor(private http: Http) {  }

  capture(school: string, code: number) : Promise<any> {
    console.log(school, code);
    return this.http.get("/")
      .toPromise()
      .then(resp => {
        console.log("olala");
        return "Neplatný kód";
      });

  }

}
