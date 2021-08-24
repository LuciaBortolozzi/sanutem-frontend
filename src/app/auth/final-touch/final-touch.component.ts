import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-final-touch',
  templateUrl: './final-touch.component.html',
  styleUrls: ['./final-touch.component.css']
})
export class FinalTouchComponent implements OnInit {
  focus2: boolean;
  model: any;
  finalForm: any;
  focus: boolean;
  focus1: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  onDateSelection($event: Event) {
  }
}
