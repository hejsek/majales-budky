import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  capture(school: string, code: number): Promise<any> {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions(({headers: headers}));


    console.log(school, code);
    return this.http.post("http://mapa.budejovickymajales.cz/submit.php", "code=" + code + "&team=" + school, options)
      .toPromise()
      .then(response => response.json() as any);

  }

  getCallplan(): Promise<any> {
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // let options = new RequestOptions(({headers: headers}));

    return this.http.get("http://mapa.budejovickymajales.cz/GetCallplan.php")
      .toPromise()
      .then(response => response.json() as any);

  }

  getLog(): Promise<any> {
    return this.http.get("http://mapa.budejovickymajales.cz/GetLog.php")
      .toPromise()
      .then(response => response.json() as any);

  }

  getMapData(): Promise<any> {
    return this.http.get("http://mapa.budejovickymajales.cz/GetMapData.php")
      .toPromise()
      .then(response => response.json() as any);

  }

  getTeams(): Promise<any> {
    return this.http.get("http://mapa.budejovickymajales.cz/GetTeams.php")
      .toPromise()
      .then(response => response.json() as any);

  }

}
