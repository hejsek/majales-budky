import {Component, OnInit} from "@angular/core";
import "../../assets/libs/map.js";
import "rxjs/add/observable/interval";
import {Observable} from "rxjs/Observable";
import {DataService} from "../data.service";
import {MapController} from "../map-controller";

declare var map;


@Component({
  selector: 'app-map',
  providers: [DataService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private callplan = {};
  private log = {};

  constructor(private dataService: DataService) {
  }

  ngAfterViewInit() {
    // main();

    let subscription = Observable.interval(100).subscribe(iteration => {
      console.log(iteration);
      if( window['refreshData'] != null) {
        console.log("RefreshData initialized");
        this.startSync();
        subscription.unsubscribe();
      }
    });


  }

  ngOnInit() {

  }


  startSync() {
    console.log("Map sync started");
    this.refreshData();

    Observable.interval(10000).subscribe(iteration => {
      this.refreshData();
      console.log(iteration);
    });
    Observable.interval(100).subscribe(iteration => {
      MapController.refreshTimers();

    });
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
