import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showCaptureDialog = false;
  showHowDialog = false;

  openCaptureDialog() {
    this.showCaptureDialog = true;
  }
  openHowDialog() {
    this.showHowDialog = true;
  }
}
