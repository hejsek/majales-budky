import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {DataService} from "./../data.service";

declare var $;


@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  providers: [[DataService]],

  styleUrls: ['./capture.component.css']
})


export class CaptureComponent implements OnInit {
  form: FormGroup;
  errors = [];
  success = false;

  showCaptureDialog = false;
  @Output() captureNotify: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log("Obsazení školy dialog - zobrazen");

    $('#myModal').modal('toggle');



    $('#myModal').on('hidden.bs.modal', (e) => {
      this.captureNotify.emit();
    })
  }

  ngAfterViewInit() {

  }



  constructor(fb: FormBuilder, private dataService: DataService) {

    this.form = fb.group({
      "skola": new FormControl("", Validators.required),
      "kod": new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    console.log(this.form);
    let kod = this.form.controls["kod"].value;
    let skola = this.form.controls["skola"].value;

    let errors = [];

    if (!kod) {
      errors.push("Kód není zadán.");
    }

    if (!skola) {
      errors.push("Škola není zadána.");
    }



    if(errors.length <= 0) {
      //noinspection TypeScriptUnresolvedFunction
      this.dataService.capture(skola, kod)
        .then(resp => {
          console.log(resp);
          if(resp.status === true) {
            this.success = true;
            console.log("Budka obsazena.");
          } else if(resp.status === false){
            this.success = false;
            errors.push(resp.message);

            console.log("Budka neobsazena.")
          } else {
            this.success = false;
            errors.push(resp.message);
            console.log(resp.message)
          }
        });
    }

    this.errors = errors;
  }




}
