import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private name: string;
  focus1: boolean;

  constructor(private activatedRoute: ActivatedRoute) {
    this.name = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
  }

}
