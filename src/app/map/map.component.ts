import { Component, OnInit } from '@angular/core';
import '../../assets/libs/map.js';

import {MapController} from "../map-controller"

declare var map;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // main();
  }


  refreshData() {
    // console.log(map);
    MapController.refreshData();
    console.log(window);
  }

}
