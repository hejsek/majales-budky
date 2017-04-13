import {Component, OnInit, Output, EventEmitter} from '@angular/core';

declare var $;

@Component({
  selector: 'app-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.css']
})
export class HowComponent implements OnInit {
  @Output() howNotify: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log("Jak to funguje dialog - zobrazen");

    $('#myModal').modal('toggle');

    $('#myModal').on('hidden.bs.modal', (e) => {
      this.howNotify.emit();
    })
  }

}
