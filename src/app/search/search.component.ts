import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private name: string;
  focus1: boolean;
  searchForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {
    this.name = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
  }

  search() {

  }

  getSelectedDropdown(s: string) {
    console.log(s);
  }
}
