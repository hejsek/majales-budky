import {Component} from "@angular/core";
import {DataService} from "./data.service";
import {MapController} from "./map-controller";

@Component({
  selector: 'app-root',
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showCaptureDialog = false;
  showHowDialog = false;
  public teams;
  public log;
  public callplan;
  openCaptureDialog() {
    this.showCaptureDialog = true;
  }
  openHowDialog() {
    this.showHowDialog = true;
  }

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    this.dataService.getTeams()
      .then(resp =>{
        this.teams = resp;
      });
  }


  captureNotify() {
    this.showCaptureDialog = false;
    this.refreshData();
  }

  refreshData() {
    // console.log(map);

    //noinspection TypeScriptUnresolvedFunction
    this.dataService.getCallplan()
      .then(callplan => {
        console.log("callplan");
        console.log(callplan);
        this.callplan = callplan;

        //noinspection TypeScriptUnresolvedFunction
        this.dataService.getLog()
          .then(log => {
            console.log("log");
            console.log(log);
            this.log = log;
          });
      }).then(resp => {
      MapController.refreshData(this.callplan, this.log)
      console.log("Map refreshed");
    });

  }
}
