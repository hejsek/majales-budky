import {Component, OnInit, Input} from "@angular/core";
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
  @Input() public callplan = {};
  @Input()  public log = {};
  @Input()  public teams = [];

  constructor(private dataService: DataService) {
  }

  ngAfterViewInit() {
    // main();

    // let subscription = Observable.interval(100).subscribe(iteration => {
    //   // console.log(iteration);
    //   if (window['refreshData'] != null) {
    //     console.log("RefreshData initialized");
    //     this.startSync();
    //     subscription.unsubscribe();
    //   }
    // });


    this.dataService.getMapData()
      .then(resp => {
        MapController.refreshMapCanvas(resp.voronoi, resp.booths);
        console.log(resp);
      }).then(resp => {
      this.startSync();
      this.refreshData();
    }).then(resp => {
      MapController.refreshData(this.callplan, this.log);
    });


  }

  ngOnInit() {
    //noinspection TypeScriptUnresolvedFunction

  }


  startSync() {
    console.log("Map sync started");


    Observable.interval(30000).subscribe(iteration => {
      this.refreshData();
      console.log(iteration);
    });
    Observable.interval(100).subscribe(iteration => {
      MapController.refreshTimers();
      MapController.refreshData(this.callplan, this.log);

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
      MapController.refreshData(this.callplan, this.log);
      console.log("Map refreshed");
    });

  }

}
